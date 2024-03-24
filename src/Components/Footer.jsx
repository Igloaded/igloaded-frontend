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

const Footer = () => {
	const OpenUrl = (url) => {
		window.open(url, '!blank');
	};

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
						<a
							href='/check-requests'
							className={styles.links}
						>
							Check Pending Request
						</a>
						<a
							href='/public/download'
							className={styles.links}
						>
							Public Downloader
						</a>
						<a
							href='/statistics'
							className={styles.links}
						>
							Post Tracking
						</a>
						<a
							href='/recharge'
							className={styles.links}
						>
							Recharge Credits
						</a>
						<a
							href='/extension/download'
							target='_blank'
							className={styles.links}
						>
							Download PowerFetcher
						</a>
					</div>
					<div className={styles.contentWrapper}>
						<h3 className={styles.heading}>Legal</h3>
						<a
							href='/privacy-policy'
							target='_blank'
							className={styles.links}
						>
							Privacy Policy
						</a>
						<a
							href='/terms-and-conditions'
							target='_blank'
							className={styles.links}
						>
							Terms and Conditions
						</a>
						<a
							href='/refund-policy'
							target='_blank'
							className={styles.links}
						>
							Cancellation/Refund Policy
						</a>
						<a
							href='/usage-policy'
							target='_blank'
							className={styles.links}
						>
							Usage Policy
						</a>
						<a
							href='/contact'
							target='_blank'
							className={styles.links}
						>
							Contact Us
						</a>
						<a
							href='/about'
							target='_blank'
							className={styles.links}
						>
							About Us
						</a>
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
