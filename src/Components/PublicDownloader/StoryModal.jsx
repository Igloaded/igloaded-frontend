import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import styles from './Styles/Storymodal.module.scss';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { FaPlay, FaPause } from 'react-icons/fa';
import {
	HiHeart,
	HiMiniSpeakerWave,
	HiMiniSpeakerXMark,
} from 'react-icons/hi2';
import {
	BiCalendar,
	BiComment,
	BiDownload,
} from 'react-icons/bi';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BsEyeFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';

const StoryModal = ({
	data,
	close,
	open,
	UserData,
}) => {
	const video = useRef(null);
	const MediaInfo = data;
	const [isMuted, setIsMuted] = useState(false);
	const [showControls, setshowControls] =
		useState(false);
	let timeoutId = null;

	useEffect(() => {
		console.log(MediaInfo);
	}, [MediaInfo]);

	// const [MediaInfo, setMediaInfo] = useState({
	// 	username: '',
	// 	full_name: '',
	// 	is_verified: false,
	// 	profilePic: '',
	// 	thumbnail: '',
	// 	video_url: '',
	// 	caption: '',
	// 	views: '',
	// 	plays: '',
	// 	likes: '',
	// 	comments: '',
	// 	date: '',
	// });

	const checkVerification = (username) => {
		const user = usernames.find(
			(user) => user.username === username
		);
		if (user) {
			console.log(user);
			return {
				isVerified: true,
				badgeColor: user.badgeColor,
				role: user.role,
			};
		}
		return {
			isVerified: false,
			badgeColor: '',
			role: '',
		};
	};
	const [usernames, setUsernames] = useState([
		{
			id: 0,
			username: '_.adityyaa',
			role: 'Owner',
			badgeColor: 'red',
		},
		{
			id: 1,
			username: 'power_bgmii',
			role: 'Content Creator',
			badgeColor: 'green',
		},
	]);

	const formatNumber = (num) => {
		return num.toLocaleString('en-IN');
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
	const [isPlaying, setPlaying] = useState(false);
	useEffect(() => {
		if (video.current) {
			setIsMuted(false);
			video.current.muted = false;
		}
	}, []);

	const toggleMute = () => {
		video.current.muted = !video.current.muted;
		setIsMuted(video.current.muted);
	};
	return (
		<div className={styles.Wrapper}>
			<div className={styles.main}>
				<div className={styles.closeWrapper}>
					<div
						className={styles.btn}
						onClick={() => {
							close();
						}}
					>
						<IoMdCloseCircleOutline />
					</div>
				</div>
				<div className={styles.contentDiv}>
					<div className={styles.postWrapper}>
						{MediaInfo.video ? (
							<>
								<video
									ref={video}
									preload='auto'
									poster={MediaInfo.thumbnail}
									onPlay={() => {
										setPlaying(true);
										if (isMuted) {
											setIsMuted(false);
											video.current.muted = false;
										}
									}}
									onPause={() => setPlaying(false)}
									loop
									ismuted={isMuted}
									oncontextmenu={(e) => {
										e.preventDefault();
									}}
								>
									<source
										src={MediaInfo.video}
										type='video/mp4'
									/>
								</video>
								<div
									onMouseEnter={() => {
										setshowControls(true);
										if (timeoutId) clearTimeout(timeoutId);
									}}
									onMouseLeave={() => {
										setshowControls(false);
									}}
									onMouseMove={() => {
										setshowControls(true);
										if (timeoutId) clearTimeout(timeoutId);
										timeoutId = setTimeout(() => {
											setshowControls(false);
										}, 2000); // Hide controls after 2 seconds of inactivity
									}}
									className={
										showControls || !isPlaying
											? `${styles.controllers}`
											: `${styles.controllers} ${styles.hideControls}`
									}
								>
									{isPlaying ? (
										<FaPause
											onClick={() => {
												video.current.pause();
											}}
										/>
									) : (
										<FaPlay
											onClick={() => {
												video.current.play();
											}}
										/>
									)}

									<div className={styles.muteControls}>
										{isMuted ? (
											<HiMiniSpeakerXMark
												onClick={toggleMute}
											/>
										) : (
											<HiMiniSpeakerWave
												onClick={toggleMute}
											/>
										)}
									</div>
								</div>
							</>
						) : (
							<img
								src={MediaInfo.thumbnail}
								alt=''
							/>
						)}
					</div>
					<div className={styles.postInfo}>
						<Tooltip
							style={{ zIndex: '99999' }}
							id='verified'
							content={
								checkVerification(UserData.username).role
							}
							place='top'
						/>
						<Tooltip
							style={{ zIndex: '99999' }}
							id='verified-og'
							content='Verified'
							place='top'
						/>
						<div className={styles.profileInfo}>
							<div className={styles.accountInfo}>
								<img
									src={
										UserData.profilePic
											? UserData.profilePic
											: ''
									}
									alt=''
								/>
								<div className={styles.name}>
									<h2>
										{UserData.full_name}{' '}
										{checkVerification(UserData.username)
											.isVerified ? (
											<IoIosCheckmarkCircle
												style={{
													color: checkVerification(
														UserData.username
													).badgeColor,
												}}
												data-tooltip-id='verified'
											/>
										) : (
											UserData.is_verified && (
												<MdVerified
													style={{ color: '#0095f6' }}
													data-tooltip-id='verified-og'
												/>
											)
										)}
									</h2>
									<p
										onClick={() => {
											window.open(
												`https://www.instagram.com/${UserData.username}`
											);
										}}
									>
										@{UserData.username}
									</p>
								</div>
							</div>
							<a
								className={styles.download}
								href={MediaInfo.video}
								target='!blank'
								download
							>
								<p>Download</p>
								<BiDownload />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoryModal;
