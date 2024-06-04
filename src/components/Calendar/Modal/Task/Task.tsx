import { FC } from 'react';
import { TaskProps } from '../../../../interface/Modal';

const Task: FC<TaskProps> = ({ task, deleteTask, toggleTaskCompletion }) => {
	return (
		<li className={task.completed ? 'task-item completed' : 'task-item'}>
			<span>{task.description}</span>
			<div className='buttons'>
				<button className='button-task' onClick={deleteTask}>
					Удалить
				</button>
				<button
					className={
						task.completed ? 'button-task undo' : 'button-task completed'
					}
					onClick={toggleTaskCompletion}
				>
					{task.completed ? 'Отменить' : 'Выполнено'}
				</button>
			</div>
		</li>
	);
};

export default Task;
