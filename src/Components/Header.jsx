import React, {
	useState,
	memo,
	useEffect,
} from 'react';

import styles from './Styles/Header.module.scss';
import logo from '../assets/IGLOADED_LOGO_WHITE.png';
import { FaMoneyBills } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { RiWallet3Line } from 'react-icons/ri';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { LuCoins } from 'react-icons/lu';
import { Sling as Hamburger } from 'hamburger-react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import axios from 'axios';
import { vars } from '../../config.js';
import Cookies from 'js-cookie';
import Menu from './Menu';
import { showMsg } from '../Reusable.js';

const Header = () => {
	const navigate = useNavigate();

	const logout = () => {
		removeCookies();
		navigate('/');
	};

	const [menu, setMenu] = useState(false);

	const removeCookies = () => {
		for (const cookie in Cookies.get()) {
			Cookies.remove(cookie);
		}
	};

	const getUserData = () => {
		if (!Cookies.get('token')) {
			return;
		}
		const email = Cookies.get('email');
		const options = {
			method: 'GET',
			url: `${vars.API_URL}/user/getplan?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get(
					'token'
				)}`,
			},
			withCredentials: true,
		};

		axios(options)
			.then((res) => {
				setUserData({
					status: true,
					name: res.data.data.name,
					greeting: `Hello, ${res.data.data.name}`,
					email: res.data.data.email,
					credits: res.data.data.credits,
					planName: res.data.data.plan.planName,
				});
			})
			.catch((error) => {
				console.log(error);
				if (
					error.response.data.error ==
					'User is blocked'
				) {
					logout();
					showMsg(
						'Your account has been blocked',
						'error'
					);
				} else if (
					error.response.data.error ==
					'The token has expired'
				) {
					logout();
					showMsg(
						'Your session has been expired',
						'error'
					);
				}
			});
	};

	useEffect(() => {
		getUserData();
	}, []);

	const [userData, setUserData] = useState({
		status: false,
		name: '',
		email: '',
		credits: 0,
		planName: '',
		greeting: 'Hello, ---',
	});

	const formatNumber = (num) => {
		return num.toLocaleString('en-IN');
	};
	const items = [
		{
			key: '0',
			label: (
				<div className={styles.wrapperItem}>
					<LuCoins />
					<p>
						Credits:{' '}
						<span>
							{formatNumber(userData.credits)}
						</span>
					</p>
				</div>
			),
		},
		{
			key: '1',
			label: (
				<div onClick={() => navigate('/subscribe')}>
					<FaMoneyBills />
					<p>
						Plan: <span>{userData.planName}</span>
					</p>
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div onClick={() => navigate('/profile')}>
					<FiUser />
					<p>Profile</p>
				</div>
			),
		},
		{
			key: '3',
			label: (
				<div onClick={() => navigate('/recharge')}>
					<RiWallet3Line />
					<p>Recharge</p>
				</div>
			),
		},
		{
			key: '4',
			label: (
				<div onClick={() => logout()}>
					<RiLogoutCircleRLine />
					<p>Logout</p>
				</div>
			),
		},
	];

	const servicesItem = [
		{
			key: '1',
			label: (
				<p
					onClick={() => navigate('/check-requests')}
				>
					Check Pending Requests
				</p>
			),
		},
		{
			key: '2',
			label: (
				<p
					onClick={() => navigate('/public/download')}
				>
					Public Downloader
				</p>
			),
		},
		{
			key: '3',
			label: (
				<p onClick={() => navigate('/statistics')}>
					Post Tracking
					<span>(New)</span>
				</p>
			),
		},
		{
			key: '4',
			label: (
				<p onClick={() => navigate('/recharge')}>
					Recharge Credits
				</p>
			),
		},
	];

	const getUser = () => {
		if (Cookies.get('token')) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className={styles.Wrapper}>
			<Menu
				isMenuOpen={menu}
				data={userData}
			/>
			<div className={styles.logo}>
				<img
					src={logo}
					onClick={() => {
						navigate('/');
					}}
					alt='logo'
					onContextMenu={(e) => e.preventDefault()}
					onDragStart={(e) => {
						e.preventDefault();
					}}
				/>
			</div>
			<div className={styles.rightMenu}>
				<Hamburger
					color='#fff'
					size={23}
					toggled={menu}
					toggle={setMenu}
				/>
			</div>
			<div className={styles.navContents}>
				<p onClick={() => navigate('/')}>Home</p>
				<div className={styles.serviceWrapper}>
					<Dropdown
						overlayClassName={styles.menuChilds}
						menu={{
							items: servicesItem,
						}}
						placement='bottom'
						arrow={{
							pointAtCenter: true,
						}}
					>
						<p>Services</p>
					</Dropdown>
				</div>
				<p onClick={() => navigate('/subscribe')}>
					Pricing
				</p>
				<div className={styles.account}>
					{!getUser() ? (
						<div
							className={styles.userContent}
							onClick={() => navigate('/login')}
						>
							<FiUser />
							<p>Login / Register</p>
						</div>
					) : (
						<Dropdown
							overlayClassName={styles.profileChilds}
							menu={{
								items,
							}}
							placement='bottom'
							arrow={{
								pointAtCenter: true,
							}}
						>
							<div className={styles.userContent}>
								<FiUser />
								<p>{userData.greeting}</p>
							</div>
						</Dropdown>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Header);
