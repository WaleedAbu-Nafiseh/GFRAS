/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaBackendServer.Controllers;

import JavaBackendServer.Model.Attendance;
import JavaBackendServer.Model.Course;
import JavaBackendServer.Model.Student;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteBatch;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import io.javalin.http.Context;
import static java.awt.SystemColor.text;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author wa1
 */
public class NotificationsController {

    public static void SendNotificationToCourse(Context ctx) throws FirebaseMessagingException, InterruptedException, ExecutionException {
        String courseId = ctx.pathParam("courseId");
        String date = ctx.pathParam("date");

        List<Student> studentsList = new ArrayList<Student>();
        List<Student> studentsInCourseList = new ArrayList<Student>();
        Course c = new Course();

        Firestore db = FirestoreClient.getFirestore();
        //getCourse Id
        //get Course
        //getStudents All students in cours 
        DocumentReference docRef = db.collection("Courses").document(courseId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            c = new Course();
            c = document.toObject(Course.class);
            System.out.println("Document data: " + document.getData());
            System.out.println("Object first attendance data: " + c.getAttendance().get(date).get(0).getStudentID());

        } else {
            System.out.println("No such document!");
        }

        ApiFuture<QuerySnapshot> dref = db.collection("students").get();
        List<QueryDocumentSnapshot> docs = dref.get().getDocuments();
        for (QueryDocumentSnapshot d : docs) {
            studentsList.add(d.toObject(Student.class));
            System.out.println(" the object ID is" + d.toObject(Student.class).getId());
        }
        System.out.println("Students in the course +" + c.getCourseId() + " are :");
        for (Student student : studentsList) {
            System.out.println("one from all students  +" + student.getId() + " are :");

            if ((c.getStudents().contains(student.getId()))) {
                System.out.println(student.getId() + "is in the course");
                studentsInCourseList.add(student);
            }
        }
        //looping through all the ist of Attendance object and send the notification for all
        for (Attendance a : c.getAttendance().get(date)) {
            System.out.println("The attendance id is " + a.getStudentID());

            studentsInCourseList.forEach((v) -> {
                String text = "";
                if (a.isIsPresent()) {
                    text = "You are marked as an attende on " + date;
                } else {
                    text = "You did not come to class today";
                }
                if (a.getStudentID().equalsIgnoreCase(v.getId())) {
                    System.out.println("You are valid  and id is " + v.getId());
                    try {
                        Message message = Message.builder()
                                .putData("text", text)
                                .setToken(v.getToken())
                                .build();
                        String response = FirebaseMessaging.getInstance().send(message);
                    } catch (FirebaseMessagingException ex) {
                        Logger.getLogger(NotificationsController.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            });

        }

        ctx.result("CourseId is " + courseId + "\n date" + date);
    }
    
    public static void sendCustomNotificationToCourse(Context ctx) throws FirebaseMessagingException, InterruptedException, ExecutionException {
        String courseId = ctx.pathParam("courseId");
        String type = ctx.pathParam("type");
        String description = ctx.pathParam("description");
        String courseName = ctx.pathParam("courseName");
        String time = ctx.pathParam("time");
        String date = ctx.pathParam("date");
        String title = ctx.pathParam("title");
        
        List<Student> studentsList = new ArrayList<Student>();
        List<Student> studentsInCourseList = new ArrayList<Student>();
        Course c = new Course();

        Firestore db = FirestoreClient.getFirestore();
        //getCourse Id
        //get Course
        //getStudents All students in cours 
        DocumentReference docRef = db.collection("Courses").document(courseId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            c = new Course();
            c = document.toObject(Course.class);
            System.out.println("Document data: " + document.getData());
//            System.out.println("Object first attendance data: " + c.getAttendance().get(date).get(0).getStudentID());

        } else {
            System.out.println("No such document!");
        }

        ApiFuture<QuerySnapshot> dref = db.collection("students").get();
        List<QueryDocumentSnapshot> docs = dref.get().getDocuments();
        for (QueryDocumentSnapshot d : docs) {
            studentsList.add(d.toObject(Student.class));
            System.out.println(" the object ID is" + d.toObject(Student.class).getId());
        }
        System.out.println("Students in the course +" + c.getCourseId() + " are :");
        for (Student student : studentsList) {
            System.out.println("one from all students  +" + student.getId() + " are :");

            if ((c.getStudents().contains(student.getId()))) {
                System.out.println(student.getId() + "is in the course");
                studentsInCourseList.add(student);
            }
        }
        //looping through all the ist of Attendance object and send the notification for all
//            System.out.println("The attendance id is " + a.getStudentID());

            studentsInCourseList.forEach((student) -> {
                String text = "";
               
                    System.out.println("You are valid  and id is " + student.getId());
                    try {
                        Message message = Message.builder()
                                .putData("description", description)
                                .putData("type", type)
                                .putData("courseId", courseId)
                                .putData("courseName", courseName)
                                .putData("time", time)
                                .putData("date", date)
                                .putData("title", title)
                                .setToken(student.getToken())
                                .build();
                        String response = FirebaseMessaging.getInstance().send(message);
                    } catch (FirebaseMessagingException ex) {
                        Logger.getLogger(NotificationsController.class.getName()).log(Level.SEVERE, null, ex);
                    }
            });


        ctx.result("CourseId is " + courseId + "\n date" + date);
    }
    

    public static void markStudentAsPresentSendNotification(Context ctx) throws InterruptedException, ExecutionException {
        ///:courseId/:studentId/:date"
        String courseId = ctx.pathParam("courseId");
        String studentNum = ctx.pathParam("studentNum");
        String date = ctx.pathParam("date");
        List<Student> studentsList = new ArrayList<Student>();
        List<Student> studentsInCourseList = new ArrayList<Student>();
        Course c = new Course();
        Student student = new Student();

        Firestore db = FirestoreClient.getFirestore();
        //getCourse Id
        //get Course
        //getStudents All students in cours 
        DocumentReference docRef = db.collection("Courses").document(courseId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            c = document.toObject(Course.class);
            System.out.println("Document data: " + document.getData());

        } else {
            System.out.println("No such document!");
        }
        ApiFuture<QuerySnapshot> dref = db.collection("students").whereEqualTo("studentUniversityId", studentNum).get();
        List<QueryDocumentSnapshot> docs = dref.get().getDocuments();

        for (QueryDocumentSnapshot v : docs) {
            System.out.println(v.getId() + " => " + v.toObject(Student.class).getFirstName());
            student = v.toObject(Student.class);
        }
        System.out.println("The old one is   " + c.toString());

        //looping through all the ist of Attendance object and send the notification for all
        for (int i = 0; i < c.getAttendance().size(); i++) {
            if (c.getAttendance().get(date).get(i).getStudentID().equalsIgnoreCase(student.getId())) {
                System.out.println("The attendance id is " + c.getAttendance().get(date).get(i).getStudentID());
                c.getAttendance().get(date).get(i).setIsPresent(true);
                System.out.println("The updated one is   " + c.toString());
            }
        }

        WriteBatch batch = db.batch();
        DocumentReference sfRef = db.collection("Courses").document(c.getCourseId());
        batch.set(sfRef, c).commit();
        try {
            Message message = Message.builder()
                    .putData("text", "You are marked as an Attende for " + c.getCourseName() + "!")
                    .setToken(student.getToken())
                    .build();
            String response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException ex) {
            Logger.getLogger(NotificationsController.class.getName()).log(Level.SEVERE, null, ex);
        }

        //get the student object and the id of it from firebase
        //get the attendance for the given date and mark the student as absent, 
        //after teh update send the notification to the student token
    }

    public static void sendReminderToClassNow(Context ctx) throws InterruptedException, ExecutionException, ParseException, FirebaseMessagingException {
        String courseId = ctx.pathParam("courseId");
        List<Student> studentsList = new ArrayList<Student>();
        List<Student> studentsInCourseList = new ArrayList<Student>();
        Course c = new Course();

        Firestore db = FirestoreClient.getFirestore();
        //getCourse Id
        //get Course
        //getStudents All students in cours 
        DocumentReference docRef = db.collection("Courses").document(courseId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            c = new Course();
            c = document.toObject(Course.class);
        } else {
            System.out.println("No such document!");
        }

        ApiFuture<QuerySnapshot> dref = db.collection("students").get();
        List<QueryDocumentSnapshot> docs = dref.get().getDocuments();
        for (QueryDocumentSnapshot d : docs) {
            studentsList.add(d.toObject(Student.class));
        }
        for (Student student : studentsList) {
            System.out.println("one from all students  +" + student.getId() + " are :");

            if ((c.getStudents().contains(student.getId()))) {
                System.out.println(student.getId() + "is in the course");
                studentsInCourseList.add(student);
            }
        }
        for (Student s : studentsInCourseList) {
            Message message = Message.builder()
                    .putData("type", "CourseReminder")
                    .putData("header", "New Quiz!")
                    .putData("header", "A new Quiz is created for " + c.getCourseName())
                    .setToken(s.getToken())
                    .build();
            String response = FirebaseMessaging.getInstance().send(message);
        }

        ctx.result("CourseId is " + courseId + "\n date");

    }

    public static void sendReminderscheduled(Context ctx) throws InterruptedException, ExecutionException, ParseException, FirebaseMessagingException {
        String sDate1 = "31-12-1998";
        Date date1 = new SimpleDateFormat("dd-MM-yyyy").parse(sDate1);
        System.out.println(sDate1 + "\t" + date1.getYear());

    }
}
