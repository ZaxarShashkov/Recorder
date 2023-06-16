import React, { FC } from 'react';
import classes from './Modal.module.scss';
import Button from './UI/Button/Button';

interface ModalProps {
	setModal(arg: boolean): void;
	startRecording: () => void;
}

const Modal: FC<ModalProps> = ({ setModal, startRecording }: ModalProps) => {
	return (
		<div className={classes.modal}>
			Do you want recording?
			<div className={classes.modal__buttons}>
				<Button onClick={startRecording} title='Yes' className={classes.modal__button} />
				<Button
					onClick={() => setModal(false)}
					title='No'
					className={classes.modal__button}
				/>
			</div>
		</div>
	);
};

export default Modal;
