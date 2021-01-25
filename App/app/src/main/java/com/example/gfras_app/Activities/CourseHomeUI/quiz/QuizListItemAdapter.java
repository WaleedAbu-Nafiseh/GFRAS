package com.example.gfras_app.Activities.CourseHomeUI.quiz;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.widget.AppCompatImageView;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gfras_app.Data.Quiz;
import com.example.gfras_app.R;

import java.util.ArrayList;
import java.util.List;

public class QuizListItemAdapter extends RecyclerView.Adapter<QuizListItemAdapter.QuizListItemAdapterViewHolder> {
    private ArrayList<Quiz> QuizzesList;
    private RecyclerViewClickListener listener;

    public QuizListItemAdapter(List<Quiz> QuizzesList, RecyclerViewClickListener listener) {
        this.QuizzesList = new ArrayList<Quiz>(QuizzesList);
        this.listener = listener;
    }

    @NonNull
    @Override
    public QuizListItemAdapterViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.quiz_list_item, parent, false);
        QuizListItemAdapterViewHolder evh = new QuizListItemAdapterViewHolder(v);
        return evh;
    }

    @Override
    public void onBindViewHolder(@NonNull QuizListItemAdapterViewHolder holder, int position) {
        Quiz currentItem = QuizzesList.get(position);
        holder.TextView1.setText(currentItem.getQuizTitle());
    }

    @Override
    public int getItemCount() {

        return QuizzesList.size();
    }

    public class QuizListItemAdapterViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        public TextView TextView1;
        public AppCompatImageView quizListIcon;

        public QuizListItemAdapterViewHolder(View itemView) {

            super(itemView);
            TextView1 = itemView.findViewById(R.id.quizTitle);
            quizListIcon = itemView.findViewById(R.id.quizListIcon);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            listener.onClick(view, getAdapterPosition());
            Intent i = new Intent(view.getContext(), QuizzingActivity.class);
            //Create the bundle
            Bundle bundle = new Bundle();
            //Add your data from getFactualResults method to bundle
            bundle.putString("QUIZ_ID", QuizzesList.get(getAdapterPosition()).getId());
            //Add the bundle to the intent
            i.putExtras(bundle);
            view.getContext().startActivity(i);

        }
    }

    public static abstract class RecyclerViewClickListener {
        void onClick(View view, int adapterPosition) {

        }

    }
}
