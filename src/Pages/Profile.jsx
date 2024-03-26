import React, {
	useState,
	useEffect,
} from 'react';
import styles from '../Styles/Profile.module.scss';
import {
	FaRegUser,
	FaQuestion,
} from 'react-icons/fa6';
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
} from 'react-icons/ai';
import { BsListCheck } from 'react-icons/bs';
import { BiMoviePlay } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { VscDebug } from 'react-icons/vsc';
import { HiOutlineLogout } from 'react-icons/hi';
import { BsPencilSquare } from 'react-icons/bs';
import {
	IoAnalyticsSharp,
	IoCloseOutline,
} from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';

import { useNavigate } from 'react-router-dom';

import profile from '../assets/male_profile.svg';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

import Analytics from '../Components/Profile/Analytics';
import Faq from '../Components/Profile/Faq';
import Help from '../Components/Profile/Help';
import Reels from '../Components/Profile/Reels';
import UsernameModal from '../Components/Profile/UsernameModal.jsx';
import Transactions from '../Components/Profile/Transactions.jsx';

import { Popconfirm } from 'antd';
import Cookies from 'js-cookie';
import { vars } from '../../config.js';
import axios from 'axios';
import {
	epochToDate,
	epochCurrent,
	showMsg,
	formatNumber,
} from '../Reusable.js';
import Transition from '../Transitions';

const Profile = () => {
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

	const [isPageActive, setIsPageActive] = useState(
		!document.hidden
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsPageActive(!document.hidden);
		};

		document.addEventListener(
			'visibilitychange',
			handleVisibilityChange
		);

		return () => {
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
		};
	}, []);

	useEffect(() => {
		if (!Cookies.get('token')) {
			window.location.href = '/login';
		}
	}, [isPageActive]);

	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		name: '--',
		email: '--',
		planName: 'Professional',
		planSubscription: 'Annually',
		purchasedOn: '26th Oct, 2023',
		expiryOn: '26th Oct, 2024',
		profile: profile,
		plan: {
			extensionUsernames: [],
		},
	});

	const getUserData = () => {
		const options = {
			method: 'GET',
			url: `${vars.API_URL}/user/getuser`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			withCredentials: true,
		};
		axios(options)
			.then((res) => {
				if (res.data.status == 'ok') {
					setUserData({
						name: res.data.name,
						email: res.data.email,
						planName: res.data.plan.planName,
						planSubscription:
							res.data.plan.planPrice == null
								? 'Free'
								: res.data.plan.planPrice,
						purchasedOn: res.data.plan.planPurchaseDate,
						expiryOn: res.data.plan.planExpiry,
						profile: profile,
						plan: res.data.plan,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUserData();
	}, []);

	const [passwordData, setPasswordData] = useState(
		{
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		}
	);

	const [activeSection, setActiveSection] =
		useState('details');
	const [activeTab, setActiveTab] =
		useState('profile');

	const [lastprofile, setLastprofile] =
		useState(activeTab);

	const [passwordVisible, setPasswordVisible] =
		useState({
			oldPassword: false,
			newPassword: false,
			confirmNewPassword: false,
		});

	const removeCookies = () => {
		const cookies = Cookies.get();
		for (let cookie in cookies) {
			Cookies.remove(cookie);
		}
		showMsg('success', 'Logged out successfully');
		window.location.href = '/login';
	};

	const changePassword = () => {
		if (
			passwordData.oldPassword == '' ||
			passwordData.newPassword == '' ||
			passwordData.confirmNewPassword == ''
		) {
			showMsg('All fields are required', 'error');
			return;
		}
		if (
			passwordData.oldPassword ==
			passwordData.newPassword
		) {
			showMsg(
				'New password should be different from old password',
				'error'
			);
			return;
		}
		if (
			passwordData.newPassword !=
			passwordData.confirmNewPassword
		) {
			showMsg('Passwords do not match', 'error');
			return;
		}

		if (passwordData.newPassword.length < 8) {
			showMsg(
				'Password should be atleast 8 characters long',
				'error'
			);
			return;
		}

		const options = {
			method: 'PATCH',
			url: `${vars.API_URL}/user/changepassword`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				email: userData.email,
				oldpassword: passwordData.oldPassword,
				newpassword: passwordData.newPassword,
			},
			withCredentials: true,
		};
		axios(options)
			.then((res) => {
				if (res.data.status == 'ok') {
					setPasswordData({
						oldPassword: '',
						newPassword: '',
						confirmNewPassword: '',
					});
					showMsg(
						'Password changed successfully',
						'success'
					);
				} else {
					console.log(res.data);
					showMsg(res.data.message, 'error');
				}
			})
			.catch((err) => {
				console.log(err);
				showMsg(err.response.data.message, 'error');
			});
	};

	const addUsername = () => {
		if (!userData.plan.isExtensionEnabled) {
			showMsg(
				'Please enable web extension usage to add usernames',
				'error'
			);
			return;
		}
		setIsUsernameModalOpen(true);
	};

	const [
		isUsernameModalOpen,
		setIsUsernameModalOpen,
	] = useState(false);

	const removeUsername = (username) => {
		const options = {
			method: 'PATCH',
			url: `${vars.API_URL}/user/username/remove`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				email: userData.email,
				username: username,
			},
			withCredentials: true,
		};
		axios(options)
			.then((res) => {
				if (res.data.status == 'ok') {
					showMsg(
						'Username removed successfully',
						'success'
					);
					getUserData();
				} else {
					showMsg(res.data.message, 'error');
				}
			})
			.catch((err) => {
				showMsg(
					err.response.data.message ||
						'Something went wrong',
					'error'
				);
			});
	};

	const [confirmLoading, setConfirmLoading] =
		useState(false);

	const handleCancel = () => {
		setOpenUsername(null);
	};

	const [openUsername, setOpenUsername] =
		useState(null);

	const showPopup = (username) => {
		setOpenUsername(username);
	};

	return (
		<>
			{isUsernameModalOpen && (
				<UsernameModal
					isOpen={isUsernameModalOpen}
					onClose={() => setIsUsernameModalOpen(false)}
					refreshData={getUserData}
				/>
			)}
			<Header />
			<div className={styles.mobileMenu}>
				<div
					className={
						activeTab != 'profile'
							? `${styles.menuItem}`
							: `${styles.menuItem} ${styles.menuItemActive}`
					}
					onClick={() => {
						setActiveTab('profile');
						setActiveSection('details');
						setLastprofile('profile');
					}}
				>
					<FaRegUser />
					<p>My Profile</p>
				</div>
				<div
					className={
						activeTab != 'transactions'
							? `${styles.menuItem}`
							: `${styles.menuItem} ${styles.menuItemActive}`
					}
					onClick={() => {
						setActiveTab('transactions');
						setLastprofile('transactions');
					}}
				>
					<BsListCheck />
					<p>Transactions</p>
				</div>
				<div
					className={
						activeTab != 'tracked reels'
							? `${styles.menuItem}`
							: `${styles.menuItem} ${styles.menuItemActive}`
					}
					onClick={() => {
						setActiveTab('tracked reels');
						setLastprofile('tracked reels');
					}}
				>
					<BiMoviePlay />
					<p>Tracked Reels</p>
				</div>
				<div
					className={
						activeTab != 'usage analytics'
							? `${styles.menuItem}`
							: `${styles.menuItem} ${styles.menuItemActive}`
					}
					onClick={() => {
						setActiveTab('usage analytics');
						setLastprofile('usage analytics');
					}}
				>
					<IoAnalyticsSharp />
					<p>Usage Analytics</p>
				</div>
				<div
					className={
						activeTab != 'faq'
							? `${styles.menuItem}`
							: `${styles.menuItem} ${styles.menuItemActive}`
					}
					onClick={() => {
						setActiveTab('faq');
						setLastprofile('faq');
					}}
				>
					<FaQuestion />
					<p>FAQ</p>
				</div>
				<div
					className={
						activeTab != 'help'
							? `${styles.menuItem}`
							: `${styles.menuItem} ${styles.menuItemActive}`
					}
					onClick={() => {
						setActiveTab('help');
						setLastprofile('help');
					}}
				>
					<VscDebug />
					<p>Help</p>
				</div>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.left}>
					<p>Menu</p>
					<div className={styles.listWrapper}>
						<div
							className={
								activeTab != 'profile'
									? `${styles.listItem}`
									: `${styles.listItem} ${styles.listActive}`
							}
							onClick={() => {
								setActiveTab('profile');
								setActiveSection('details');
								setLastprofile('profile');
							}}
						>
							<FaRegUser />
							<p>Profile</p>
						</div>
						<div
							className={
								activeTab != 'transactions'
									? `${styles.listItem}`
									: `${styles.listItem} ${styles.listActive}`
							}
							onClick={() => {
								setActiveTab('transactions');
								setLastprofile('transactions');
							}}
						>
							<BsListCheck />
							<p>Transactions</p>
						</div>
						<div
							className={
								activeTab != 'tracked reels'
									? `${styles.listItem}`
									: `${styles.listItem} ${styles.listActive}`
							}
							onClick={() => {
								setActiveTab('tracked reels');
								setLastprofile('tracked reels');
							}}
						>
							<BiMoviePlay />
							<p>Tracked Reels</p>
						</div>
						<div
							className={
								activeTab != 'usage analytics'
									? `${styles.listItem}`
									: `${styles.listItem} ${styles.listActive}`
							}
							onClick={() => {
								setActiveTab('usage analytics');
								setLastprofile('usage analytics');
							}}
						>
							<IoAnalyticsSharp />
							<p>Usage Analytics</p>
						</div>
					</div>
					<p>General</p>
					<div className={styles.listWrapper}>
						<div
							className={
								activeTab != 'faq'
									? `${styles.listItem}`
									: `${styles.listItem} ${styles.listActive}`
							}
							onClick={() => {
								setActiveTab('faq');
								setLastprofile('faq');
							}}
						>
							<FaQuestion />
							<p>FAQ</p>
						</div>
						<div
							className={
								activeTab != 'help'
									? `${styles.listItem}`
									: `${styles.listItem} ${styles.listActive}`
							}
							onClick={() => {
								setActiveTab('help');
								setLastprofile('help');
							}}
						>
							<VscDebug />
							<p>Help</p>
						</div>
						<div
							className={
								activeTab != 'log out'
									? `${styles.listItem}`
									: `${styles.listItem} ${styles.listActive}`
							}
							onClick={() => setActiveTab('log out')}
						>
							<HiOutlineLogout />
							<p>Log out</p>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					{activeTab == 'profile' && (
						<div className={styles.profileWrapper}>
							<div className={styles.upperBar}>
								<p
									onClick={() => {
										setActiveSection('details');
									}}
									className={
										activeSection != 'details'
											? `${styles.title}`
											: `${styles.title} ${styles.titleActive}`
									}
								>
									Details
								</p>
								<p
									className={
										activeSection != 'password'
											? `${styles.title}`
											: `${styles.title} ${styles.titleActive}`
									}
									onClick={() => {
										setActiveSection('password');
									}}
								>
									Password & Security
								</p>
								<p
									className={
										activeSection != 'web extension'
											? `${styles.title}`
											: `${styles.title} ${styles.titleActive}`
									}
									onClick={() => {
										setActiveSection('web extension');
									}}
								>
									Web Extension
								</p>
							</div>
							{activeSection == 'details' && (
								<div className={styles.userDataWrapper}>
									<div className={styles.imageWrapper}>
										<img
											src={profile}
											alt='profile'
										/>
									</div>
									<div className={styles.dataWrapper}>
										<div className={styles.infoWrapper}>
											<p>Info</p>
											<div className={styles.infoItem}>
												<p>Name</p>
												<p>{userData.name}</p>
											</div>
											<div className={styles.infoItem}>
												<p>Email</p>
												<p>{userData.email}</p>
											</div>
										</div>
										<div className={styles.planWrapper}>
											<p>Plan Details</p>
											<div className={styles.planItem}>
												<p>Plan Name</p>
												<span>{userData.planName}</span>
											</div>
											{userData.planName.toLowerCase() !=
												'free' && (
												<>
													<div className={styles.planItem}>
														<p>Plan subscription</p>
														<p>
															{`₹ ${formatNumber(
																userData.planSubscription
															)}`}
														</p>
													</div>
													<div className={styles.planItem}>
														<p>Purchased On</p>
														<p>
															{epochToDate(
																userData.purchasedOn,
																'ms'
															)}
														</p>
													</div>
													<div className={styles.planItem}>
														<p>Expiry On</p>
														<p>
															{epochToDate(
																userData.expiryOn,
																'ms'
															)}
														</p>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							)}

							{activeSection == 'password' && (
								<div
									className={styles.passwordChangeWrapper}
								>
									<h2>Change Password</h2>
									<div className={styles.passwordWrapper}>
										<input
											type={
												passwordVisible.oldPassword
													? 'text'
													: 'password'
											}
											placeholder='Old Password'
											onChange={(data) => {
												setPasswordData({
													...passwordData,
													oldPassword: data.target.value,
												});
											}}
											value={passwordData.oldPassword}
										/>
										{passwordVisible.oldPassword ? (
											<AiOutlineEye
												onClick={() =>
													setPasswordVisible({
														...passwordVisible,
														oldPassword: false,
													})
												}
											/>
										) : (
											<AiOutlineEyeInvisible
												onClick={() =>
													setPasswordVisible({
														...passwordVisible,
														oldPassword: true,
													})
												}
											/>
										)}
									</div>
									<div className={styles.passwordWrapper}>
										<input
											type={
												passwordVisible.newPassword
													? 'text'
													: 'password'
											}
											placeholder='New Password'
											onChange={(data) => {
												setPasswordData({
													...passwordData,
													newPassword: data.target.value,
												});
											}}
											value={passwordData.newPassword}
										/>
										{passwordVisible.newPassword ? (
											<AiOutlineEye
												onClick={() =>
													setPasswordVisible({
														...passwordVisible,
														newPassword: false,
													})
												}
											/>
										) : (
											<AiOutlineEyeInvisible
												onClick={() =>
													setPasswordVisible({
														...passwordVisible,
														newPassword: true,
													})
												}
											/>
										)}
									</div>
									<div className={styles.passwordWrapper}>
										<input
											type={
												passwordVisible.confirmNewPassword
													? 'text'
													: 'password'
											}
											placeholder='Confirm New Password'
											onChange={(data) => {
												setPasswordData({
													...passwordData,
													confirmNewPassword:
														data.target.value,
												});
											}}
											value={passwordData.confirmNewPassword}
										/>
										{passwordVisible.confirmNewPassword ? (
											<AiOutlineEye
												onClick={() =>
													setPasswordVisible({
														...passwordVisible,
														confirmNewPassword: false,
													})
												}
											/>
										) : (
											<AiOutlineEyeInvisible
												onClick={() =>
													setPasswordVisible({
														...passwordVisible,
														confirmNewPassword: true,
													})
												}
											/>
										)}
									</div>
									<div
										className={styles.submitbtn}
										onClick={changePassword}
									>
										Change Password
									</div>
									<p
										className={styles.forgetpassLabel}
										onClick={() =>
											navigate('/forgetpassword')
										}
									>
										Forget Password?
									</p>
								</div>
							)}
							{activeSection == 'web extension' && (
								<div
									className={styles.webExtensionWrapper}
								>
									<div className={styles.dataItem}>
										<p className={styles.dataTitle}>
											Web Extension Usage :
										</p>
										<span
											className={
												userData.plan.isExtensionEnabled
													? `${styles.enabledWrapper}`
													: `${styles.disabledWrapper}`
											}
										>
											{userData.plan.isExtensionEnabled
												? 'Enabled'
												: 'Disabled'}
										</span>
									</div>
									<div className={styles.dataItem}>
										<div className={styles.titleWrapper}>
											<p className={styles.dataTitle}>
												Active Usernames :
											</p>
											<div
												className={styles.iconBackground}
												onClick={addUsername}
											>
												<p>Add username</p>
												<BsPencilSquare />
											</div>
										</div>

										{userData.plan.extensionUsernames
											.length == 0 && (
											<div className={styles.emptyUsernames}>
												<span>No usernames added</span>
											</div>
										)}
										<div
											className={styles.usernamesWrapper}
										>
											{userData.plan.extensionUsernames.map(
												(username, array) => {
													return (
														<span
															className={styles.username}
															key={username}
														>
															@{username}
															{userData.plan.extensionUsernames
																.length > 1 && (
																<Popconfirm
																	title='Confirm Delete?'
																	description='Delete This Username?'
																	open={openUsername == username}
																	onConfirm={() =>
																		removeUsername(username)
																	}
																	onCancel={handleCancel}
																	okButtonProps={{
																		loading: confirmLoading,
																	}}
																>
																	<MdClose
																		className={styles.closeLabel}
																		onClick={() => {
																			showPopup(username);
																		}}
																	/>
																</Popconfirm>
															)}
														</span>
													);
												}
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					)}
					{activeTab == 'transactions' && (
						<Transactions />
					)}
					{activeTab == 'tracked reels' && <Reels />}
					{activeTab == 'usage analytics' && (
						<Analytics />
					)}
					{activeTab == 'faq' && <Faq />}
					{activeTab == 'help' && <Help />}
					{activeTab == 'log out' && (
						<div className={styles.logoutWrapper}>
							<div className={styles.mainWrapper}>
								<div
									className={styles.closeButton}
									onClick={() => {
										setActiveTab(lastprofile);
									}}
								>
									<IoCloseOutline />
								</div>
								<p>Are you sure you want to logout?</p>
								<div
									className={styles.logoutBtn}
									onClick={removeCookies}
								>
									<p>Yes</p>
									<LuLogOut />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Transition(Profile);
