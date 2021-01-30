import React, { createContext, useContext, useMemo } from 'react';
import { useReminder } from './useReminder';

const ReminderContext = createContext({ isError: true, isLoading: true });

export function useReminderContext() {
	const context = useContext(ReminderContext);
	if (!context) throw new Error('Reminder Context not found');
	return context;
}

function ReminderProvider({ children }) {
	const state = useReminder();
	const value = useMemo(() => state, [state]);

	return (
		<ReminderContext.Provider value={value}>
			{children}
		</ReminderContext.Provider>
	);
}

export default ReminderProvider;
