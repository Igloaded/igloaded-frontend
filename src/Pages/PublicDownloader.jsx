import React, {
	useEffect,
	useState,
	useRef,
} from 'react';

import { BsStars } from 'react-icons/bs';

import { FaPlay, FaPause } from 'react-icons/fa';
import {
	HiHeart,
	HiMiniSpeakerWave,
	HiMiniSpeakerXMark,
} from 'react-icons/hi2';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import {
	BiCalendar,
	BiComment,
	BiDownload,
} from 'react-icons/bi';
import { FiLink } from 'react-icons/fi';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { BsEyeFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import { toast } from 'react-toastify';

import styles from '../Styles/PublicDownloader.module.scss';

import Header from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import SkeletonLoader from '../Components/SkeletonLoader.jsx';

import reel from '../assets/Ig/reel.png';
import story from '../assets/Ig/story.png';
import user from '../assets/Ig/profile.png';
import reelDownload from '../assets/staticAssets/Reeldownload.png';
import storyDownload from '../assets/staticAssets/story.png';
import profileDownload from '../assets/staticAssets/profileDownload.svg';
import defaultPic from '../assets/Ig/defaultProfile.png';
import searchAnimation from '../assets/animations/postSearchAnim.gif';
import { vars } from '../../config.js';

import UserStory from '../Components/PublicDownloader/UserStory.jsx';
import TrackingModal from '../Components/PublicDownloader/TrackingModal.jsx';
import LoginModal from '../Components/PublicDownloader/LoginModal.jsx';
import MaxReached from '../Components/PublicDownloader/MaxReachedModal.jsx';
import Cookies from 'js-cookie';
import Transition from '../Transitions.jsx';

const PublicMedia = () => {
	const refreshBtn = useRef(null);
	const [input, setInput] = useState('');
	const [Loading, setLoading] = useState(true);
	const [storyInfo, setStoryInfo] = useState({});

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [usernames, setUsernames] = useState([
		{
			id: 0,
			username: '_.adityyaa',
			role: 'Owner',
			badgeColor: 'red',
		},
	]);
	const [media, setMedia] = useState('');
	const [URLdata, setURLData] = useState({
		mediaType: '',
		shortcode: '',
	});
	const [userInfo, setUserInfo] = useState({
		id: '',
		profile_pic_url: '',
		username: '',
		full_name: '',
		biolink: [],
		biotext: '',
		is_verified: '',
		is_private: '',
		followers: 0,
		following: 0,
		media_count: 0,
	});

	const [MediaInfo, setMediaInfo] = useState({
		profilePic: '',
		date: '',
		thumbnail: '',
		video_url: '',
		shortcode: '',
		is_verified: false,
		views: 0,
		plays: 0,
		likes: 0,
		comments: 0,
		media_type: 'GraphImage',
		full_name: '',
		username: '',
		caption: '',
	});

	useEffect(() => {
		console.log('MediaInfo:', MediaInfo);
	}, [MediaInfo]);

	const [isReelLoaded, setIsReelLoaded] =
		useState('initial');
	const [isPlaying, setPlaying] = useState(false);
	const [isProfileLoaded, setIsProfileLoaded] =
		useState('initial');
	const [isStoryLoaded, setIsStoryLoaded] =
		useState('initial');
	const [isRefreshing, setIsRefreshing] =
		useState(false);
	const video = useRef(null);

	const [isMuted, setIsMuted] = useState(false);
	const [showControls, setshowControls] =
		useState(false);

	let timeoutId = null;

	const [error, setError] = useState({
		isOpen: true,
		errorMsg: '',
	});
	const [placeholder, setPlaceholder] =
		useState('@username');

	const clearFields = () => {
		setInput('');
		setError({
			isOpen: false,
			errorMsg: '',
		});
	};

	const isLoggedin = () => {
		const token = Cookies.get('token');
		if (token) {
			return true;
		} else {
			return false;
		}
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

	const validateUsername = (username, type) => {
		let regex =
			/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
		if (username.match(regex)) {
			if (type == 'story') {
				setRenderContainer('story', 'loading');
				getStoryData(username);
			}

			if (type == 'user') {
				setRenderContainer('profile', 'loading');
				fetchData();
			}

			setError((e) => {
				return {
					...e,
					isOpen: false,
					errorMsg: '',
				};
			});
		} else {
			setURLData((e) => {
				return {
					...e,
					mediaType: '',
					shortcode: '',
				};
			});
			setError((e) => {
				if (username.includes('@')) {
					return {
						...e,
						isOpen: true,
						errorMsg: `Don't Include '@'`,
					};
				} else {
					return {
						...e,
						isOpen: true,
						errorMsg: 'Invalid Username',
					};
				}
			});
		}
	};

	const validateSubmit = async (URL) => {
		if (URL != '') {
			var regex =
				/(?:https?:\/\/)?(?:www.)?instagram.com\/?([a-zA-Z0-9\.\_\-]+)?\/([p]+)?([reel]+)?([tv]+)?([stories]+)?\/([a-zA-Z0-9\-\_\.]+)\/?([0-9]+)?/gm;
			const str = URL;
			let m;
			while ((m = regex.exec(str)) !== null) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				console.log(m);
				identifyURL(m);
				return;
			}
			if (m == null) {
				setError((e) => {
					return {
						...e,
						isOpen: true,
						errorMsg: 'Invalid URL',
					};
				});
				setRenderContainer('post', 'initial');
			}
		} else {
			console.log('Invalid URL');
		}
	};

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

	const identifyURL = (m) => {
		if (m[2] == 'p' && m[1] == undefined) {
			setURLData({
				mediaType: 'post',
				shortcode: m[6],
			});
			getPostData(m[6]);
		} else if (
			(m[3] == 'reel' || m[3] == 'reels') &&
			m[1] == undefined
		) {
			setURLData({
				mediaType: 'reel',
				shortcode: m[6],
			});
			getPostData(m[6]);
		}
	};

	const MediaSelected = (cardNum) => {
		switch (cardNum) {
			case 1:
				setMedia('story');
				setPlaceholder('@username');
				break;

			case 2:
				setMedia('reel');
				setPlaceholder('Post / Reel / IGTV Link');
				break;

			case 3:
				setMedia('user');
				setPlaceholder('@username');
				break;
		}
	};

	const [isFailedModal, setIsFailedModal] =
		useState({
			isOpen: false,
			errorMsg: '',
		});

	const showMaxLimit = () => {
		return (
			<MaxReached
				close={() => {
					setIsFailedModal((prev) => ({
						...prev,
						isOpen: false,
					}));
				}}
				data={isFailedModal.errorMsg}
			/>
		);
	};

	const getStoryData = async (username) => {
		if (!isLoggedin()) {
			setRenderContainer('story', 'initial');
			setIsLoginModalOpen(true);
			return;
		}
		const options = {
			method: 'GET',
			url: `${vars.API_URL}/track/getstory/?username=${username}`,
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			withCredentials: true,
		};

		try {
			const response = await axios.request(options);
			if (response.status == 200) {
				console.log(response.data);
				setStoryInfo({
					profilePic: response.data.data.profile_pic,
					username: response.data.data.username,
					full_name: response.data.data.full_name,
					is_verified: response.data.data.is_verified,
					stories: response.data.data.story,
				});
				setRenderContainer('story', 'loaded');
				showMsg('Story Info Fetched', 'success');
			} else {
				setError((e) => {
					return {
						isOpen: true,
						errorMsg: 'No Stories Found!',
					};
				});
				showMsg('No Stories Found!', 'info');
				setRenderContainer('story', 'initial');
			}
		} catch (err) {
			console.error('Error occurred:', err);
			if (
				err.response.data.message ==
				'Login required to access this route'
			) {
				setRenderContainer('story', 'initial');
				showMsg(err.response.data.error, 'error');
				setIsLoginModalOpen(true);
			} else {
				setRenderContainer('story', 'initial');
				showMsg(err.response.data.message, 'error');
				console.error('Error occurred:', err);
				setIsFailedModal((prev) => ({
					isOpen: true,
					errorMsg: err.response.data.message,
				}));
			}
		}
	};

	const fetchData = async () => {
		if (!isLoggedin()) {
			setRenderContainer('profile', 'initial');
			setIsLoginModalOpen(true);
			return;
		}
		const options = {
			method: 'GET',
			url: `${vars.API_URL}/track/getprofiledata/?username=${input}`,
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			withCredentials: true,
		};

		try {
			const response = await axios.request(options);
			console.log(response.data);
			setUserInfo({
				profilePic: response.data.data.profile_pic,
				id: response.data.data.pk,
				username: response.data.data.username,
				full_name: response.data.data.full_name,
				biolink: response.data.data.bio_links,
				biotext: response.data.data.biography,
				is_verified: response.data.data.is_verified,
				is_private: response.data.data.is_private,
				followers: response.data.data.follower_count,
				following: response.data.data.following_count,
				media_count: response.data.data.media_count,
			});
			setRenderContainer('profile', 'loaded');
			showMsg('Profile Info Fetched', 'success');
		} catch (err) {
			console.error('Error occurred:', err);
			if (
				err.response.data.message ==
				'Login required to access this route'
			) {
				setRenderContainer('profile', 'initial');
				setIsLoginModalOpen(true);
			} else {
				setRenderContainer('profile', 'initial');
				setIsRefreshing(false);
				showMsg(err.response.data.message, 'error');
				setIsFailedModal((prev) => ({
					isOpen: true,
					errorMsg: err.response.data.message,
				}));
			}
		}
	};

	const getPostData = async (
		shortcode,
		isrefresh = false
	) => {
		if (!isLoggedin()) {
			setIsLoginModalOpen(true);
			setRenderContainer('post', 'initial');
			return;
		}
		if (!isrefresh) {
			const options = {
				method: 'GET',
				url: `${vars.API_URL}/track/getreeldata/?shortcode=${shortcode}`,
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				withCredentials: true,
			};
			try {
				const response = await axios.request(options);
				if (response.data.success) {
					console.log(response.data);
					setMediaInfo({
						profilePic: response.data.data.profilePic,
						date: response.data.data.taken_at,
						thumbnail:
							response.data.data.PostData[0].thumbnail,
						video_url:
							response.data.data.PostData[0].video,
						shortcode: response.data.data.code,
						views:
							response.data.data.PostData[0]
								.video_view_count,
						plays:
							response.data.data.PostData[0]
								.video_play_count,
						likes: response.data.data.like_count,
						comments: response.data.data.comment_count,
						media_type: response.data.data.type,
						full_name: response.data.data.full_name,
						username: response.data.data.username,
						caption: response.data.data.captionText,
						is_verified: response.data.data.is_verified,
					});
					showMsg('Post Info Fetched', 'success');
					setPlaying(false);
					setRenderContainer('post', 'loaded');
				} else {
					setError((e) => {
						return {
							isOpen: true,
							errorMsg: 'Carousel Post Coming Soon!',
						};
					});
					showMsg(
						'Carousel Post Coming Soon!',
						'info'
					);
					setRenderContainer('post', 'initial');
				}
			} catch (err) {
				console.error('Error occurred:', err);
				if (
					err.response.data.message ==
					'Login required to access this route'
				) {
					setRenderContainer('post', 'initial');
					setIsLoginModalOpen(true);
				} else {
					showMsg(err.response.data.message, 'error');
					setRenderContainer('post', 'initial');
					setIsFailedModal((prev) => ({
						isOpen: true,
						errorMsg: err.response.data.message,
					}));
				}
			}
		} else {
			const options = {
				method: 'GET',
				url: `${vars.API_URL}/track/getreeldata/?shortcode=${shortcode}`,
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
				withCredentials: true,
			};

			try {
				const response = await axios.request(options);
				if (response.data.success) {
					setMediaInfo((e) => ({
						...e,
						profilePic: response.data.data.profilePic,
						thumbnail:
							response.data.data.PostData[0].thumbnail,
						shortcode: response.data.data.code,
						views:
							response.data.data.PostData[0]
								.video_view_count,
						plays:
							response.data.data.PostData[0]
								.video_play_count,
						likes: response.data.data.like_count,
						comments: response.data.data.comment_count,
						full_name: response.data.data.full_name,
						username: response.data.data.username,
						caption: response.data.data.captionText,
						is_verified: response.data.data.is_verified,
					}));
					setIsRefreshing(false);
					showMsg('Post Refreshed', 'success');
				} else {
					setError((e) => {
						return {
							isOpen: true,
							errorMsg: 'Carousel Post Coming Soon!',
						};
					});
					showMsg(
						'Carousel Post Coming Soon!',
						'info'
					);
					setRenderContainer('post', 'initial');
				}
			} catch (err) {
				if (
					err.response.data.message ==
					'Login required to access this route'
				) {
					setRenderContainer('post', 'initial');
					setIsLoginModalOpen(true);
				} else {
					setRenderContainer('post', 'initial');
					setIsRefreshing(false);
					showMsg(err.response.data.message, 'error');
					console.error('Error occurred:', err);
					setIsFailedModal((prev) => ({
						isOpen: true,
						errorMsg: err.response.data.message,
					}));
				}
			}
		}
	};

	const [
		isTrackingModalOpen,
		setIsTrackingModalOpen,
	] = useState(false);

	const trackNewReel = () => {
		return (
			<TrackingModal
				close={() => {
					setIsTrackingModalOpen(false);
				}}
				data={{
					shortcode: MediaInfo.shortcode,
					thumbnail: MediaInfo.thumbnail,
					views: MediaInfo.views,
					plays: MediaInfo.plays,
					likes: MediaInfo.likes,
					username: MediaInfo.username,
					uploadDate: MediaInfo.date,
				}}
			/>
		);
	};

	const formatNumber = (num) => {
		return num.toLocaleString('en-IN');
	};

	const submitURL = () => {
		setError({
			isOpen: false,
			errorMsg: '',
		});

		if (input == '') {
			setError({
				isOpen: true,
				errorMsg: 'Please submit an URL',
			});
			return;
		}
		if (media == 'story' || media == 'user') {
			validateUsername(input, media);
		} else if (media == 'reel') {
			if (
				MediaInfo.shortcode != '' &&
				input.includes(MediaInfo.shortcode)
			) {
				if (!isRefreshing) {
					refreshReelData();
				} else {
					console.log('Already Refreshing');
				}
			} else {
				setRenderContainer('post', 'loading');
				validateSubmit(input);
			}
		}
	};

	useEffect(() => {
		setMedia('story');
		setPlaceholder('@username');
	}, []);

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

	const refreshReelData = () => {
		setIsRefreshing(true);
		getPostData(MediaInfo.shortcode, true);
	};

	const showMsg = (msg, type) => {
		if (type === 'error') {
			return toast.error(msg);
		} else if (type === 'success') {
			return toast.success(msg);
		} else if (type === 'info') {
			return toast.info(msg);
		} else if (type === 'warning') {
			return toast.warning(msg);
		}
		toast.success(msg);
	};

	const setRenderContainer = (
		ContainerName,
		status
	) => {
		if (ContainerName == 'post') {
			setIsReelLoaded(status);
			setIsProfileLoaded('initial');
			setIsStoryLoaded('initial');
		} else if (ContainerName == 'profile') {
			setIsProfileLoaded(status);
			setIsReelLoaded('initial');
			setIsStoryLoaded('initial');
		} else if (ContainerName == 'story') {
			setIsStoryLoaded(status);
			setIsReelLoaded('initial');
			setIsProfileLoaded('initial');
		}
	};

	const [isLoginModalOpen, setIsLoginModalOpen] =
		useState(false);

	return (
		<div className={styles.Wrapper}>
			{isLoginModalOpen && (
				<LoginModal
					close={() => {
						setIsLoginModalOpen(false);
					}}
					data={{
						title: 'Seems You Loved It!',
						description:
							'Please login to continue searching',
					}}
				/>
			)}
			{isTrackingModalOpen && trackNewReel()}
			{isFailedModal.isOpen && showMaxLimit()}
			<Header />
			<div className={styles.mainHome}>
				<Tooltip
					className={styles.tooltipError}
					id='textbox'
					content={error.errorMsg}
					place='bottom-end'
					isOpen={error.isOpen}
				/>
				<div className={styles.upperWrapper}>
					<h3>
						Watch Post, Stories & Profiles Anonymously
					</h3>
					<div className={styles.mediaSelectWrapper}>
						<div
							className={
								media == 'story'
									? `${styles.mediaCard} ${styles.active}`
									: `${styles.mediaCard}`
							}
							onClick={() => {
								MediaSelected(1);
							}}
						>
							<img
								src={story}
								alt=''
							/>
							<p>Story</p>
						</div>
						<div
							className={
								media == 'reel'
									? `${styles.mediaCard} ${styles.active}`
									: `${styles.mediaCard}`
							}
							onClick={() => {
								MediaSelected(2);
							}}
						>
							<img
								src={reel}
								alt=''
							/>
							<p>Post / Reel / IGTV</p>
						</div>
						<div
							className={
								media == 'user'
									? `${styles.mediaCard} ${styles.active}`
									: `${styles.mediaCard}`
							}
							onClick={() => {
								MediaSelected(3);
							}}
						>
							<img
								src={user}
								alt=''
							/>
							<p>User Profile</p>
						</div>
					</div>
					<div className={styles.inputWrapper}>
						<input
							type='text'
							placeholder={placeholder}
							onChange={(e) => {
								setInput(e.target.value);
								setError((e) => {
									return {
										...e,
										isOpen: false,
										errorMsg: '',
									};
								});
							}}
							data-tooltip-id='textbox'
							value={input}
						/>
						<div
							className={styles.inputSubmit}
							onClick={submitURL}
						>
							<p>Go!</p>
						</div>
					</div>
				</div>
				{isStoryLoaded == 'loaded' && (
					<UserStory data={storyInfo} />
				)}
				{isStoryLoaded == 'loading' && (
					<div className={styles.profileLoading}>
						<div className={styles.loader}></div>
						<h3>Collecting Stories</h3>
						<p>Hang on</p>
					</div>
				)}
				{isProfileLoaded == 'loading' && (
					<div className={styles.profileLoading}>
						<div className={styles.loader}></div>
						<h3>Searching Profile</h3>
						<p>Hang on</p>
					</div>
				)}
				{isProfileLoaded == 'loaded' && (
					<div
						id='#profile'
						className={styles.profileWrapper}
					>
						<div className={styles.topsection}>
							<img
								src={
									userInfo.profilePic
										? userInfo.profilePic
										: defaultPic
								}
								alt=''
							/>
						</div>
						<div className={styles.nameWrapper}>
							<p className={styles.username}>
								{userInfo.username}
								{checkVerification(userInfo.username)
									.isVerified ? (
									<IoIosCheckmarkCircle
										style={{
											color: checkVerification(
												userInfo.username
											).badgeColor,
										}}
										data-tooltip-id='verified'
									/>
								) : (
									userInfo.is_verified && (
										<MdVerified
											style={{ color: '#0095f6' }}
											data-tooltip-id='verified-og'
										/>
									)
								)}
							</p>
							<Tooltip
								id='verified'
								content={
									checkVerification(userInfo.username).role
								}
								place='right'
							/>
							<Tooltip
								id='verified-og'
								content='Verified'
								place='right'
							/>
							<h2 className={styles.name}>
								{userInfo.full_name}
							</h2>
							{userInfo.is_private && (
								<span>Private</span>
							)}
							<div className={styles.stats}>
								<div className={styles.stat}>
									<p>{userInfo.followers}</p>
									<p>Followers</p>
								</div>
								<div className={styles.stat}>
									<p>{userInfo.media_count}</p>
									<p>Posts</p>
								</div>
								<div className={styles.stat}>
									<p>{userInfo.following}</p>
									<p>Following</p>
								</div>
							</div>
							<p className={styles.bio}>
								{userInfo.biotext}
							</p>
							{userInfo.biolink.map((link) => {
								return (
									<div
										key={link.id}
										className={styles.bioUrl}
									>
										<FiLink />
										<a href={link.url}>
											{link.title ? link.title : link.url}
										</a>
									</div>
								);
							})}
						</div>
					</div>
				)}
				{isReelLoaded == 'loading' && (
					<SkeletonLoader />
				)}
				{isReelLoaded == 'loaded' && (
					<div className={styles.contentDiv}>
						<div className={styles.postWrapper}>
							{MediaInfo.media_type == 'GraphVideo' && (
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
											src={MediaInfo.video_url}
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
							)}
							{MediaInfo.media_type == 'GraphImage' && (
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
								content='Community Verified'
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
											MediaInfo.profilePic != undefined
												? MediaInfo.profilePic
												: defaultPic
										}
										alt=''
									/>
									<div className={styles.name}>
										<h2>
											{MediaInfo.full_name}{' '}
											{checkVerification(MediaInfo.username)
												.isVerified ? (
												<IoIosCheckmarkCircle
													style={{
														color: checkVerification(
															MediaInfo.username
														).badgeColor,
													}}
													data-tooltip-id='verified'
												/>
											) : (
												MediaInfo.is_verified && (
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
													`https://www.instagram.com/${MediaInfo.username}`
												);
											}}
										>
											@{MediaInfo.username}
										</p>
									</div>
									<div
										ref={refreshBtn}
										className={
											!isRefreshing
												? `${styles.refreshWrapper}`
												: `${styles.refreshWrapper} ${styles.rotate}`
										}
										onClick={() => {
											if (!isRefreshing) {
												refreshReelData();
											} else {
												console.log('Already Refreshing');
											}
										}}
										data-tooltip-id='refresh'
									>
										<TbRefresh />
										<Tooltip
											id='refresh'
											content='Refresh Data'
											place='right'
										/>
									</div>
								</div>
								<p className={styles.captionInfo}>
									{MediaInfo.caption}
								</p>
								<div className={styles.postMetadata}>
									<div
										className={styles.chunkWrapper}
										title='Views'
									>
										<BsEyeFill />
										<p>
											{formatNumber(
												MediaInfo.views != null
													? MediaInfo.views
													: '0'
											)}
										</p>
									</div>
									<div
										className={styles.chunkWrapper}
										title='Plays'
									>
										<FaPlay />
										<p>
											{formatNumber(
												MediaInfo.plays != null
													? MediaInfo.plays
													: '0'
											)}
										</p>
									</div>
									<div
										className={styles.chunkWrapper}
										title='Likes'
									>
										<HiHeart />
										<p>
											{MediaInfo.likes != '-1'
												? formatNumber(MediaInfo.likes)
												: 'Hidden'}
										</p>
									</div>

									<div
										className={styles.chunkWrapper}
										title='Comments'
									>
										<BiComment />
										<p>
											{MediaInfo.comments != '-1'
												? formatNumber(MediaInfo.comments)
												: 'Hidden'}
										</p>
									</div>
									<div
										className={styles.chunkWrapper}
										title='Date Posted'
									>
										<BiCalendar />
										<p>{formatEpochTime(MediaInfo.date)}</p>
									</div>
								</div>
								<div className={styles.btnWrapper}>
									<a
										className={styles.btn}
										href={MediaInfo.video_url}
										target='!blank'
										download
									>
										<p>Download</p>
										<BiDownload />
									</a>
									{/* {MediaInfo.plays && (
										<div
											className={styles.btn}
											onClick={() => {
												setIsTrackingModalOpen(true);
											}}
										>
											<p>Start Tracking</p>
											<BsStars />
										</div>
									)} */}
								</div>
							</div>
						</div>
					</div>
				)}
				<>
					<div className={styles.animationSearch}>
						<p>Start Peeking!</p>
						<img
							src={searchAnimation}
							alt=''
						/>
					</div>
					<div className={styles.label}>
						<p>How to use?</p>
						<FaRegQuestionCircle />
					</div>
					<div className={styles.guideWrapper}>
						<div className={styles.guideItem}>
							<div className={styles.itemLeft}>
								<img
									src={reelDownload}
									alt=''
								/>
							</div>
							<div className={styles.itemRight}>
								<h2>Search Post</h2>
								<p>
									Wanna see some content? Search for any
									post and view it anonymously. Just by
									putting the post link in the search box.
									Track precise statistics of any post.
									Including likes, comments, views, plays
									and much more.
								</p>
							</div>
						</div>
						<div className={styles.guideItem}>
							<div className={styles.itemLeft}>
								<img
									src={profileDownload}
									alt=''
								/>
							</div>
							<div className={styles.itemRight}>
								<h2>Search Profiles</h2>
								<p>
									Looking for someone? Search for any
									profile and view account statistics and
									posts anonymously.
								</p>
							</div>
						</div>
						<div className={styles.guideItem}>
							<div className={styles.itemLeft}>
								<img
									src={storyDownload}
									alt=''
								/>
							</div>
							<div className={styles.itemRight}>
								<h2>Search Stories</h2>
								<p>
									Search for any user and view their
									stories anonymously. Just by putting the
									username in the search box.
								</p>
							</div>
						</div>
					</div>
				</>
			</div>
			<Footer />
		</div>
	);
};

export default Transition(PublicMedia);
