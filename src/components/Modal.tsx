import React, { FC } from 'react';
import classes from './Modal.module.scss';

interface ModalProps {
	setModal(arg: boolean): void;
	startRecording: () => void;
}

const Modal: FC<ModalProps> = ({ setModal, startRecording }: ModalProps) => {
	return (
		<div className={classes.modal}>
			Do you want recording?
			<div className={classes.modal__buttons}>
				<button type='button' className={classes.modal__button} onClick={startRecording}>
					Yes
				</button>
				<button
					type='button'
					className={classes.modal__button}
					onClick={() => setModal(false)}>
					No
				</button>
			</div>
		</div>
	);
};

export default Modal;
