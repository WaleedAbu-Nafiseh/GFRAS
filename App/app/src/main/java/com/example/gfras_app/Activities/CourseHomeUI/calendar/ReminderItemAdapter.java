package com.example.gfras_app.Activities.CourseHomeUI.calendar;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gfras_app.Data.Reminder;
import com.example.gfras_app.R;

import java.util.ArrayList;
import java.util.List;

public class ReminderItemAdapter extends RecyclerView.Adapter<ReminderItemAdapter.ReminderItemAdapterViewHolder> {
    private ArrayList<Reminder> reminders;

    public ReminderItemAdapter(List<Reminder> reminders) {
        this.reminders = new ArrayList<>(reminders);
    }

    @NonNull
    @Override
    public ReminderItemAdapter.ReminderItemAdapterViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.reminder_item, parent, false);
        ReminderItemAdapter.ReminderItemAdapterViewHolder evh = new ReminderItemAdapter.ReminderItemAdapterViewHolder(v);
        return evh;
    }

    @Override
    public void onBindViewHolder(@NonNull ReminderItemAdapterViewHolder holder, int position) {
        Reminder currentItem = reminders.get(position);
        holder.TextView1.setText("Title : "+currentItem.getTitle() +" , on "+reminders.get(position).getDate() );
    }

    @Override
    public int getItemCount() {
        return reminders.size();
    }

    public class ReminderItemAdapterViewHolder extends RecyclerView.ViewHolder {
        public TextView TextView1;

        public ReminderItemAdapterViewHolder(View itemView) {
            super(itemView);
            TextView1 = itemView.findViewById(R.id.reminderTitle);
        }

    }
}
