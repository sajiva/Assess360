package hello.helpers;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Hector on 4/14/2017.
 */
@Configuration
@ComponentScan(basePackages = "hello")
public class EmailService  {

    @Bean
    public JavaMailSenderImpl mailSender() {


        //handles e-mail information

        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        javaMailSender.setProtocol("smtp");
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("hectorsoftwarecorp@gmail.com");
        javaMailSender.setPassword("Armandorocha1-");
        javaMailSender.getJavaMailProperties().setProperty("mail.transport.protocol","smtp");
        javaMailSender.getJavaMailProperties().setProperty("mail.smtp.auth","true");
        javaMailSender.getJavaMailProperties().setProperty("mail.smtp.starttls.enable","true");
        javaMailSender.getJavaMailProperties().setProperty("mail.smtp.starttls.required","true");
        javaMailSender.getJavaMailProperties().setProperty("mail.smtp.ssl.trust", "smtp.gmail.com");
        javaMailSender.getJavaMailProperties().setProperty("mail.debug","true");

        return javaMailSender;
    }

}
