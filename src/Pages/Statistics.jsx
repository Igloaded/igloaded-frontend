import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Statistics.module.scss';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { MdArrowRightAlt } from 'react-icons/md';
import { SiMicrosoftexcel } from 'react-icons/si';
import { MdOutlineAdsClick } from 'react-icons/md';
import { RiOpenArmLine } from 'react-icons/ri';
import { GoNorthStar } from 'react-icons/go';
import { MdOutlineFilePresent } from 'react-icons/md';
import { FaFileCircleCheck } from 'react-icons/fa6';
import { HiTrash } from 'react-icons/hi';
import { BiSolidMessageAltError } from 'react-icons/bi';
import { MdCheckCircle } from 'react-icons/md';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import step1 from '../assets/staticAssets/step1.png';
import step2 from '../assets/staticAssets/step2.png';
import step3 from '../assets/staticAssets/step3.png';
import Cookies from 'js-cookie';
import { vars } from '../../config';
import {
	showMsg,
	readFile,
	formatNumber,
} from '../Reusable';
import axios from 'axios';
import LoginModal from '../Components/PublicDownloader/LoginModal';
import Transition from '../Transitions';

const CardData = [
	{
		id: 1,
		title: 'Step 1',
		description:
			'Create a .txt file and add the urls of the posts you want to track line by line (Don’t Leave any additional empty lines).',
		image: step1,
	},
	{
		id: 2,
		title: 'Step 2',
		description:
			'Upload and Validate the .txt file containing the urls of the posts you want to track.',
		image: step2,
	},
	{
		id: 3,
		title: 'Step 3',
		description:
			'Click on the Start Tracking button to start the tracking process.',
		image: step3,
	},
];

const Statistics = () => {
	const fileRef = useRef(null);
	const TrackingWrapperRef = useRef(null);
	const [textFile, setTextFile] = useState(null);
	const [title, setTitle] = useState('');
	const [showloginModal, setShowLoginModal] =
		useState(false);
	const Navigate = useNavigate();
	const [showSuccess, setShowSuccess] =
		useState(false);
	const [showError, setShowError] =
		useState(false);
	const [errorMessage, setErrorMessage] =
		useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

	const [showDataLoading, setShowDataLoading] =
		useState(false);

	const [fileData, setFileData] = useState({
		name: 'nonameig>>.txt',
		lines: 1,
	});

	const scrolltoSection = () => {
		TrackingWrapperRef.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	const handleTracking = async () => {
		if (Cookies.get('token')) {
			setShowDataLoading(true);
			await getReelLimits()
				.then((res) => {
					setShowDataLoading(false);
					if (res.data.isTrackingAllowed) {
						const trackingRemaining =
							res.data.monthlyLimit -
							res.data.trackedReels;
						if (textFile) {
							if (fileData.lines <= 0) {
								showMsg(
									'No Valid Urls Found in the file!',
									'error'
								);
								return;
							}
							if (trackingRemaining <= 0) {
								showMsg(
									'You have reached your monthly limit.',
									'error'
								);
								return;
							}
							if (fileData.lines > 750) {
								showMsg(
									'You can only track 750 Posts at a time.',
									'error'
								);
								return;
							}
							if (trackingRemaining < fileData.lines) {
								showMsg(
									`You can only track ${formatNumber(trackingRemaining)} reels this month.`,
									'error'
								);
								return;
							}
							if (!title) {
								showMsg(
									'Please enter a valid title!',
									'error'
								);
								return;
							}
							const formdata = new FormData();
							formdata.append(
								'email',
								Cookies.get('email')
							);
							formdata.append('txtfile', textFile);
							formdata.append('title', title);
							const option = {
								url: `${vars.API_URL}/track/reels/trackall`,
								method: 'POST',
								headers: {
									'Content-Type': 'multipart/form-data',
									Authorization: `Bearer ${Cookies.get('token')}`,
								},
								data: formdata,
							};
							setShowDataLoading(true);
							axios(option)
								.then((res) => {
									showMsg(
										'Tracking Started Successfully',
										'success'
									);
									setShowSuccess(true);
									setShowError(false);
									setShowDataLoading(false);
								})
								.catch((err) => {
									setErrorMessage(
										err.response.data?.message ||
											'Tracking Failed!'
									);
									setShowError(true);
									setShowSuccess(false);
									setShowDataLoading(false);
									showMsg(
										'Error in starting the batch Tracking!',
										'error'
									);
								});
						} else {
							setShowDataLoading(false);
							showMsg(
								'Please select a valid .txt file',
								'error'
							);
						}
					} else {
						setShowDataLoading(false);
						showMsg(
							'Please upgrade your plan to use this feature!',
							'error'
						);
					}
				})
				.catch((err) => {
					setShowDataLoading(false);
					showMsg(
						err.message ||
							"Couldn't Fetch Tracking Limits!",
						'error'
					);
				});
		} else {
			setShowLoginModal(true);
			setShowDataLoading(false);
		}
	};

	const getReelLimits = () => {
		const option = {
			url: `${vars.API_URL}/user/getreelinfo`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				email: Cookies.get('email'),
			},
		};

		return new Promise((resolve, reject) => {
			axios(option)
				.then((res) => {
					console.log(res);
					resolve({
						status: 200,
						data: res.data.info,
					});
				})
				.catch((err) => {
					reject({
						status: 400,
						message: err.response.data.message,
					});
				});
		});
	};

	function handleFileSelect(event) {
		const file = event.target.files[0];
		if (!file) return;
		if (file && file.type !== 'text/plain') {
			event.target.value = null;
			showMsg('Please select a .txt file', 'error');
		} else {
			readFile(file)
				.then((res) => {
					setTextFile(res.data);
					setFileData({
						name: file.name,
						lines: res.totalLines.length,
					});
				})
				.catch((err) => {
					showMsg(err.message, 'error');
				});
		}
	}

	const features = [
		{
			id: 1,
			icon: <RiOpenArmLine />,
			title: 'Easy to Use',
			description:
				'Drop the .txt file containing all the urls of the posts you want to fetch the data of line by line.',
		},
		{
			id: 2,
			icon: <MdOutlineAdsClick />,
			title: 'Fetch Data In One Click',
			description:
				'Click on the Fetch Data button to get the data. The data will be displayed in a tabular format.',
		},
		{
			id: 3,
			icon: <SiMicrosoftexcel />,
			title: 'Get Data In Excel Format',
			description:
				'View the data in Spreadsheet format. You can also download the data in .xlsx format.',
		},
	];
	return (
		<>
			{showloginModal && (
				<LoginModal
					close={() => {
						setShowLoginModal(false);
					}}
					data={{
						title: 'Login to Continue',
						description:
							'Please login to continue tracking process!',
					}}
				/>
			)}
			<Header />
			<div className={styles.main}>
				<div className={styles.headingWrapper}>
					<div className={styles.left}>No #1</div>
					<div className={styles.right}>
						Automated Statistics Website
					</div>
				</div>
				<div className={styles.titleWrapper}>
					<h2 className={styles.title}>
						One stop solution for <span>Automated</span>{' '}
						<br />
						Content Data Feeding
					</h2>
					<p className={styles.subTitle}>
						Automate Data Feeding and analysis for your
						IG Pages in almost no time!
					</p>
				</div>
				<div
					className={styles.getStarted}
					onClick={scrolltoSection}
				>
					<p>Get Started</p>
					<MdArrowRightAlt />
				</div>
				<div className={styles.sectionTitle}>
					<GoNorthStar />
					<p>
						Features that won't be available anywhere
						else!
					</p>
				</div>
				<div className={styles.featuresWrapper}>
					{features.map((feature) => {
						return (
							<div
								className={styles.feature}
								key={feature.id}
							>
								<div className={styles.iconHolder}>
									{feature.icon}
								</div>
								<h4 className={styles.title}>
									{feature.title}
								</h4>
								<p className={styles.description}>
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
				{!showError && !showSuccess && (
					<div
						ref={TrackingWrapperRef}
						className={styles.trackingWrapper}
					>
						<h2>Start Automating the process now!</h2>
						<div className={styles.inputCard}>
							<input
								style={{ display: 'none' }}
								type='file'
								ref={fileRef}
								accept='.txt'
								onChange={handleFileSelect}
							/>
							<div
								className={styles.right}
								onClick={() => {
									if (fileData.name === 'nonameig>>.txt') {
										fileRef.current.click();
									}
								}}
							>
								{fileData.name == 'nonameig>>.txt' ? (
									<>
										<MdOutlineFilePresent />
										<p>Select a .txt file</p>
									</>
								) : (
									<>
										<FaFileCircleCheck />
										<p>{fileData.name}</p>
										<div
											className={styles.removeFile}
											onClick={() => {
												fileRef.current.value = '';
												setFileData({
													name: 'nonameig>>.txt',
													lines: 1,
												});
												setTextFile(null);
											}}
										>
											<p>Remove File</p>
											<HiTrash />
										</div>
									</>
								)}
							</div>
							{fileData.name !== 'nonameig>>.txt' && (
								<div className={styles.fileInfo}>
									<p>{fileData.name}</p>
									<p>
										Valid Urls:{' '}
										{formatNumber(fileData.lines)}
									</p>
								</div>
							)}
							<div className={styles.titleWrapper}>
								<p>Give it a Good Title</p>
								<input
									type='text'
									onChange={(e) =>
										setTitle(e.target.value)
									}
									value={title}
								/>
							</div>
							<div
								className={styles.submitBtn}
								onClick={handleTracking}
							>
								<p>Start Tracking</p>
								<MdArrowRightAlt />
							</div>
							{showDataLoading && (
								<div className={styles.progressWrapper}>
									<div className={styles.loader}></div>
									<p>Transmitting Data . . .</p>
								</div>
							)}
						</div>
					</div>
				)}
				{showSuccess && (
					<div className={styles.successWrapper}>
						<MdCheckCircle
							className={styles.successIcon}
						/>
						<h3>Tracking Started Successfully</h3>
						<p>
							You may close this tab, To check Progress
							Navigate to{' '}
							<span
								onClick={() => {
									Navigate('/profile');
								}}
							>
								Profile
							</span>
						</p>
						<div
							className={styles.closeBtn}
							onClick={() => {
								if (fileRef.current) {
									fileRef.current.value = '';
								}
								setFileData({
									name: 'nonameig>>.txt',
									lines: 1,
								});
								setTitle('');
								setTextFile(null);
								setShowSuccess(false);
							}}
						>
							<p>Close</p>
							<IoMdClose />
						</div>
					</div>
				)}
				{showError && (
					<div className={styles.successWrapper}>
						<BiSolidMessageAltError
							className={styles.failedIcon}
						/>
						<h3>Tracking Failed</h3>
						<p>
							There was an error in starting batch
							tracking
						</p>
						<p>
							Error Message :{' '}
							<span className={styles.bold}>
								{errorMessage}
							</span>
						</p>
						<div
							className={styles.closeBtn}
							onClick={() => {
								if (fileRef.current) {
									fileRef.current.value = '';
								}
								setFileData({
									name: 'nonameig>>.txt',
									lines: 1,
								});
								setTitle('');
								setTextFile(null);
								setShowError(false);
							}}
						>
							<p>Close</p>
							<IoMdClose />
						</div>
					</div>
				)}
				<div className={styles.usageWrapper}>
					<div className={styles.heading}>
						<h3>How To Use?</h3>
						<FaQuestionCircle />
					</div>
					<div className={styles.cardWrapper}>
						{CardData.map((card) => {
							return (
								<div
									className={styles.card}
									key={card.id}
								>
									<img
										src={card.image}
										alt=''
									/>
									<div className={styles.info}>
										<h4>{card.title}</h4>
										<p>{card.description}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.ctaSection}>
					<h2>
						Let's get started on something great!
					</h2>
					<p>Waiting for? Start using IGLoaded now!</p>
					<div
						className={styles.getStarted}
						onClick={() => {
							TrackingWrapperRef.current.scrollIntoView({
								behavior: 'smooth',
							});
						}}
					>
						<p>Get Started</p>
						<MdArrowRightAlt />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Transition(Statistics);
