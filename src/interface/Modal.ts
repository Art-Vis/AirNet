export interface HeaderProps {
	prevMonth: () => void;
	currentDate: Date;
	nextMonth: () => void;
}

export interface DayProps {
	day: Date;
	isSelected: boolean;
	isHoliday: boolean;
	hasTasks: boolean;
	handleDayClick: (day: Date) => void;
}

export interface ModalProps {
	selectedDay: Date | null;
	tasks: { [key: string]: any[] };
	showModal: boolean;
	setShowModal: (show: boolean) => void;
	addTask: (task: any) => void;
	deleteTask: (dateString: string, index: number) => void;
	toggleTaskCompletion: (dateString: string, index: number) => void;
}

export interface TaskProps {
	task: {
		description: string;
		completed: boolean;
	};
	deleteTask: () => void;
	toggleTaskCompletion: () => void;
}

export interface TaskListProps {
	tasks: {
		description: string;
		completed: boolean;
	}[];
	deleteTask: (index: number) => void;
	toggleTaskCompletion: (index: number) => void;
}

export interface Task {
	description: string;
	completed: boolean;
}
