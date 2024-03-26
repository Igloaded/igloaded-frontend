import React, { useEffect, useRef } from 'react';
import styles from '../Styles/Error.module.scss';
import lottie from 'lottie-web';
import anmt from '../assets/error-animation.json';
import Transition from '../Transitions';

const Error = () => {
	const animationContainer = useRef(null);
	useEffect(() => {
		const anim = lottie.loadAnimation({
			container: animationContainer.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: anmt,
		});

		return () => {
			anim.destroy();
		};
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.main}>
			<div
				className={styles.animationContainer}
				ref={animationContainer}
			></div>
			<h3>Page not found</h3>
			<p>
				The page you are tring to look doesn't exist
				or has been deleted!
			</p>
			<div
				className={styles.returnHome}
				onClick={() => {
					window.location.href = '/';
				}}
			>
				Return Home
			</div>
		</div>
	);
};

export default Transition(Error);
