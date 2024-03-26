import React, { useEffect } from 'react';
import styles from './Styles/Menu.module.scss';
import { BiMoviePlay } from 'react-icons/bi';
import { TbScanEye } from 'react-icons/tb';
import { IoMdLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBills } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { RiWallet3Line } from 'react-icons/ri';
import { LuCoins } from 'react-icons/lu';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { SiAlwaysdata } from 'react-icons/si';
import Cookies from 'js-cookie';
import { showMsg } from '../Reusable.js';

const Menu = ({ isMenuOpen, data }) => {
	const navigate = useNavigate();

	const formatNumber = (num) => {
		const Number = parseInt(num);
		return Number.toLocaleString('en-IN');
	};

	const removeCookies = () => {
		const cookies = Cookies.get();
		for (let cookie in cookies) {
			Cookies.remove(cookie);
		}
		showMsg('Logged out successfully', 'success');
		window.location.reload();
		navigate('/');
	};

	return (
		<div
			className={`${styles.appMenu} ${
				isMenuOpen ? styles.menuOpen : ''
			}`}
		>
			<div className={styles.menuItem}>
				{data.status ? (
					<div className={styles.nameWrapper}>
						<FiUser />
						<p>Hello, {data.name}</p>
					</div>
				) : (
					<div
						className={styles.nameWrapper}
						onClick={() => navigate('/login')}
					>
						<FiUser />
						<p>Login / Register</p>
					</div>
				)}
				{data.status && (
					<div className={styles.accountInfoWrapper}>
						<div
							className={styles.accountInfo}
							onClick={() => navigate('/profile')}
						>
							<MdOutlineDashboard />
							<p>My Dashboard</p>
						</div>
						<div className={styles.accountInfo}>
							<LuCoins />
							<p>
								Credits : {formatNumber(data.credits)}
							</p>
						</div>
						<div className={styles.accountInfo}>
							<FaMoneyBills />
							<p>Plan : {data.planName}</p>
						</div>
						<div
							className={styles.accountInfo}
							onClick={() => navigate('/recharge')}
						>
							<RiWallet3Line />
							<p>Purchase Credits</p>
						</div>
					</div>
				)}

				<div className={styles.spacer}></div>
				<div className={styles.linkWrapper}>
					<div
						className={styles.link}
						onClick={() => navigate('/public/download')}
					>
						<BiMoviePlay />
						<p>Public Downloader</p>
					</div>
					<div
						className={styles.link}
						onClick={() => navigate('/statistics')}
					>
						<SiAlwaysdata />
						<p>Post Tracking</p>
					</div>
					<div
						className={styles.link}
						onClick={() => navigate('/check-requests')}
					>
						<TbScanEye />
						<p>Check Requests</p>
					</div>
					<div
						className={styles.link}
						onClick={() => navigate('/subscribe')}
					>
						<FaIndianRupeeSign />
						<p>Subscription Plans</p>
					</div>
				</div>
				{data.status && (
					<div
						className={styles.logoutWrapper}
						onClick={removeCookies}
					>
						<p>Logout</p>
						<IoMdLogOut />
					</div>
				)}
			</div>
		</div>
	);
};

export default Menu;
