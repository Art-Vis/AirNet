import { FC } from 'react';
import { DayProps } from '../../../interface/Modal';

const Day: FC<DayProps> = ({
	day,
	isSelected,
	isHoliday,
	hasTasks,
	handleDayClick,
}) => {
	return (
		<div
			className={`day ${isSelected ? 'selected' : ''} ${
				isHoliday ? 'holiday' : ''
			} ${hasTasks ? 'yellow' : ''}`}
			onClick={() => handleDayClick(day)}
		>
			{day.getDate()}
		</div>
	);
};

export default Day;
