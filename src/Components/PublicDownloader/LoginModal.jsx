import React from 'react';
import styles from './Styles/Login.module.scss';
import LoginImg from '../../assets/staticAssets/login_LoginModal.png';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ close, data }) => {
	const navigate = useNavigate();
	const { title, description } = data;
	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<div className={styles.left}>
					<img
						src={LoginImg}
						alt=''
					/>
					<div
						className={styles.closeBtn}
						onClick={() => close()}
					>
						<IoMdCloseCircleOutline />
					</div>
				</div>
				<div className={styles.right}>
					<div
						className={styles.closeBtn}
						onClick={() => close()}
					>
						<IoMdCloseCircleOutline />
					</div>
					<h2 className={styles.heading}>{title}</h2>
					<p className={styles.subHeading}>
						{description}
					</p>

					<div
						className={styles.loginBtn}
						onClick={() => {
							navigate('/login');
						}}
					>
						Continue Login
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
