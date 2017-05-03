package hello;

import hello.models.Role;
import hello.models.User;
import hello.repositories.RoleRepository;
import hello.repositories.UserRepository;
import hello.repositories.UserSessionRepository;
import hello.storage.StorageService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableConfigurationProperties({hello.storage.StorageProperties.class})
public class Application {
    public static Logger log = Logger.getLogger(Application.class.getName());
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Autowired
    UserSessionRepository userSessionRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Bean
    CommandLineRunner init(StorageService storageService){

        Role role=new Role();
        role.setRole("user");
        role.setId(1);
        role=roleRepository.save(role);

        //Creates new user
        for(int i=0;i<5;i++){
           User user=new User();
           user.setUsername("user"+i);
           user.setPassword("user"+i+"_pass");
           user.setRole(role);
           userRepository.save(user);

        }


        return (args) -> {
            storageService.deleteAll();
            storageService.init();
        };
    }

}