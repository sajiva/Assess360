package hello.helpers;

import java.beans.Introspector;
import java.beans.PropertyDescriptor;

public class PatchClasses {
    public static void PerformAPatch(Object MainObject, Object SettingObject) throws Exception{

        for (PropertyDescriptor propertyDescriptor : Introspector.getBeanInfo(MainObject.getClass()).getPropertyDescriptors()) {

            Object AttributeSetting=propertyDescriptor.getReadMethod().invoke(SettingObject);

            if(propertyDescriptor.getWriteMethod()==null){
                continue;
            }
            if(AttributeSetting!=null)
            {

                propertyDescriptor.getWriteMethod().invoke(MainObject,AttributeSetting);
            }
        }
    }
}
