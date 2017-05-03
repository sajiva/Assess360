package hello.controllers;

import hello.models.JSONResponse;
import hello.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;

@RestController
@RequestMapping(value = "/files")
@MultipartConfig(fileSizeThreshold = 100971520)
public class FileUploadController {


    private StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService){
        this.storageService = storageService;
    }

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"")
                .body(file);
    }

    @RequestMapping(value = "/upload")
    public JSONResponse uploadFile(@RequestParam("uploadedFile") MultipartFile uploadedFile) {
        storageService.store(uploadedFile);
        JSONResponse response = new JSONResponse();
        response.setVariables("Success", uploadedFile.getContentType(), uploadedFile.getName());
        return response;
    }
}
