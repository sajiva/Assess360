package hello.controllers;

import hello.controllers.exceptions.UnkownRegisterError;
import hello.controllers.exceptions.UserAlreadyExistException;
import hello.controllers.exceptions.UserCantCreateAccountWhenSignedIn;
import hello.helpers.PatchClasses;
import hello.models.User;
import hello.repositories.FileResourceRepository;
import hello.repositories.UserRepository;
import hello.repositories.exceptions.NotAuthorizedException;
import hello.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository, StorageService storageService, FileResourceRepository fileResourceRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Gets the current logged in user
     * @return The User
     */
    @RequestMapping(value = "/rest/currentUser", method = RequestMethod.GET)
    public ResponseEntity<User> getCurrentUser() throws Exception {
        return new ResponseEntity<>(AuthenticationController.GetUser(), HttpStatus.OK);

    }

    /**
     * Updates the current user
     * @param user The User Info updating
     * @return The User
     */
    @RequestMapping(value = "/rest/currentUser", method = RequestMethod.PATCH)
    public ResponseEntity<User> updateUser(@RequestBody User user) throws Exception {
        User currentUser = AuthenticationController.GetUser();
        PatchClasses.PerformAPatch(currentUser, user);
        userRepository.save(currentUser);
        return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }

    /**
     * Create new user
     * @param user The User Info updating
     * @return The User
     */
    @RequestMapping(value = "/rest/register", method = RequestMethod.POST)
    public ResponseEntity<User> registerUser(@RequestBody User user) throws Exception {

        /*******************************************************************/
        /* Test if User already exists                                     */
        /*******************************************************************/
        if(userRepository.findOne(user.getUsername())!=null){
            throw new UserAlreadyExistException(user);
        }

        /*******************************************************************/
        /* Will only allow users that are not logged in make an account    */
        /*******************************************************************/
        try{
            AuthenticationController.GetUser(); // Will cause a Authorization Error if not logged in
            throw new UserCantCreateAccountWhenSignedIn();
        }
        catch (NotAuthorizedException e)
        {
            user=userRepository.save(user);

            //Log them in...
            AuthenticationController._login(user.getUsername(),user.getPassword());

            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch(Exception e){
            throw new UnkownRegisterError(e);
        }
    }

}
