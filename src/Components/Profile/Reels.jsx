import React, {
	useEffect,
	useState,
} from 'react';
import styles from './Styles/Reels.module.scss';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { MdOutlineTimer } from 'react-icons/md';
import { MdOutlineDownloading } from 'react-icons/md';
import axios from 'axios';
import { vars } from '../../../config.js';
import Cookies from 'js-cookie';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import { formatNumber } from '../../Reusable.js';
import space from '../../assets/staticAssets/space.png';
import { IoSearchOutline } from 'react-icons/io5';
import { showMsg } from '../../Reusable.js';
import { Popconfirm } from 'antd';
import { Select } from 'antd';

const Reels = () => {
	const [reelProps, setReelProps] = useState({
		totalReels: 0,
		nextPage: 1,
		limit: 3,
	});

	const email = Cookies.get('email');

	const [currentPage, setCurrentPage] =
		useState(1);
	const [currentOpenPage, setCurrentOpenPage] =
		useState(1);
	const [loading, setLoading] = useState(false);

	const getTotalPages = () => {
		return Math.ceil(
			reelProps.totalReels / reelProps.limit
		);
	};

	const [isReelEmpty, setIsReelEmpty] =
		useState(false);

	const [reelData, setReelData] = useState([]);

	const [searchTerm, setSearchTerm] = useState('');

	const [ErrorText, setErrorText] = useState(
		'Everything Empty Here'
	);

	const [showPagination, setShowPagination] =
		useState(true);

	useEffect(() => {
		getReelData(1);
	}, []);

	const validateReelUrl = async (URL) => {
		if (URL != '') {
			var regex =
				/(?:https?:\/\/)?(?:www.)?instagram.com\/?([a-zA-Z0-9\.\_\-]+)?\/([p]+)?([reel]+)?([tv]+)?([stories]+)?\/([a-zA-Z0-9\-\_\.]+)\/?([0-9]+)?/gm;
			const str = URL;
			let m;
			while ((m = regex.exec(str)) !== null) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				if (m[2] == 'p' && m[1] == undefined) {
					return Promise.resolve(m[6]);
				} else if (
					(m[3] == 'reel' || m[3] == 'reels') &&
					m[1] == undefined
				) {
					return Promise.resolve(m[6]);
				}
			}
			if (m == null) {
				showMsg('Please enter a valid URL', 'error');
				return Promise.reject();
			}
		} else {
			showMsg('Please enter a valid URL', 'error');
			return Promise.reject();
		}
	};

	const [showOnly, setShowOnly] = useState([
		'completed',
		'pending',
	]);

	const [selectedValue, setSelectedValue] =
		useState({
			value: 'all',
			label: 'All Batch',
		});

	const handleChange = (value) => {
		console.log(value.value);
		setSelectedValue(value);
		if (value.value == 'all') {
			setShowOnly(['completed', 'pending']);
		} else if (value.value == 'completed') {
			setShowOnly(['completed']);
		} else if (value.value == 'pending') {
			setShowOnly(['pending']);
		}
	};

	useEffect(() => {
		getReelData(1);
	}, [showOnly]);

	const removeReel = (uniqueId) => {
		setLoading(true);
		setConfirmLoading(true);
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/removereel`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				email: email,
				uniqueId: uniqueId,
			},
			withCredentials: true,
		};

		axios(options)
			.then((res) => {
				setLoading(false);
				if (res.data.status == 200) {
					setOpen(false);
					setConfirmLoading(false);
					setOpenReelId(null);
					showMsg('Post Batch Removed', 'success');
					getReelData(1);
				}
			})
			.catch((err) => {
				setOpen(false);
				setConfirmLoading(false);
				setOpenReelId(null);
				getReelData(1);
				console.log(err);
			});
	};

	const searchReel = async () => {
		if (searchTerm == '') {
			showMsg('Please enter a valid title', 'error');
			return;
		}
		setLoading(true);
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/getreels`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				page: 1,
				limit: reelProps.limit,
				email: email,
				include: searchTerm,
				showOnly: showOnly,
			},
			withCredentials: true,
		};

		axios(options)
			.then((res) => {
				setLoading(false);
				if (res.data.totalReels == 0) {
					setErrorText(`${searchTerm}`);
					setIsReelEmpty(true);
				} else {
					setShowPagination(false);
					setIsReelEmpty(false);
				}
				if (res.data.status == 'ok') {
					setReelData([...res.data.reels]);
					setReelProps({
						...reelProps,
						totalReels: res.data.totalReels,
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const getReelData = (page) => {
		setLoading(true);
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/getreels`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				page: page,
				limit: reelProps.limit,
				email: email,
				include: 1,
				showOnly: showOnly,
			},
			withCredentials: true,
		};

		axios(options)
			.then((res) => {
				setLoading(false);
				console.log(res.data);
				if (res.data.totalReels == 0) {
					setIsReelEmpty(true);
					setErrorText('Everything Empty Here');
				} else {
					setShowPagination(true);
					setIsReelEmpty(false);
				}
				if (res.data.status == 'ok') {
					setReelData([...res.data.reels]);
					setReelProps({
						...reelProps,
						totalReels: res.data.totalReels,
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] =
		useState(false);
	const showPopconfirm = () => {
		setOpen(true);
	};
	const handleCancel = () => {
		setOpenReelId(null);
	};

	const [openReelId, setOpenReelId] =
		useState(null);

	const showPopup = (reelId) => {
		setOpenReelId(reelId);
	};

	return (
		<div className={styles.trackReelsWrapper}>
			{loading && (
				<div className={styles.loading}>
					<div class={styles.loader}></div>
					<p>Fetching Reels</p>
				</div>
			)}
			{!loading && (
				<div className={styles.upperWrapper}>
					<p>
						Tracked Post{' '}
						<span>
							({formatNumber(reelProps.totalReels)})
						</span>
					</p>
					<div className={styles.searchBarWrapper}>
						<Select
							labelInValue
							defaultValue={{
								value: 'all',
								label: 'All Batch',
							}}
							value={selectedValue}
							style={{
								width: 175,
								height: 40,
							}}
							onChange={handleChange}
							options={[
								{
									value: 'all',
									label: 'All Batch',
								},
								{
									value: 'completed',
									label: 'Completed Batch',
								},
								{
									value: 'pending',
									label: 'Pending Batch',
								},
							]}
						/>
						<div className={styles.searchBar}>
							<input
								type='text'
								placeholder='Search By Title'
								onChange={(e) => {
									setSearchTerm(e.target.value);
									if (e.target.value == '') {
										getReelData(1);
									}
								}}
							/>
							<div
								className={styles.searchBtn}
								onClick={() => {
									searchReel();
								}}
							>
								<IoSearchOutline />
							</div>
						</div>
					</div>
				</div>
			)}
			{isReelEmpty && (
				<div className={styles.emptyReel}>
					<img
						src={space}
						alt=''
					/>
					{ErrorText == 'Everything Empty Here' ? (
						<p>{ErrorText}</p>
					) : (
						<p>
							{ErrorText} <br /> <span>Not Found</span>
						</p>
					)}
				</div>
			)}
			{!isReelEmpty && !loading && (
				<>
					<div className={styles.parentReel}>
						<div className={styles.reelWrapper}>
							{reelData.map((reel) => {
								return (
									<div
										key={reel.id}
										className={styles.card}
									>
										<div className={styles.imgWrapper}>
											<Popconfirm
												title='Confirm Delete?'
												description='Delete This Batch Permanently?'
												open={openReelId === reel.id}
												onConfirm={() => removeReel(reel.id)}
												okButtonProps={{
													loading: confirmLoading,
												}}
												onCancel={handleCancel}
											>
												<IoCloseCircleSharp
													onClick={() => showPopup(reel.id)}
												/>
											</Popconfirm>

											<img
												src={reel.thumbnail}
												alt=''
											/>
										</div>
										<div className={styles.statusWrapper}>
											<div className={styles.completedBar}>
												<p>
													{reel.iterationsCompleted}/
													{reel.totalIterations}
												</p>
											</div>
											<div className={styles.indicator}>
												{reel.debugLog != 'null' ? (
													<p
														className={styles.debugLabel}
														onClick={() => {
															window.alert(reel.debugLog);
														}}
													>
														View debug log
													</p>
												) : null}
												<span
													className={
														reel.status == 'paused'
															? `${styles.pausedIndicator}`
															: reel.status == 'completed'
																? `${styles.completedIndicator}`
																: `${styles.successIndicator}`
													}
												/>
												<p>
													{reel.status == 'paused'
														? 'paused'
														: reel.status == 'completed'
															? 'Completed'
															: 'Scheduled'}
												</p>
											</div>
										</div>
										<p>
											Unique Id: <span>{reel.id}</span>
										</p>
										<p>
											Title: <span>{reel.title}</span>
										</p>
										<div
											className={styles.timestampWrapper}
										>
											<span>
												<MdOutlineTimer
													className={styles.timerOn}
												/>
												<p>{`${moment(reel.dateCreated).format('Do MMM, YYYY')}`}</p>
											</span>
										</div>
										<div className={styles.actionButtons}>
											<div
												className={styles.button}
												onClick={() => {
													window.open(reel.fileUrl, '_blank');
												}}
											>
												<p>Download Excel File</p>
												<MdOutlineDownloading />
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					{showPagination && (
						<div className={styles.paginationHolder}>
							<Pagination
								count={getTotalPages()}
								size='large'
								page={currentPage}
								siblingCount={0}
								sx={{
									'& .MuiPaginationItem-root': {
										color: 'white',
										backgroundColor: 'transparent',
										'&:hover': {
											backgroundColor: '#6762ff',
										},
									},
									'& .MuiPaginationItem-page.Mui-selected':
										{
											backgroundColor: '#6762ff',
											color: 'white',
											'&:hover': {
												backgroundColor: '#6762ff',
											},
										},
								}}
								onChange={(e, value) => {
									if (
										searchTerm == '' &&
										value != currentPage
									) {
										getReelData(value);
										setCurrentPage(value);
										setCurrentOpenPage(value);
									}
								}}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Reels;
