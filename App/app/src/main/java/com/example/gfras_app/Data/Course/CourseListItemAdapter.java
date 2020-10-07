package com.example.gfras_app.Data.Course;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gfras_app.R;

import java.util.ArrayList;
import java.util.List;

public class CourseListItemAdapter extends RecyclerView.Adapter<CourseListItemAdapter.CourseListItemViewHolder>  {
    private ArrayList<Course> coursesList;
    private  RecyclerViewClickListener listener;

    public CourseListItemAdapter(List<Course> coursesList,RecyclerViewClickListener listener) {
        this.coursesList =new ArrayList<Course>(coursesList);
        this.listener=listener;
    }

    @NonNull
    @Override
    public CourseListItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.course_list_item, parent, false);
        CourseListItemViewHolder evh = new CourseListItemViewHolder(v);
        return evh;
    }

    @Override
    public void onBindViewHolder(@NonNull CourseListItemViewHolder holder, int position) {
        Course currentItem = coursesList.get(position);
        holder.mTextView1.setText(currentItem.getCourseName());
        holder.mTextView2.setText(currentItem.getCourseId());

    }

    @Override
    public int getItemCount() {
        return coursesList.size();
    }

    public  class CourseListItemViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        public TextView mTextView1;
        public TextView mTextView2;
        public CourseListItemViewHolder(View itemView) {
            super(itemView);
            mTextView1 = itemView.findViewById(R.id.courseName);
            mTextView2 = itemView.findViewById(R.id.courseId);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            listener.onClick(view,getAdapterPosition());

        }
    }
    public  interface RecyclerViewClickListener{
        void onClick(View v,int position);


    }

}
