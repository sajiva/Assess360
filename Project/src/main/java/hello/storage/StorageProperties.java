package hello.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("hello.storage:storage")
public class StorageProperties {

    /**
     * This is the folder location for storing files
     */
    private String location = System.getProperty("user.dir") + "/uploads/";
    private String defaultDir = System.getProperty("user.dir") + "/uploads/";
    private final String videoDir = "/video/";
    private final String audioDir = "/audio/";

    public String getLocation() {
        return location;
    }

    public void setLocation(String location){
        if(location == "video") // TODO Mat, String.equals....
        {
            this.location = this.defaultDir + videoDir;
        }
        else if(location == "audio")  // TODO Mat, String.equals....
        {
            this.location = this.defaultDir + audioDir;
        }
        else
        {
            this.location = this.defaultDir;
        }
    }
}
