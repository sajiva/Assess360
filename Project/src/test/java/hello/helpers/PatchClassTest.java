package hello.helpers;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class PatchClassTest {

    private PatchClasses testPatchClasses;

    class TestClass{

        private int number;

        private String string;

        public TestClass(int inputNumber, String inputString){
            number = inputNumber;
            string = inputString;
        }

        public int getNumber() {
            return number;
        }

        public void setNumber(int number) {
            this.number = number;
        }

        public String getString() {
            return string;
        }

        public void setString(String string) {
            this.string = string;
        }
    }

    @Before
    public void setUp() throws Exception {
        testPatchClasses = new PatchClasses();
    }


    @Test
    public void performAPatchUpdatesTheMainObject() throws Exception {
        TestClass testClassToBeUpdated = new TestClass(1, "This is a test string to be updated");
        TestClass testClassToSetUpdated = new TestClass(2, "This is the updated string");

        PatchClasses.PerformAPatch(testClassToBeUpdated, testClassToSetUpdated);

        assertEquals(2, testClassToBeUpdated.getNumber());
        assertEquals("This is the updated string", testClassToBeUpdated.getString());
    }
}
