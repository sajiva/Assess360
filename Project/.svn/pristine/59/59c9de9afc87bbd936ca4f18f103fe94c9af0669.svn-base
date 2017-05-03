package hello.storage;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class StoragePropertiesTest
{
    private StorageProperties storageProperties;
    private String defaultDir = System.getProperty("user.dir") + "/uploads/";

    @Before
    public void setUp()
    {
        this.storageProperties = new StorageProperties();
    }

    @Test
    public void canary()
    {
        assertTrue(true);
    }

    @Test
    public void setVideoDirectoryTest()
    {
        String expected = this.defaultDir + "/video/";

        storageProperties.setLocation("video");

        assertEquals(expected, storageProperties.getLocation());
    }

    @Test
    public void setAudioDirectoryTest()
    {
        String expected = this.defaultDir + "/audio/";

        storageProperties.setLocation("audio");

        assertEquals(expected, storageProperties.getLocation());
    }

    @Test
    public void setDirectoryTest()
    {
        String expected = this.defaultDir;

        storageProperties.setLocation("");

        assertEquals(expected, storageProperties.getLocation());
    }
}