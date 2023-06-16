import React, { FC } from 'react';


interface ButtonProps {
	onClick: () => void;
	title: string;
	className: any;
	disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ onClick, title, className, disabled }) => {
	return (
		<>
			<button type='button' onClick={onClick} className={className} disabled={disabled}>
				{title}
			</button>
		</>
	);
};

export default Button;
