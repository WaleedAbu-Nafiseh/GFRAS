/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaBackendServer.Model;

/**
 *
 * @author wa1
 */
public class Attendance {
    boolean isPresent;
    String studentID;
    String time;

    public Attendance() {
    }

    public Attendance(boolean isPresent, String studentID, String time) {
        this.isPresent = isPresent;
        this.studentID = studentID;
        this.time = time;
    }

    public boolean isIsPresent() {
        return isPresent;
    }

    public void setIsPresent(boolean isPresent) {
        this.isPresent = isPresent;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
    
}
