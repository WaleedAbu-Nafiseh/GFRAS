package com.example.gfras_app.util;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.HashMap;
import java.util.Map;

public class DBServices {


    private static FirebaseFirestore db;
    public static String TAG=DBServices.class.getName();

    public static void  addToCollection(String collectionName,Object objectToAdd){
         db = FirebaseFirestore.getInstance();
         db.collection(collectionName)
                .add(objectToAdd)
                .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                    @Override
                    public void onSuccess(DocumentReference documentReference) {
                        Log.d(TAG, "DocumentSnapshot added with ID: " + documentReference.getId());
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(TAG, "Error adding document", e);
                    }
                });
/**
         The following is an example on how to use the method from any class

          List<String> courses=new LinkedList<>();
        courses.add("courseID");
        Date d = new Date();
        d.getTime();
        Student student=new Student( "Test", "User", d,"password",  courses);
        DBServices.addToCollection(CollectionsName.STUDENTS,student);
*/
    }
}
