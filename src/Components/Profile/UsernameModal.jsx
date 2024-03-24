import React, { useState } from 'react';
import styles from './Styles/UsernameModal.module.scss';
import { IoMdClose } from 'react-icons/io';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import axios from 'axios';
import { vars } from '../../../config.js';
import Cookies from 'js-cookie';
import { showMsg } from '../../Reusable.js';

function CustomModal({
	isOpen,
	onClose,
	refreshData,
}) {
	const handleCloseModal = () => {
		onClose();
	};

	const [username, setUsername] = useState('');

	const addUsername = () => {
		if (
			username.length < 3 ||
			username.length > 20 ||
			username.includes('@') ||
			username.includes(' ') ||
			username.length == 0
		) {
			showMsg(
				'Username should be between 3 to 20 characters',
				'error'
			);
			return;
		}
		const option = {
			method: 'PATCH',
			url: `${vars.API_URL}/user/username/add`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				email: Cookies.get('email'),
				username: username,
			},
			withCredentials: true,
		};

		axios(option)
			.then((res) => {
				if (res.data.status == 'ok') {
					showMsg(
						'Username added successfully',
						'success'
					);
					handleCloseModal();
					refreshData();
				}
			})
			.catch((err) => {
				showMsg(
					err.response.data.message ||
						'Something went wrong',
					'error'
				);
				handleCloseModal();
				refreshData();
			});
	};

	return (
		<>
			{isOpen && (
				<div className={styles.wrapper}>
					<div className={styles.mainContent}>
						<div
							className={styles.close}
							onClick={handleCloseModal}
						>
							<IoMdClose />
						</div>
						<h2>Add an Username</h2>
						<div className={styles.titleItem}>
							<p>Enter Username</p>
							<input
								className={styles.titleInput}
								type='text'
								placeholder='random_username'
								onChange={(e) =>
									setUsername(e.target.value)
								}
								value={username}
							/>
						</div>
						<div
							className={styles.submit}
							onClick={addUsername}
						>
							<p>Submit</p>
							<FaRegArrowAltCircleRight />
						</div>
						<p>
							<b>NOTE</b>: Entered Username will be added
							to the allowed list of usernames for your
							account.
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default CustomModal;
