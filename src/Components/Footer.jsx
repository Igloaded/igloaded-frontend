import React, { useState, memo } from 'react';
import styles from './Styles/Footer.module.scss';
import {
	AiFillInstagram,
	AiFillMail,
	AiFillGithub,
} from 'react-icons/ai';

import { Tooltip } from 'react-tooltip';
import { SiBuymeacoffee } from 'react-icons/si';
import logo from '../assets/IGLOADED_LOGO_WHITE.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
	const OpenUrl = (url) => {
		window.open(url, '!blank');
	};

	const navigate = useNavigate();

	return (
		<div className={styles.mainFooter}>
			<div className={styles.innerMain}>
				<div className={styles.left}>
					<img
						src={logo}
						alt=''
					/>
					<p>Instagram Insights at one place!</p>
					<p>Analytics made easier!</p>
				</div>
				<div className={styles.right}>
					<div className={styles.contentWrapper}>
						<h3 className={styles.heading}>
							Navigations
						</h3>
						<p
							onClick={() => navigate('/check-requests')}
							className={styles.links}
						>
							Check Pending Request
						</p>
						<p
							onClick={() =>
								navigate('/public/download')
							}
							className={styles.links}
						>
							Public Downloader
						</p>
						<a
							onClick={() => navigate('/statistics')}
							className={styles.links}
						>
							Post Tracking
						</a>
						<p
							onClick={() => navigate('/recharge')}
							className={styles.links}
						>
							Recharge Credits
						</p>
						<p
							onClick={() =>
								navigate('/extension/download')
							}
							className={styles.links}
						>
							Download PowerFetcher
						</p>
					</div>
					<div className={styles.contentWrapper}>
						<h3 className={styles.heading}>Legal</h3>
						<p
							onClick={() => navigate('/privacy-policy')}
							className={styles.links}
						>
							Privacy Policy
						</p>
						<p
							onClick={() =>
								navigate('/terms-and-conditions')
							}
							className={styles.links}
						>
							Terms and Conditions
						</p>
						<p
							onClick={() => navigate('/refund-policy')}
							className={styles.links}
						>
							Cancellation/Refund Policy
						</p>
						<p
							onClick={() => navigate('/usage-policy')}
							className={styles.links}
						>
							Usage Policy
						</p>
						<p
							onClick={() => navigate('/contact')}
							className={styles.links}
						>
							Contact Us
						</p>
						<p
							onClick={() => navigate('/about')}
							className={styles.links}
						>
							About Us
						</p>
					</div>
				</div>
			</div>
			<div className={styles.credits}>
				<div className={styles.creditSection}>
					{' '}
					Made with{' '}
					<span className={styles.loader}></span>
					by Aditya
				</div>

				<div className={styles.socials}>
					<div
						className={styles.socialIcon}
						data-tooltip-id='github'
						onClick={() =>
							OpenUrl(
								'https://www.github.com/adidecodes'
							)
						}
					>
						<AiFillGithub />
					</div>
					<div
						className={styles.socialIcon}
						data-tooltip-id='instagram'
						onClick={() =>
							OpenUrl(
								'https://www.instagram.com/ig.loaded'
							)
						}
					>
						<AiFillInstagram />
					</div>
					<div
						className={styles.socialIcon}
						data-tooltip-id='bmac'
						onClick={() =>
							OpenUrl(
								'https://www.buymeacoffee.com/adidecodes'
							)
						}
					>
						<SiBuymeacoffee />
					</div>
				</div>
			</div>
			<Tooltip
				className={styles.tooltip}
				id='github'
				place='top'
			>
				Follow on Github
			</Tooltip>
			<Tooltip
				className={styles.tooltip}
				id='instagram'
				place='top'
			>
				Follow on Instagram
			</Tooltip>
			<Tooltip
				className={styles.tooltip}
				id='bmac'
				place='top'
			>
				Buy Me a Chai! &#128516;
			</Tooltip>
		</div>
	);
};

export default memo(Footer);
