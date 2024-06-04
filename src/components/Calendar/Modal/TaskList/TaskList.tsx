import { FC } from 'react';
import Task from '../Task/Task';
import { TaskListProps } from '../../../../interface/Modal';

const TaskList: FC<TaskListProps> = ({
	tasks,
	deleteTask,
	toggleTaskCompletion,
}) => {
	return (
		<ul className='task-list'>
			{tasks.map((task, index) => (
				<Task
					key={index}
					task={task}
					deleteTask={() => deleteTask(index)}
					toggleTaskCompletion={() => toggleTaskCompletion(index)}
				/>
			))}
		</ul>
	);
};

export default TaskList;
