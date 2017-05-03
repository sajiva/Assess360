package hello.models;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class FileResource {

    @Id
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "uuid2")
    @Column(name = "fileResourceId", columnDefinition = "CHAR(40)")
    private String fileResourceId;

    @Column(name = "filePath")
    private String filePath;

    @Column(name = "fileName")
    private String fileName;

    @OneToOne
    private User uploadedBy;

    @Column(name = "fileDescription")
    private String fileDescription;

    protected FileResource(){}

    protected FileResource(String newFilePath, String newFileName, User newUploadedBy, String newFileDescription){
        filePath = newFilePath;
        fileName = newFileName;
        uploadedBy = newUploadedBy;
        fileDescription = newFileDescription;
    }

    public String getFileResourceId() {
        return fileResourceId;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getFileName() {
        return fileName;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public String getFileDescription() {
        return fileDescription;
    }

    public static FileResourceBuilder builder() {
        return new FileResourceBuilder();
    }

    public static class FileResourceBuilder {
        private String filePath;
        private String fileName;
        private User uploadedBy;
        private String fileDescription;

        //sets file path
        public FileResourceBuilder setFilePath(final String filePath){
            this.filePath = filePath;
            return this;
        }

        //sets file name
        public FileResourceBuilder setFileName(final String fileName){
            this.fileName = fileName;
            return this;
        }

        //sets which user uploaded the file
        public FileResourceBuilder setUploadedBy(final User uploadedBy){
            this.uploadedBy = uploadedBy;
            return this;
        }

        public FileResourceBuilder setFileDescription(final String fileDescription){
            this.fileDescription = fileDescription;
            return this;
        }

        //builds the file resource
        public FileResource build(){
            return new FileResource(filePath, fileName, uploadedBy, fileDescription);
        }
    }
}
