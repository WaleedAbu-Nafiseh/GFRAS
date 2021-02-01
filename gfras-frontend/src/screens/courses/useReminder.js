import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getReminders } from '../../API/reminder/getReminders';

export function useReminder() {
	const { courseID } = useParams();
	const { data, isError, isLoading, refetch: refetchReminders } = useQuery(
		['reminder', { courseID }],
		() => getReminders({ courseID })
	);
	return {
		reminders: data,
		isError,
		isLoading,
		refetchReminders
	};
}
