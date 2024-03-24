import React, { useState } from 'react';
import styles from '../Styles/Track.module.scss';
import axios from 'axios';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CustomModal from '../Components/CustomModal';
import { vars } from '../../config';

import { IoAnalyticsOutline } from 'react-icons/io5';
import {
	FaArrowRightLong,
	FaPlay,
} from 'react-icons/fa6';
import { FcLike } from 'react-icons/fc';
import { FaEye } from 'react-icons/fa';
import { MdInsertComment } from 'react-icons/md';
import { IoIosArrowDropdown } from 'react-icons/io';

const Track = () => {
	const [currentState, setCurrentState] =
		useState('input');

	const [reelUrl, setreelUrl] = useState('');

	const [reelData, setReelData] = useState({
		views: 0,
		likes: 0,
		plays: 0,
		shortCode: '',
		uploadTime: 0,
		uploadedBy: '',
		thumbnail: '',
		video: '',
		fullName: '',
		mediaType: '',
		comments: 0,
		caption: '',
	});

	const getReelData = (code) => {
		const options = {
			method: 'GET',
			url: `http://localhost:5000/track/getreeldata/?shortcode=${code}`,
		};

		axios
			.request(options)
			.then((res) => {
				console.log(res.data.data.PostData[0]);
				setReelData({
					views: res.data.data.PostData[0].view_count,
					likes: res.data.data.like_count,
					plays: res.data.data.PostData[0].play_count,
					shortCode: res.data.data.code,
					uploadTime: res.data.data.taken_at,
					uploadedBy: res.data.data.username,
					thumbnail:
						res.data.data.PostData[0].thumbnail,
					video: res.data.data.PostData[0].url,
					fullName: res.data.data.full_name,
					mediaType: res.data.data.media_type,
					comments: res.data.data.comment_count,
					caption: res.data.data.captionText,
				});
				setCurrentState('datafetched');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	function formatEpochTime(epochTime) {
		epochTime = epochTime * 1000;
		const date = new Date(epochTime);
		const istDate = new Date(
			date.toLocaleString('en-US', {
				timeZone: 'Asia/Kolkata',
			})
		);
		const options = {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		};
		const formattedDate = istDate.toLocaleString(
			'en-IN',
			options
		);
		const day = istDate.getDate();
		const suffix = ['th', 'st', 'nd', 'rd'][
			day % 10 > 3
				? 0
				: ((day - (day % 10) !== 10) * day) % 10
		];
		const formattedDateWithSuffix =
			formattedDate.replace(day, day + suffix);

		return formattedDateWithSuffix;
	}

	const formatNumber = (num) => {
		return parseInt(num).toLocaleString('en-IN');
	};

	const [URLdata, setURLData] = useState({
		mediaType: '',
		shortcode: '',
	});

	const validateSubmit = async (URL) => {
		if (URL != '') {
			var regex =
				/(?:https?:\/\/)?(?:www.)?instagram.com\/?([a-zA-Z0-9\.\_\-]+)?\/([p]+)?([reel]+)?([tv]+)?([stories]+)?\/([a-zA-Z0-9\-\_\.]+)\/?([0-9]+)?/gm; // deepscan-disable-line
			const str = URL;
			let m;
			while ((m = regex.exec(str)) !== null) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				console.log(m);
				identifyURL(m);
			}
		} else {
			setURLData({
				mediaType: '',
				shortcode: '',
			});
		}
	};

	const identifyURL = (m) => {
		if (m[2] == 'p' && m[1] == undefined) {
			setURLData({
				mediaType: 'post',
				shortcode: m[6],
			});
			getReelData(m[6]);
		} else if (
			(m[3] == 'reel' || m[3] == 'reels') &&
			m[1] == undefined
		) {
			setURLData({
				mediaType: 'reel',
				shortcode: m[6],
			});
			getReelData(m[6]);
		} else {
			setURLData({
				mediaType: '',
				shortcode: '',
			});
			console.log('Invalid URL');
		}
	};

	const [modalOpen, setModalOpen] =
		useState(false);

	return (
		<>
			<div className={styles.main}>
				<Header />
				<div className={styles.imageBanner} />
				<div className={styles.reelBanner} />
				<div className={styles.section1Wrapper}>
					<div className={styles.hero}>
						<IoAnalyticsOutline />
						<h1>Wanna Track Analytics?</h1>
						<p>
							Track the progress of content easily and
							accurately!
						</p>
					</div>
					<div className={styles.inputWrapper}>
						<p>
							Track Reels / Videos / Post that are
							playable and public in IG!
						</p>
						<input
							type='text'
							placeholder='Reel URL'
							onChange={(e) =>
								setreelUrl(e.target.value)
							}
							value={reelUrl}
						/>
						<div
							className={styles.submitbtn}
							onClick={() => validateSubmit(reelUrl)}
						>
							<p>Track Data</p>
							<FaArrowRightLong />
						</div>
					</div>
					{currentState === 'datafetched' && (
						<div className={styles.reeldataWrapper}>
							<div className={styles.left}>
								<img
									src={reelData.thumbnail}
									alt=''
								/>

								<div
									className={styles.submit}
									onClick={() => setModalOpen(true)}
								>
									<p>Start Tracking</p>
									<FaArrowRightLong />
								</div>
							</div>
							<div className={styles.right}>
								<h2>Reel Insights</h2>
								<div className={styles.data}>
									<div className={styles.dataItem}>
										<p>
											Caption:{' '}
											<span
												className={styles.captionWrapper}
											>
												{reelData.caption}
											</span>
										</p>
										<p>
											Uploaded By:{' '}
											<span>{reelData.uploadedBy}</span>
										</p>
										<p>
											Uploaded On:{' '}
											<span>
												{formatEpochTime(reelData.uploadTime)}
											</span>
										</p>
									</div>
									<div
										className={styles.videoInsightWrapper}
									>
										<div className={styles.dataItem}>
											<FcLike />
											<p>
												Likes:{' '}
												<span>
													{formatNumber(reelData.likes)}
												</span>
											</p>
										</div>
										<div className={styles.dataItem}>
											<FaEye />
											<p>
												Views:{' '}
												<span>
													{formatNumber(reelData.views)}
												</span>
											</p>
										</div>
										<div className={styles.dataItem}>
											<FaPlay />
											<p>
												Plays:{' '}
												<span>
													{formatNumber(reelData.plays)}
												</span>
											</p>
										</div>
										<div className={styles.dataItem}>
											<MdInsertComment />
											<p>
												Comments:{' '}
												<span>
													{formatNumber(reelData.comments)}
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className={styles.stepsWrapper}>
					<h2>
						HOW TO DO?{' '}
						<span>
							<IoIosArrowDropdown />
						</span>
					</h2>
					<div className={styles.steps}>
						<div className={styles.step}>
							<h3>Step 1</h3>
							<p>
								Open the Instagram app and navigate to the
								video you want to track.
							</p>
							<img
								src='https://igram.world/img/instagram-post-copy-link.webp'
								alt=''
							/>
						</div>
						<div className={styles.step}>
							<h3>Step 2</h3>
							<p>
								Click on the three dots at the top right
								corner of the video and select Copy Link.
							</p>
							<img
								src='https://igram.world/img/instagram-post-copy-link.webp'
								alt=''
							/>
						</div>
						<div className={styles.step}>
							<h3>Step 3</h3>
							<p>
								Paste the link in the above input field
								and click on Track Data.
							</p>
							<img
								src='https://igram.world/img/instagram-post-copy-link.webp'
								alt=''
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
			<CustomModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				url={reelUrl}
				username={reelData.uploadedBy}
			/>
		</>
	);
};

export default Track;
