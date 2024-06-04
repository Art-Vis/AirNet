import { format } from 'date-fns';
import TaskList from './TaskList/TaskList';
import { ModalProps } from '../../../interface/Modal';
import { FC } from 'react';

const Modal: FC<ModalProps> = ({
	selectedDay,
	tasks,
	showModal,
	setShowModal,
	addTask,
	deleteTask,
	toggleTaskCompletion,
}) => {
	const selectedDayFormatted = selectedDay
		? format(selectedDay, 'yyyy-MM-dd')
		: '';

	const deleteTaskForSelectedDay = (index: number): void => {
		if (selectedDayFormatted) {
			deleteTask(selectedDayFormatted, index);
		}
	};

	const toggleTaskCompletionForSelectedDay = (index: number): void => {
		if (selectedDayFormatted) {
			toggleTaskCompletion(selectedDayFormatted, index);
		}
	};

	return (
		showModal && (
			<div className='modal'>
				<div className='modal-content'>
					<span className='close' onClick={() => setShowModal(false)}>
						&times;
					</span>
					<h2 className='modal-title'>
						Задачи на {selectedDay!.toLocaleDateString()}
					</h2>
					{/* Форма для добавления новой задачи */}
					<form
						className='form'
						onSubmit={e => {
							e.preventDefault();
							const taskInput = e.target.elements.task;
							const taskDescription = taskInput.value.trim();
							if (taskDescription) {
								addTask({ description: taskDescription, completed: false });
								taskInput.value = '';
							}
						}}
					>
						<input type='text' name='task' placeholder='Название задачи' />
						<button className='button-task add' type='submit'>
							Добавить задачу
						</button>
					</form>

					<TaskList
						tasks={tasks[selectedDayFormatted] || []}
						deleteTask={deleteTaskForSelectedDay}
						toggleTaskCompletion={toggleTaskCompletionForSelectedDay}
					/>
				</div>
			</div>
		)
	);
};

export default Modal;
