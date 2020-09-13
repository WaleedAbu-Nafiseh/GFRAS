package com.example.gfras_app.Data;

import com.google.firebase.firestore.DocumentId;

import java.util.Date;
import java.util.List;

public class Student {
    @DocumentId
    public String id;
    public String firstName;
    public String lastName;
    public Date dateOfBirth;
    public String password;
    public List<String> courses;
    public Student(){}

    public Student(String firstName, String lastName, Date dateOfBirth, String password, List<String> courses) {
        this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.courses = courses;
    }
    public Student(String id,String firstName, String lastName, Date dateOfBirth, String password, List<String> courses) {
        this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.courses = courses;
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
}
