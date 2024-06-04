import { FC } from 'react';
import { HeaderProps } from '../../../interface/Modal';

const Header: FC<HeaderProps> = ({ prevMonth, currentDate, nextMonth }) => {
	return (
		<div className='header'>
			<button className='btn' onClick={prevMonth}>
				&#9668;
			</button>
			<h1 className='title'>
				{currentDate.toLocaleString('default', {
					month: 'long',
					year: 'numeric',
				})}
			</h1>
			<button className='btn' onClick={nextMonth}>
				&#9658;
			</button>
		</div>
	);
};

export default Header;
