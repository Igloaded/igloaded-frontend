import React, {
	useState,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import Footer from '../Components/Footer';
import Axios from 'axios';
import styles from '../Styles/PrivateMedia.module.css';
import { MdContentCopy } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import {
	BsArrowLeftCircleFill,
	BsArrowRightCircleFill,
} from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { BsDownload } from 'react-icons/bs';
import {
	AiOutlineHeart,
	AiOutlineEye,
} from 'react-icons/ai';

import { PiFileZipBold } from 'react-icons/pi';
import {
	ToastContainer,
	toast,
} from 'react-toastify';

const PrivateMedia = () => {
	const downloadBtn = useRef('');
	const MainDiv = useRef('');
	const VideoRef = useRef('');
	const VideoRefOuter = useRef('');
	const seekbar = useRef('');
	const seekbarOuter = useRef('');
	const IconRef = useRef('');
	const IconRefOuter = useRef('');
	const redirectProfile = (profile) => {
		window.open(
			`https://www.instagram.com/${profile}`,
			'!blank'
		);
	};

	const url =
		'https://instagram.fhyd10-1.fna.fbcdn.net/o1/v/t16/f1/m82/4847E79C34B9766CC4C4B6353EBEB995_video_dashinit.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uNzIwLmNsaXBzLmJhc2VsaW5lIn0&_nc_ht=instagram.fhyd10-1.fna.fbcdn.net&_nc_cat=101&vs=7048534775196545_2608980479&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC80ODQ3RTc5QzM0Qjk3NjZDQzRDNEI2MzUzRUJFQjk5NV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVABgkR0ZobVBST21RSGlvLUk0Q0FLa2IxTFl3NEt4cWJxX0VBQUFGFQICyAEAKAAYABsAFQAAJubvoJes7vM%2FFQIoAkMzLBdAKzMzMzMzMxgSZGFzaF9iYXNlbGluZV8xX3YxEQB1%2FgcA&_nc_rid=848e95b12e&ccb=9-4&oh=00_AfDsMIcVuWodrwRFwIij0a6LKJogvwDojxs8EAei_0OMig&oe=646099D5&_nc_sid=74f7ba';

	const [value, setValue] = useState(10);
	const [isActive, setIsActive] = useState(false);
	const [overlay, setOverlay] = useState(false);
	const [isReel, setReel] = useState(true);
	const [MediaURL, setMediaURL] = useState('');
	const [ProfileURL, setProfileURL] = useState('');
	const [ProfileBio, setProfileBio] = useState('');
	const [like, setLike] = useState('');
	const [view, setView] = useState('');
	const [username, setUsername] = useState('');
	const [comment, setComment] = useState('');
	const [Name, setName] = useState('');
	const [UploadDate, setUploadDate] = useState('');
	const [Caption, setCaption] = useState('');
	const [VideoUrl, setVideoUrl] = useState('');
	const [thumbnail, setThumbnail] = useState('');
	const [Data, setData] = useState('');
	const [fileName, setFilename] = useState('');
	const [tagged, setTagged] = useState('');
	const [currentUsername, setCurrentUsername] =
		useState('');
	const [Post, setPost] = useState(0);
	const [Following, setFollowing] = useState(0);
	const [Follower, setFollower] = useState(0);
	const [mediaArray, setMediaArray] = useState([]);
	const [testImg, settestImg] = useState(null);
	const [currentMode, setCurrentMode] =
		useState('');
	const [SelectedMedia, setSelectedMedia] =
		useState('');
	const [UserData, setUserData] = useState({
		id: '123',
		FullName: 'Aditya',
		Followers: 205,
		Following: 165,
		Post: 0,
	});

	const profileref = useRef('');

	const [currentState, setCurrentState] = useState(
		{
			id: 0,
			url: null,
			type: '',
		}
	);

	const [MediaDetails, setMediaDetails] = useState(
		{
			accountName: null,
			username: null,
			media: [{ id: 0, url: '', type: '' }],
			caption: null,
			datePosted: null,
			taggedAccounts: null,
			likes: 0,
			views: 0,
			comments: 0,
			id: 0,
			fullName: null,
			profilePic: null,
		}
	);

	const [storyDetails, setStoryDetails] = useState(
		{
			profilePicture: null,
			Username: null,
			Media: [
				{
					thumbnail: null,
					video: null,
					taggedUsers: [],
					caption: null,
					dateShared: null,
				},
			],
		}
	);

	const toastProps = {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false,
		progress: undefined,
		theme: 'light',
	};

	const Toast = (msg, type) => {
		if (type == 'warning') {
			toast.warn(msg, toastProps);
		} else if (type == 'error') {
			toast.error(msg, toastProps);
		} else if (type == 'info') {
			toast.info(msg, toastProps);
		} else if (type == 'success') {
			toast.success(msg, toastProps);
		} else {
			toast(msg, toastProps);
		}
	};

	const generateURL = (url) => {
		if (url != '' && url.length > 35) {
			setProfileURL(
				removeUrlSegment(url) + `?__a=1&__d=dis`
			);
		} else {
			setProfileURL('');
		}
	};

	const copyBtn = () => {
		navigator.clipboard.writeText(ProfileURL).then(
			() => {
				showToast('URL Copied!', 'success');
			},
			() => {
				alert('Not copied', 'error');
			}
		);
	};

	function removeUrlSegment(url) {
		var pattern = /\/\?.*$/;
		var cleanedUrl = url.replace(pattern, '');
		return cleanedUrl;
	}

	const processCaption = (str) => {
		const processedStr = str.replace(/\\n/g, '\n');
		return processedStr;
	};

	const ConvertDate = (unix) => {
		const unixTimestamp = unix;
		const date = new Date(unixTimestamp * 1000);
		const options = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		};

		const formattedDate = date.toLocaleString(
			'en-US',
			options
		);
		return formattedDate;
	};

	useEffect(() => {
		let interval = null;
		if (isActive && value > 0) {
			interval = setInterval(() => {
				setValue((value) => value - 1);
			}, 1000);
		} else if (!isActive && value !== 0) {
			clearInterval(interval);
		} else if (isActive && value === 0) {
			setTimeout(() => {
				DownloadMedia(VideoUrl, fileName);
			}, 1000);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive, value]);

	const DownloadMedia = (url, filename) => {
		console.log(url);
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		link.click();
	};

	const showIcon = () => {
		IconRef.current.style.opacity = 1;
	};

	const HideIcon = () => {
		IconRef.current.style.opacity = 0;
	};

	const showIconOuter = () => {
		IconRefOuter.current.style.opacity = 1;
	};

	const HideIconOuter = () => {
		IconRefOuter.current.style.opacity = 0;
	};

	const CloseModal = () => {
		document.body.style.overflowY = 'auto';
		setOverlay(false);
		showIcon();
	};

	const HandleImageCors = async (url) => {
		try {
			const fetchurl =
				'https://corsproxy.io/?' +
				encodeURIComponent(url);
			const response = await Axios.get(fetchurl, {
				responseType: 'arraybuffer',
			});
			const imageData = response.data;
			const blob = new Blob([imageData], {
				type: 'image/jpeg',
			});
			const imageUrl = URL.createObjectURL(blob);
			return imageUrl;
		} catch (err) {
			console.log(err);
		}
	};

	const previousMedia = () => {
		if (
			MediaDetails.media.length > 1 &&
			currentState.id != 0
		) {
			let id = currentState.media.id - 1;
			setCurrentState((prev) => ({
				prev,
				id: id,
				url: MediaDetails.media[id].url,
				type: MediaDetails.media[id].type,
			}));
			setSelectedMedia(MediaDetails.media[id]);
		} else {
			Toast('End of Media', 'error');
		}
	};

	const nextMedia = () => {
		if (
			MediaDetails.media.length > 1 &&
			MediaDetails.media.length !=
				currentState.id - 1
		) {
			let id = currentState.media.id + 1;
			setCurrentState((prev) => ({
				...prev,
				id: id,
				url: MediaDetails.media[id].url,
				type: MediaDetails.media[id].type,
			}));
			setSelectedMedia(MediaDetails.media[id]);
		} else {
			Toast('End of Media', 'error');
		}
	};

	const handlePlay = () => {
		if (VideoRef.current.paused) {
			VideoRef.current.play();
			HideIcon();
		} else {
			VideoRef.current.pause();
			showIcon();
		}
	};

	const handlePlayOuter = () => {
		if (VideoRefOuter.current.paused) {
			VideoRefOuter.current.play();
			HideIconOuter();
		} else {
			VideoRefOuter.current.pause();
			showIconOuter();
		}
	};

	const HandleMoreInfo = () => {
		VideoRefOuter.current.pause();
		showIconOuter();
		document.body.style.overflowY = 'hidden';
		setOverlay(true);
	};

	const getStoryData = () => {
		const getStoryMedia = () => {
			let response = JSON.parse(Data);
			let MainNode =
				response.data.reels_media[0].items;
			let ArrayData = [];

			if (MainNode.length != 0) {
				for (let i = 0; i < MainNode.length; i++) {
					let ObjectData = {};
					if (
						MainNode[i].__typename == 'GraphStoryVideo'
					) {
						ObjectData['Type'] = 'Video';
						ObjectData['thumbnail'] =
							MainNode[i].display_url;
						ObjectData['video'] =
							MainNode[i].video_resources[0].src;
						ObjectData['dateShared'] =
							MainNode[i].taken_at_timestamp;
						ObjectData['taggedUsers'] = getTaggedUsers(
							MainNode[i]
						);
					} else if (
						MainNode[i].__typename == 'GraphStoryImage'
					) {
						ObjectData['Type'] = 'Image';
						ObjectData['thumbnail'] =
							MainNode[i].display_url;
						ObjectData['video'] = null;
						ObjectData['dateShared'] =
							MainNode[i].taken_at_timestamp;
						ObjectData['taggedUsers'] = getTaggedUsers(
							MainNode[i]
						);
					}
					ArrayData.push(ObjectData);
				}
			}
			return ArrayData;
		};

		if (Data != '') {
			let response = JSON.parse(Data);
			let MainNode = response.data.reels_media;
			if (MainNode.length != 0) {
				console.log(MainNode);
				setStoryDetails({
					profilePicture:
						MainNode[0].owner.profile_pic_url,
					Username: MainNode[0].owner.username,
					Media: getStoryMedia(),
				});
			}

			// setStoryDetails({
			// 	Username: response.
			// })
		}
	};

	useEffect(() => {
		console.log(storyDetails);
	}, [storyDetails]);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		if (MediaURL != '') {
	// 			if (
	// 				MediaURL.includes('www') ||
	// 				MediaURL.includes('https')
	// 			) {
	// 				setCurrentMode('post');
	// 				generateURL(MediaURL);
	// 				console.log('Post');
	// 			} else if (MediaURL.startsWith('@', 0)) {
	// 				setCurrentMode('story');
	// 				GetStoryID(MediaURL);
	// 			}
	// 		} else {
	// 			setProfileURL('');
	// 		}
	// 	}, 2000);

	// 	return () => {
	// 		clearTimeout(timer);
	// 	};
	// }, [MediaURL]);

	const getTaggedUsers = (Obj) => {
		let TaggedUsers = [];
		if (
			Obj.tappable_objects != [] &&
			Obj.tappable_objects.length != 0
		) {
			if (Obj.tappable_objects.length > 1) {
				for (
					let j = 0;
					j < Obj.tappable_objects.length;
					j++
				) {
					if (
						Obj.tappable_objects[j].__typename ==
						'GraphTappableMention'
					) {
						TaggedUsers.push(
							Obj.tappable_objects[j].username
						);
					}
				}
			} else if (Obj.tappable_objects.length == 1) {
				if (
					Obj.tappable_objects[0].__typename ==
					'GraphTappableMention'
				) {
					TaggedUsers.push(
						Obj.tappable_objects[0].username
					);
				}
			}
		}
		return TaggedUsers;
	};

	const ValidateResponseSubmit = () => {
		if (Data != '') {
			const response = JSON.parse(Data);
			getStoryData();
		}
	};

	const GetStoryID = async (username) => {
		function validateInstagramUsername(username) {
			var pattern = /^@[a-zA-Z0-9._]{1,30}$/;
			if (pattern.test(username)) {
				return true;
			} else {
				return false;
			}
		}

		const RemoveAt = (username) => {
			return username.slice(1);
		};

		const generateStoryURL = (id) => {
			setProfileURL(
				`https://www.instagram.com/graphql/query/?query_hash=de8017ee0a7c9c45ec4260733d81ea31&variables=%7B%22reel_ids%22%3A%5B%22${id}%22%5D%2C%22tag_names%22%3A%5B%5D%2C%22location_ids%22%3A%5B%5D%2C%22highlight_reel_ids%22%3A%5B%5D%2C%22precomposed_overlay%22%3Afalse%2C%22show_story_viewer_list%22%3Atrue%2C%22story_viewer_fetch_count%22%3A50%2C%22story_viewer_cursor%22%3A%22%22%7D`
			);
		};

		if (validateInstagramUsername(username)) {
			console.log('Here');
			const options = {
				method: 'GET',
				url: `https://instagram174.p.rapidapi.com/api/v1/user/${RemoveAt(
					username
				)}/id`,
				headers: {
					'X-RapidAPI-Key':
						'435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a',
					'X-RapidAPI-Host':
						'instagram174.p.rapidapi.com',
				},
			};
			try {
				const response = await Axios.request(options);
				console.log(response);
				if (response.data.status != 'ok') {
					Toast('Username not found!', 'error');
				} else {
					console.log(response.data);
					generateStoryURL(response.data.result);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			Toast('Invalid Username', 'error');
		}
	};

	const validateStoryJSON = () => {
		let response = JSON.parse(Data);
		console.log(response);
	};

	async function getCORSFreeImage(corsEnabledURL) {
		const options = {
			method: 'GET',
			url: 'https://cors-proxy4.p.rapidapi.com/',
			params: {
				url: corsEnabledURL,
			},
			headers: {
				'X-RapidAPI-Key':
					'435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a',
				'X-RapidAPI-Host':
					'cors-proxy4.p.rapidapi.com',
			},
		};

		try {
			const response = await Axios.request(options);
			return response.data.toString();
		} catch (error) {
			console.error(error);
		}
	}

	const UpdateSeekPos = () => {
		var percentage =
			(VideoRef.current.currentTime /
				VideoRef.current.duration) *
			100;
		seekbar.current.style.width = `${percentage}%`;
	};

	const UpdateSeekPosOuter = () => {
		var percentage =
			(VideoRefOuter.current.currentTime /
				VideoRefOuter.current.duration) *
			100;
		seekbarOuter.current.style.width = `${percentage}%`;
	};

	useEffect(() => {
		console.log(MediaDetails);
	}, [MediaDetails]);

	const ValidateSubmit = () => {
		if (
			currentUsername == '' ||
			currentUsername != MediaURL
		) {
			setCurrentUsername(MediaURL);
			if (MediaURL.length == 0) {
				profileref.current.placeholder =
					'_ _ _ _ _ _ _ _ _';
			} else {
				if (
					MediaURL.includes('www') ||
					MediaURL.includes('https')
				) {
					getPostData();
				} else if (
					MediaURL.startsWith('@', 0) &&
					MediaURL.length > 1
				) {
					setProfileURL('');
					GetStoryID(MediaURL);
					profileref.current.placeholder =
						'Loading . . .';
				}
			}
		} else {
			Toast('No change', 'info');
		}
	};

	const getPostData = async () => {
		const taggedUser = (object) => {
			let usernames = [];
			if (object.items[0]?.usertags?.in) {
				for (
					let i = 0;
					i < object.items[0]?.usertags?.in?.length;
					i++
				) {
					usernames.push(
						object.items[0].usertags.in[i].user.username
					);
				}
			}
			return usernames;
		};

		const getMediaContents = (object) => {
			let MediaContent = [];
			if (object.items[0].media_type == 1) {
				let LocalObj = {
					id: 0,
					url: RemoveCors(
						object.items[0].image_versions2
							.candidates[0].url
					),
					type: 'Image',
				};
				MediaContent.push(LocalObj);
			} else if (object.items[0].media_type == 8) {
				for (
					let i = 0;
					i < object.items[0].carousel_media_count;
					i++
				) {
					if (
						object.items[0].carousel_media[i]
							.media_type == 1
					) {
						let LocalObj = {
							id: i,
							url: HandleImageCors(
								object.items[0].carousel_media[i]
									.image_versions2.candidates[0].url
							),
							type: 'Image',
						};
						MediaContent.push(LocalObj);
					} else {
						let LocalObj = {
							id: 0,
							url: object.items[0].carousel_media[i]
								.video_versions[0].url,
							type: 'Video',
						};
						MediaContent.push(LocalObj);
					}
				}
			} else if (object.items[0].media_type == 2) {
				let LocalObj = {
					id: 0,
					url: RemoveCors(
						object.items[0].video_versions[0].url
					),
					type: 'Video',
				};
				MediaContent.push(LocalObj);
			}
			return MediaContent;
		};

		if (Data != '') {
			const Resp = await JSON.parse(Data);
			console.log(Resp);
			const MediaType = Resp.items[0].media_type;
			getMedia(Resp, MediaType);
			setMediaDetails({
				accountName: Resp.items[0].user.full_name,
				username: Resp.items[0].user.username,
				caption: processCaption(
					Resp.items[0].caption != null
						? Resp.items[0].caption.text
						: 'null'
				),
				likes: Resp.items[0].like_count,
				views: Resp.items[0].play_count
					? Resp.items[0].play_count
					: Resp.items[0].view_count
						? Resp.items[0].view_count
						: 'none',
				comments: Resp.items[0].comment_count,
				taggedAccounts: taggedUser(Resp).toString(),
				datePosted: ConvertDate(
					Resp.items[0].taken_at
				),
				media: getMediaContents(Resp),
				id: Resp.items[0].user.pk,
				profilePic:
					Resp.items[0].user.profile_pic_url,
			});
			const uploadDate = Resp.items[0].taken_at;
			var time = ConvertDate(uploadDate);
			var filename = `${
				uploadDate + `_` + username + '.mp4'
			}`;
			mapMedia();
			console.log(
				getCORSFreeImage(
					'https://instagram.fbom12-2.fna.fbcdn.net/v/t51.2885-19/135049202_813045199545510_6097273325087953330_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbom12-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=-a4oEF9Hj9EAX-nt_Lf&edm=AABBvjUBAAAA&ccb=7-5&oh=00_AfCW7ejnEi8Co3EeyLfxQ2sh9pMPjlTjoyUHs9ejdXzvhA&oe=64AF025D&_nc_sid=4f4799'
				)
			);
			console.log(MediaDetails);
		}
	};

	const showToast = (Msg, event) => {
		switch (event) {
			case 'success':
				toast.success(Msg, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
				break;

			case 'error':
				toast.error(Msg, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
				break;

			case 'info':
				toast.info(Msg, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
				break;

			case 'warning':
				toast.warn(Msg, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
				break;

			default:
				toast(Msg, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'light',
				});
				break;
		}
	};

	const getMediaType = (obj) => {
		if (obj == 1) {
			return 1;
		} else if (obj == 2) {
			return 2;
		} else if (obj == 8) {
			return 8;
		} else {
			return -1;
		}
	};

	const mapMedia = () => {
		setSelectedMedia(MediaDetails.media[0].url);
		setCurrentState((prev) => ({
			...prev,
			id: MediaDetails.media[0].id,
			url: MediaDetails.media[0].url,
			type: MediaDetails.media[0].type,
		}));
	};

	const getMedia = (Resp, mt) => {
		let itemList = [];
		let item = {};
		if (mt == 1) {
			item[`Thumbnail`] =
				Resp.items[0].image_versions2.candidates[0].url;
			itemList.push(item);
			console.log(itemList);
			return itemList;
		} else if (mt == 2) {
			item[`Thumbnail`] =
				Resp.items[0].image_versions2.candidates[0].url;
			item[`Video`] =
				Resp.items[0].video_versions[0].url;
			itemList.push(item);
			console.log(itemList);
			return itemList;
		} else if (mt == 8) {
			for (
				let i = 0;
				i < Resp.items[0].carousel_media_count;
				i++
			) {
				item[`Id`] = i;
				item[`Thumbnail`] =
					Resp.items[0].carousel_media[
						i
					].image_versions2.candidates[0].url;
				if (
					Resp.items[0].carousel_media[i].media_type ==
					2
				) {
					item[`Video`] =
						Resp.items[0].carousel_media[
							i
						].video_versions[0].url;
				}
				itemList.push(item);
			}
			return itemList;
		}
		console.log(itemList);
	};

	useEffect(() => {
		console.log(SelectedMedia);
	}, [SelectedMedia]);

	return (
		<>
			<ToastContainer />

			<div
				ref={MainDiv}
				className={styles.main}
			>
				<nav className={styles.header}>
					<div className={styles.heading_text}>
						IGTOOLS - Private Media Downloader
					</div>
				</nav>
				<section className={styles.section1}>
					<div className={styles.tokenContainer}>
						<input
							type='text'
							value={MediaURL}
							className={styles.urlbox}
							placeholder='Post / Reel Url or Username with `@`'
							onChange={(e) => {
								setMediaURL(e.target.value);
							}}
						/>
						<div
							className={styles.submitQuery}
							onClick={ValidateSubmit}
						>
							Check
						</div>
					</div>
					<div className={styles.tokenContainer}>
						<input
							ref={profileref}
							type='text'
							value={ProfileURL}
							className={styles.tokenbox}
							placeholder=' - - - - - - - - - - - - '
							readOnly
						/>
						<div
							className={styles.copy}
							title='Copy URL'
							onClick={() => copyBtn()}
						>
							<MdContentCopy />
						</div>
					</div>
					<textarea
						rows='7'
						cols='10'
						type='text'
						value={Data}
						onChange={(e) => setData(e.target.value)}
						className={styles.databox}
						placeholder='Paste the data obtained by visiting the above URL &#10;(DONT CHANGE ANYTHING)'
					/>
					<div
						className={styles.submit}
						onClick={ValidateResponseSubmit}
						// onClick={() => {}}
					>
						Submit
					</div>
				</section>
				<p className={styles.note}>
					NOTE: Instagram login is mandatory in this
					browser & you should've followed the account
					you want the data of.
				</p>
				<div
					id='responseData'
					className={styles.responseData}
				>
					<div className={styles.mainMedia}>
						{isReel ? (
							<div
								className={styles.reelContainer}
							></div>
						) : (
							<div className={styles.ImageContainer}>
								<img
									src={SelectedMedia}
									alt=''
								/>
							</div>
						)}
						<div className={styles.Mediacontrol}>
							<BsArrowLeftCircleFill />
							<p>1/3</p>
							<BsArrowRightCircleFill />
						</div>
					</div>
					<div className={styles.infoContainer}>
						<div className={styles.profileWrapper}>
							<div className={styles.gradient}>
								{' '}
								<img
									src={SelectedMedia}
									alt=''
								/>
							</div>

							<p>@_.adityyaa</p>
						</div>
						<h3 className={styles.MediaInfoText}>
							Date Posted:{' '}
							<span>13th Oct, 2023 at 4:13 PM</span>
						</h3>
						<h3 className={styles.MediaInfoText}>
							Tagged Accounts: <span>@_.adityyaa</span>
						</h3>
						<div className={styles.DownloadStory}>
							<span>Download</span>
							<BsDownload />
						</div>
						<div
							className={styles.DownloadStory}
							onClick={() => {
								setSelectedMedia(
									RemoveCors(
										'https://instagram.fbom12-1.fna.fbcdn.net/v/t51.2885-19/356415119_646219880727541_4304551078755561721_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=8UhQ2YcmqK0AX945AW0&edm=AKEQFekBAAAA&ccb=7-5&oh=00_AfDU1_VauQEp8RQVf3TAX2-D0Xc4j7qUxjjaLsBVnQonWQ&oe=64C6E543&_nc_sid=29ddf3'
									)
								);
							}}
						>
							<span>Download All</span>
							<PiFileZipBold />
						</div>
					</div>
				</div>
			</div>
			{overlay && (
				<div className={styles.MoreInfoView}>
					<div className={styles.DialogWrapper}>
						<div className={styles.mainLeft}>
							{isReel ? (
								<div className={styles.VideoWrapper}>
									<video
										id='playerV'
										ref={VideoRef}
										onTimeUpdate={UpdateSeekPos}
										loop
									>
										<source
											src={videoDemo}
											type='video/mp4'
										/>
									</video>
									<div
										className={styles.videoPlay}
										ref={IconRef}
										onClick={handlePlay}
									>
										<BsFillPlayFill />
									</div>
									<div
										ref={seekbar}
										className={styles.seekbarVideo}
									></div>
								</div>
							) : (
								<div className={styles.Imgpost}></div>
							)}
						</div>
						<div className={styles.mainRight}>
							<div className={styles.buttonClose}>
								<GrClose onClick={CloseModal} />
							</div>
							<div className={styles.ProfileWrapper}>
								<div className={styles.profilePic}>
									<img
										src={ProfileURL || imgp}
										alt=''
									/>
								</div>
								<div className={styles.profilePost}>
									<h4>{Post}</h4>
									<p>Post</p>
								</div>
								<div className={styles.profileFollowers}>
									<h4>{Follower}</h4>
									<p>Followers</p>
								</div>
								<div className={styles.profileFollowing}>
									<h4>{Following}</h4>
									<p>Following</p>
								</div>
							</div>
							<div className={styles.profileContext}>
								<div className={styles.profileName}>
									{Name || 'Aditya'}
								</div>
								<div className={styles.profileDesc}>
									{ProfileBio || 'In My Element 🥂'}
								</div>
							</div>
							<div className={styles.PostActivityBox}>
								<div className={styles.Postlikes}>
									<AiOutlineHeart
										className={styles.PostLike}
									/>
									<p title='Likes'>{like || 150}</p>
								</div>
								{isReel && (
									<div className={styles.Postviews}>
										<AiOutlineEye
											className={styles.PostView}
										/>
										<p title='Views'>{view || 100}</p>
									</div>
								)}
								<div className={styles.Postcomments}>
									<FaRegComment
										className={styles.PostComment}
									/>
									<p title='Comments'>{comment || 51}</p>
								</div>
							</div>
							<div
								className={styles.PostDownloadBtn}
								onClick={DownloadMedia}
							>
								Download (High Quality)
							</div>
							<div className={styles.caption}>
								Caption :{' '}
								{Caption || 'Medley voices in my head!'}
							</div>
							<div className={styles.PostedOn}>
								Posted On :{' '}
								{UploadDate ||
									'31st December, 2022 at 11:11 PM'}
							</div>
							<div className={styles.taggedAccounts}>
								Tagged Acounts :{' '}
								{tagged || 'No Tagged Accounts'}
							</div>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</>
	);
};

export default PrivateMedia;
