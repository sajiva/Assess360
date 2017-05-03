package hello.controllers;

import hello.models.*;
import hello.repositories.UserRepository;
import hello.repositories.UserSessionRepository;
import hello.repositories.exceptions.NotAuthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/rest/session")
public class AuthenticationController {

    private static UserRepository _userRepository;
    private static UserSessionRepository _userSessionRepository;

    @Autowired
    private UserSessionRepository userSessionRepository;
    @Autowired
    private UserRepository userRepository;

    public static HttpSession session() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true); // true == allow create
    }

    @PostConstruct
    public void initStaticDao () {
        _userRepository = this.userRepository;
        _userSessionRepository = this.userSessionRepository;
    }


    @RequestMapping(value = "/logout",method = RequestMethod.POST)
    public ResponseEntity<LogoutResponse> logout() throws Exception
    {
        UserSession userSession=GetUserSession();
        userSessionRepository.delete(userSession);
        session().removeAttribute("SessionID");

        return new ResponseEntity<>(LogoutResponse.success(), HttpStatus.OK);

    }
    /**
     * @param loginRequest Login Request
     * @return LoginResponse
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpSession httpSession)
    {
        String userName=loginRequest.getUsername();
        String password=loginRequest.getPassword();


        User foundUser=userRepository.findOne(loginRequest.getUsername());
        if(foundUser==null){
            return new ResponseEntity<LoginResponse>(LoginResponse.failed("User Not found"), HttpStatus.OK);
        }

        if(!foundUser.getPassword().equals(loginRequest.getPassword())){
            return new ResponseEntity<LoginResponse>(LoginResponse.failed("Password Incorrect"), HttpStatus.OK);

        }

        UserSession session=UserSession.generateSession(foundUser);
        session=userSessionRepository.save(session);
        httpSession.setAttribute("SessionID",session);


        return new ResponseEntity<LoginResponse>(LoginResponse.success(session.getSessionID()),HttpStatus.OK);
    }

    /**
     * Perfoms a Login. This is used if we need to log in from an external source.
     * @param username String
     * @param password String
     * @return LogResponse
     */
    public static LoginResponse _login(String username, String password) {

        User foundUser = _userRepository.findOne(username);
        if (foundUser == null) {
            return LoginResponse.failed("User Not found");
        }

        if (!foundUser.getPassword().equals(password)) {
            return LoginResponse.failed("Password Incorrect");
        }

        UserSession session = UserSession.generateSession(foundUser);
        session = _userSessionRepository.save(session);

        session().setAttribute("SessionID", session);
        return LoginResponse.success(session.getSessionID());
    }

    @RequestMapping(value = "/is-logged-in",method = RequestMethod.GET)
    public ResponseEntity<LoginResponse> isLoggedIn(HttpSession httpSession)
    {
        UserSession session=(UserSession)httpSession.getAttribute("SessionID");

        if(session==null){
            return new ResponseEntity<LoginResponse>(LoginResponse.failed("No Session Found"), HttpStatus.OK);
        }
        else
        {
            session=userSessionRepository.findOne(session.getSessionID());
            if(session==null){
                return new ResponseEntity<LoginResponse>(LoginResponse.failed("Getting Session Failed"), HttpStatus.OK);
            }
            User user=userRepository.findOne(session.getLinkedUser().getUsername());
            if(user==null){
                return new ResponseEntity<LoginResponse>(LoginResponse.failed("Session is not for user"), HttpStatus.OK);
            }

        }



        return new ResponseEntity<LoginResponse>(LoginResponse.success(session.getSessionID()),HttpStatus.OK);
    }
    @RequestMapping(method = RequestMethod.GET)
    public User session(HttpSession session) {

        return (User) session.getAttribute("user");
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void logout(HttpSession session) {
        session.invalidate();
    }


    /**
     * Is a temporary solution to having a easy to check the user anywhere
     * @return boolean
     */
    public static User GetUser() throws NotAuthorizedException {
        return GetUser(AuthenticationController.session());
    }
    /**
     * @return UserSession
     */
    public static UserSession GetUserSession() throws Exception {
        if(session()==null){
            throw new Exception("No Session Found");
        }
        UserSession session=(UserSession)session().getAttribute("SessionID");
        if(session==null){
            throw new Exception("No User Session Found");
        }
        return  session;

    }

    /**
     * Is a temporary solution to having a easy to check the user anywhere
     * @param httpSession The Current User Session(Stores the User Information)
     * @return boolean
     */
    public static User GetUser(HttpSession httpSession ) throws NotAuthorizedException{
        UserSession session=(UserSession)httpSession.getAttribute("SessionID");

        User user;
        /*******************************************************************/
        /* No Session                                                      */
        /*******************************************************************/
        if(session==null)
        {
            throw new NotAuthorizedException("Session was not found");
        }
        /*******************************************************************/
        /* Session found                                                   */
        /*******************************************************************/
        else
        {
            /***************************************************************/
            /* Session Authentication                                      */
            /***************************************************************/
            session=_userSessionRepository.findOne(session.getSessionID());
            if(session==null)
            {
                throw new NotAuthorizedException("Session seems to have been corrupted, user session not found");
            }

            /***************************************************************/
            /* User Authentication                                         */
            /***************************************************************/
            user=_userRepository.findOne(session.getLinkedUser().getUsername());
            if(user==null)
            {
                throw new NotAuthorizedException("User Not found");
            }
        }

        /*******************************************************************/
        return user;
    }
}

