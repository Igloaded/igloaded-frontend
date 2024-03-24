import React, { useEffect } from 'react';
import styles from '../Styles/PrivateDownload.module.scss';
import comingsoon from '../assets/animations/comingsoon.gif';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const PrivateDownload = () => {
	useEffect(() => {
		document.documentElement.classList.add(
			styles['homePage']
		);

		return () => {
			document.documentElement.classList.remove(
				styles['homePage']
			);
		};
	}, []);
	return (
		<>
			<div className={styles.main}>
				<Header />
				<div className={styles.mainwrapper}>
					<img
						src={comingsoon}
						alt=''
					/>
					<h3>Coming soon!</h3>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default PrivateDownload;
