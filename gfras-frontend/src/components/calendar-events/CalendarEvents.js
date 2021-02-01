import React from 'react';
import { Calendar, Views } from 'react-big-calendar';
import localizer from 'react-big-calendar/lib/localizers/globalize';
import * as dates from './dates';
import globalize from 'globalize';
import { format } from 'date-fns';

let allViews = Object.keys(Views)
	.map((k) => Views[k])
	.filter((view) => {
		return view !== 'work_week';
	});
const globalizeLocalizer = localizer(globalize);

const ColoredDateCellWrapper = ({ children }) =>
	React.cloneElement(React.Children.only(children), {
		style: {
			backgroundColor: 'lightblue'
		}
	});

export const CalendarEvents = ({
	defaultDate,
	maxDate,
	events,
	onSelectEvent
}) => (
	<Calendar
		popup={true}
		popupOffset={{ x: 30, y: 20 }}
		selectable
		onSelectEvent={onSelectEvent}
		events={events}
		views={allViews}
		step={60}
		formats={{
			dayRangeHeaderFormat: ({ start, end }) =>
				`${format(start, ' MMMM d, yyyy')} - ${format(end, ' MMMM d, yyyy')}`,
			agendaHeaderFormat: (value) => {
				return `${format(value.start, ' MMMM d, yyyy')} - ${format(
					value.end,
					' MMMM d, yyyy'
				)}`;
			},
			eventTimeRangeFormat: (value) => {
				return `${format(value.end, 'h:mm aa')}`;
			}
		}}
		showMultiDayTimes
		max={maxDate || dates.add(dates.endOf(new Date(), 'day'), -1, 'hours')}
		defaultDate={defaultDate || new Date()}
		components={{
			timeSlotWrapper: ColoredDateCellWrapper
		}}
		localizer={globalizeLocalizer}
	/>
);
