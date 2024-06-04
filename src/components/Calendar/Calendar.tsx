import { useState, useEffect } from 'react';
import {
	getDaysInMonth,
	startOfMonth,
	addDays,
	addMonths,
	format,
} from 'date-fns';
import Holidays from 'date-holidays';

import Header from './Header/Header';
import Day from './Day/Day';
import Modal from './Modal/Modal';

import './Calendar.css';
import './Modal.css';
import { Task } from '../../interface/Modal';

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDay, setSelectedDay] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [tasks, setTasks] = useState({});
	const [holidays, setHolidays] = useState([]);

	// Функция для получения праздников
	useEffect(() => {
		const hd = new Holidays('RU');
		setHolidays(hd.getHolidays(currentDate.getFullYear()));
	}, [currentDate]);

	// Функция для получения дней текущего месяца
	const getMonthDays = () => {
		const start = startOfMonth(currentDate);
		const days = getDaysInMonth(currentDate);
		const monthDays = [];

		for (let i = 0; i < days; i++) {
			const day = addDays(start, i);
			monthDays.push(day);
		}

		return monthDays;
	};

	// Функция для перехода к предыдущему месяцу
	const prevMonth = (): void => {
		setCurrentDate(prevDate => addMonths(prevDate, -1));
	};

	// Функция для перехода к следующему месяцу
	const nextMonth = (): void => {
		setCurrentDate(prevDate => addMonths(prevDate, 1));
	};

	// Обработчик клика по дню
	const handleDayClick = (day: any): void => {
		setSelectedDay(day);
		setShowModal(true);
	};

	// Функция для добавления задачи
	const addTask = (task: any): void => {
		const dateString = format(selectedDay, 'yyyy-MM-dd');
		setTasks(prevTasks => ({
			...prevTasks,
			[dateString]: [...(prevTasks[dateString] || []), task],
		}));
	};

	// Функция для изменения статуса выполнения задачи
	const toggleTaskCompletion = (dateString: string, index: number): void => {
		const updatedTasks: Record<string, Task[]> = { ...tasks };
		updatedTasks[dateString][index].completed =
			!updatedTasks[dateString][index].completed;
		setTasks(updatedTasks);
	};

	const isSelected = (selectedDay: Date | null, day: Date): boolean =>
		selectedDay !== null &&
		format(day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');

	const isHoliday = (holidays: Holidays.Holiday[], day: Date): boolean =>
		holidays.some(
			holiday =>
				format(holiday.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
		);

	const hasTasks = (tasks: { [key: string]: any[] }, day: Date): boolean =>
		!!tasks[format(day, 'yyyy-MM-dd')] &&
		tasks[format(day, 'yyyy-MM-dd')].length > 0;

	// Функция для удаления задачи
	const deleteTask = (dateString: string, index: number): void => {
		const updatedTasks = { ...tasks };
		updatedTasks[dateString].splice(index, 1);
		setTasks(updatedTasks);
	};

	return (
		<div className='calendar'>
			<Header
				prevMonth={prevMonth}
				currentDate={currentDate}
				nextMonth={nextMonth}
			/>
			<div className='days'>
				{getMonthDays().map((day, index) => (
					<Day
						key={index}
						day={day}
						isSelected={isSelected(selectedDay, day)}
						isHoliday={isHoliday(holidays, day)}
						hasTasks={hasTasks(tasks, day)}
						handleDayClick={handleDayClick}
					/>
				))}
			</div>
			<Modal
				selectedDay={selectedDay}
				tasks={tasks}
				showModal={showModal}
				setShowModal={setShowModal}
				setTasks={setTasks}
				addTask={addTask}
				toggleTaskCompletion={toggleTaskCompletion}
				deleteTask={deleteTask}
			/>
		</div>
	);
};

// Экспорт компонента Calendar
export default Calendar;
