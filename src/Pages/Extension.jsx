import React, { useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import styles from '../Styles/Extension.module.scss';
import powerFecther from '../assets/staticAssets/extensionIcon.png';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { AiOutlineChrome } from 'react-icons/ai';
import { SiBrave } from 'react-icons/si';
import heroImg from '../assets/staticAssets/imageBrowser.png';
import mock3 from '../assets/Ig/mock_3.png';
import powerFetcher from '../assets/PowerFetcherv1.0.11.zip';

const Extension = () => {
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

	const openUrl = (url) => {
		window.open(url, '_blank');
	};
	return (
		<div className={styles.mainWrapper}>
			<Header />
			<div className={styles.innerContent}>
				<div className={styles.heroWrapper}>
					<div className={styles.iconHolder}>
						<img
							src={powerFecther}
							alt=''
						/>
						<p>PowerFetcher</p>
					</div>
					<h3>
						Fetch The Insights <br /> Like Never{' '}
						<span>Before</span> !
					</h3>
					<div
						className={styles.downloadBtn}
						onClick={() => openUrl(powerFetcher)}
					>
						<p>Download for</p>
						<AiOutlineChrome />
						<p>Or</p>
						<SiBrave />
						{/* <span>(Not Released Yet)</span> */}
					</div>
					<p>Latest Version : v1.0.11</p>
				</div>
				<div className={styles.imageHero}>
					<img
						src={heroImg}
						alt=''
					/>
				</div>
				<div className={styles.section3}>
					<img
						src={mock3}
						alt=''
					/>
					<div className={styles.info}>
						<p>How to Use?</p>
						<div className={styles.infoItem}>
							<h3>Step 1:</h3>
							<p>
								Install PowerFecther Extension (.zip)
							</p>
						</div>
						<div className={styles.infoItem}>
							<h3>Step 2:</h3>
							<p>
								Extract the .zip downloaded file and save
								it in a folder.
							</p>
						</div>
						<div className={styles.infoItem}>
							<h3>Step 3:</h3>
							<p>
								Open the browser and Click on{' '}
								<IoExtensionPuzzleOutline /> Icon, Then
								click on "Manage extensions"
							</p>
						</div>
						<div className={styles.infoItem}>
							<h3>Step 4:</h3>
							<p>
								Enable "Developer Mode" and click on "Load
								Unpacked", Select the folder where you
								extracted the .zip file.
							</p>
						</div>
						<div className={styles.infoItem}>
							<h3>Step 5:</h3>
							<p>
								Click on
								<span>
									<img
										src={powerFecther}
										alt=''
									/>
								</span>
								Icon and pin it to the browser. Click on
								it to start using the extension.
							</p>
						</div>
						<div className={styles.infoItem}>
							<h3>Step 6:</h3>
							<p>
								Login with your IGLoaded's account
								credentials.
							</p>
						</div>
						<div className={styles.infoItem}>
							<h3>Step 7:</h3>
							<p>
								All Set! Now you can use the extension to
								fetch the insights of your Instagram
								Account!
							</p>
						</div>
					</div>
				</div>
				<div className={styles.ctaSection}>
					<div className={styles.ctaCard}>
						<h3>Get Started</h3>
						<p>
							The One and Only Analytics tool you'll ever
							need for Instagram!
						</p>
						<div className={styles.buttonWrapper}>
							<div
								className={styles.btn}
								onClick={() => openUrl('/login')}
							>
								Get Started
							</div>
							<div
								className={styles.btn}
								onClick={() => openUrl('/subscribe')}
							>
								View Pricing
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Extension;
