/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaBackendServer.Model;

import com.google.cloud.firestore.annotation.DocumentId;
import java.util.Date;
import java.util.List;

/**
 *
 * @author wa1
 */
public class Student {

    @DocumentId
    public String id;
    public String firstName;
    public int studentNum;
    public String phoneNum;
    public String lastName;
    public Date dateOfBirth;
    public String password;
    public List<String> courses;
    public String token;

    public Student() {
    }

    public Student(String firstName, String lastName, Date dateOfBirth, String password, int studentNum, String phoneNum, List<String> courses) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.courses = courses;
        this.studentNum = studentNum;
        this.phoneNum = phoneNum;
    }

 

    public Student(String id, String firstName, int studentNum, String phoneNum, String lastName, Date dateOfBirth, String password, List<String> courses, String token) {
        this.id = id;
        this.firstName = firstName;
        this.studentNum = studentNum;
        this.phoneNum = phoneNum;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.courses = courses;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getCourses() {
        return courses;
    }

    public void setCourses(List<String> courses) {
        this.courses = courses;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getStudentNum() {
        return studentNum;
    }

    public void setStudentNum(int studentNum) {
        this.studentNum = studentNum;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }
}
