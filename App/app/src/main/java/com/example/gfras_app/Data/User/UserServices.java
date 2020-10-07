package com.example.gfras_app.Data.User;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.util.Log;

import com.example.gfras_app.R;
import com.google.gson.Gson;

import static android.content.Context.MODE_PRIVATE;


public class UserServices {
    public static String CURRENT_USER = "CurrentUser";

    public static User getCurrentUser(Context c) {
        SharedPreferences mPrefs = c.getSharedPreferences(UserServices.CURRENT_USER, c.MODE_PRIVATE);
        String userJSON = mPrefs.getString(UserServices.CURRENT_USER, "");
        Gson gson = new Gson();
        Log.e("TEST","Loging from Servcice, "+userJSON);
        User user = gson.fromJson(userJSON, User.class);
        return user;
    }


    public static void setCurrentUser(Context c,User u) {
        SharedPreferences mPrefs = c.getSharedPreferences(UserServices.CURRENT_USER, c.MODE_PRIVATE);
        Editor prefsEditor = mPrefs.edit();
        Gson gson = new Gson();
        String json = gson.toJson(u);
        prefsEditor.putString(UserServices.CURRENT_USER, json);
        prefsEditor.commit();

    }
}
