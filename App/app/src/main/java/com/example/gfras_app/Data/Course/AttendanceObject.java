package com.example.gfras_app.Data.Course;

import java.util.ArrayList;

public class AttendanceObject {
    ArrayList<AttendanceItem> list;

    public ArrayList<AttendanceItem> getList() {
        return list;
    }

    public void setList(ArrayList<AttendanceItem> list) {
        this.list = list;
    }

    public AttendanceObject(ArrayList<AttendanceItem> list) {
        this.list = list;
    }
}
