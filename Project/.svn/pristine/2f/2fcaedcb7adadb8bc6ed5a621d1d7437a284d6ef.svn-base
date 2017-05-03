package hello.controllers;

import hello.models.User;
import hello.models.UserSession;
import hello.repositories.UserRepository;
import hello.repositories.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class HomeController {


    @Autowired
    UserSessionRepository userSessionRepository;
    @Autowired
    UserRepository userRepository;

    private ModelAndView getApp(HttpSession httpSession, HttpServletResponse response){
        UserSession session=(UserSession)httpSession.getAttribute("SessionID");

        if(session==null){
            return new ModelAndView(
                    new RedirectView("/", true));
        }
        else
        {
            session=userSessionRepository.findOne(session.getSessionID());
            if(session==null){
                return new ModelAndView(
                        new RedirectView("/", true));
            }
            try {
                User user = userRepository.findOne(session.getLinkedUser().getUsername());
            } catch (Exception e) {
                return new ModelAndView(
                        new RedirectView("/", true));
            }
        }
        return new ModelAndView("app");
    }
    @RequestMapping(value = "/app/**")
    public ModelAndView  index(HttpSession httpSession, HttpServletResponse  response) {
        return this.getApp(httpSession,response);
    }


    @RequestMapping(value = "")
    public String home() {
        return "app";
    }
}
