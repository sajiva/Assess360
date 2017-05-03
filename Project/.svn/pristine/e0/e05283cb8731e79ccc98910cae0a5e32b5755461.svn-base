package hello.controllers;

import hello.models.FileResource;
import hello.models.User;
import hello.repositories.FileResourceRepository;
import hello.repositories.UserRepository;
import hello.storage.StorageService;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;

@RestController
@MultipartConfig(fileSizeThreshold = 100971520)
public class FileResourceController {

    private final StorageService storageService;

    private final FileResourceRepository fileResourceRepository;

    private final UserRepository userRepository;

    @Autowired
    public FileResourceController(StorageService storageService, FileResourceRepository fileResourceRepository, UserRepository userRepository) {
        this.storageService = storageService;
        this.fileResourceRepository = fileResourceRepository;
        this.userRepository = userRepository;
    }



    /**
     * Uploads user profile image
     * @param multipartFile image file
     * @return The fileResource
     */
    @RequestMapping(value = "/rest/image", method = RequestMethod.POST)
    public ResponseEntity<FileResource> uploadUserImage(@RequestParam("uploadedFile") MultipartFile multipartFile){
        storageService.store(multipartFile);
        Path filePath = storageService.load(multipartFile.getOriginalFilename());
        FileResource fileResource = FileResource.builder()
                .setFileName(multipartFile.getOriginalFilename())
                .setFilePath(filePath.toAbsolutePath().toString())
                .build();

        fileResource = fileResourceRepository.save(fileResource);

        User currentUser = AuthenticationController.GetUser();
        currentUser.setPhoto(fileResource);
        userRepository.save(currentUser);

        return new ResponseEntity<>(fileResource, HttpStatus.OK);
    }

    /**
     * Gets user profile image
     * @param username the user
     * @return The image file
     */
    @RequestMapping(value = "rest/image/{username}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getUserImage(@PathVariable("username") String username) throws IOException {
        User currentUser = userRepository.findOne(username);
        FileResource fileResource = currentUser.getPhoto();
        HttpHeaders headers = new HttpHeaders();
        byte[] fileInBytes = new byte[0];

        if (fileResource != null) {
            Resource resource = storageService.loadAsResource(fileResource.getFileName());
            InputStream in = resource.getInputStream();
            fileInBytes = IOUtils.toByteArray(in);
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(fileInBytes.length);
        }

        return new ResponseEntity<>(fileInBytes, headers, HttpStatus.OK);
    }
    
}
