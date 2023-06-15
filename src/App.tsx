import React, { FC, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import classes from './App.module.scss';
import ReactPlayer from 'react-player';
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc';
import { saveAs } from 'file-saver';

const App: FC = () => {
	const webcam = useRef<Webcam>(null);
	const playerRef = useRef<ReactPlayer>(null);
	const [recorder, setRecorder] = useState<RecordRTC | null>();
	const [stream, setStream] = useState<MediaStream | null>();
	const [videoBlob, setVideoBlob] = useState<Blob | null>();
	const [modal, setModal] = useState<boolean>(false);

	const startRecording = async () => {
		setModal(false);
		const mediaDevices = navigator.mediaDevices;
		const stream: MediaStream = await (mediaDevices as any).getDisplayMedia({
			video: true,
			audio: true,
			preferCurrentTab: true,
		});
		// @ts-ignore
		const recorder: RecordRTC = new RecordRTCPromisesHandler(stream, {
			type: 'video',
		});
		await recorder.startRecording();
		setStream(stream);
		setRecorder(recorder);
	};

	const stopRecording = async () => {
		if (recorder) {
			await recorder?.stopRecording();
			(stream as any).stop();
			const blob: Blob = await recorder?.getBlob();
			setVideoBlob(blob);
			setStream(null);
			setRecorder(null);
		}
	};

	const downloadVideo = () => {
		if (videoBlob) {
			const file = new File([videoBlob], 'demo.mp4', { type: 'video/mp4' });
			saveAs(file, `Video-${Date.now()}.mp4`);
		}
	};

	const handleStart = async () => {
		setModal(true);
	};

	return (
		<div className={classes.app}>
			<div className={classes.app__container}>
				<div className={classes.app__container_player}>
					<ReactPlayer
						url={'https://www.youtube.com/watch?v=dP20Ex_hPkw'}
						controls={true}
						ref={playerRef}
						onStart={handleStart}
						onSeek={(e) => console.log('onSeek', e)}
					/>
				</div>
				<div className={classes.app__container_webcam}>
					<Webcam
						audio={true}
						ref={webcam}
						width={200}
						height={200}
						// screenshotFormat='image/jpeg'
					/>
				</div>
				{modal ? (
					<div className={classes.modal}>
						Do you want recording?
						<div className={classes.app__container_buttons}>
							<button
								type='button'
								className={classes.app__container_button}
								onClick={startRecording}>
								Yes
							</button>
							<button
								type='button'
								className={classes.app__container_button}
								onClick={() => setModal(false)}>
								No
							</button>
						</div>
					</div>
				) : null}
			</div>
			<div className={classes.app__container_buttons}>
				<button
					type='button'
					className={classes.app__container_button}
					onClick={startRecording}>
					Start record
				</button>
				<button
					type='button'
					className={classes.app__container_button}
					onClick={stopRecording}>
					Stop record
				</button>
				<button
					type='button'
					className={classes.app__container_button}
					onClick={downloadVideo}
					disabled={!videoBlob}>
					Download
				</button>
			</div>
		</div>
	);
};

export default App;
