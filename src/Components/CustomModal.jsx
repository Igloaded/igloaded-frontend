import React, { useState } from 'react';
import styles from '../Components/Styles/CustomModal.module.scss';
import { IoMdClose } from 'react-icons/io';
import reelsIcon from '../assets/Ig/reels-icon.svg';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

function CustomModal({
	isOpen,
	onClose,
	reelUrl,
	username,
}) {
	const [inputValue, setInputValue] = useState('');

	// const handleOpenModal = () => {
	// 	setModalOpen(true);
	// };

	const handleCloseModal = () => {
		onClose();
	};

	const [trackingData, setTrackingData] = useState(
		{
			title: '',
			days: 0,
		}
	);

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
						<h2>Track Reel Data</h2>
						<div className={styles.reelData}>
							<div className={styles.reelDataLeft}>
								<img
									src={reelsIcon}
									alt='reels-icon'
								/>
							</div>
							<div className={styles.reelDataRight}>
								<p>{reelUrl}</p>
								<p>Reel by @{username}</p>
							</div>
						</div>
						<div className={styles.titleItem}>
							<p>Enter A title</p>
							<input
								className={styles.titleInput}
								type='text'
								placeholder='Something unique!'
								onChange={(e) =>
									setTrackingData({
										...trackingData,
										title: e.target.value,
									})
								}
							/>
						</div>
						<div className={styles.item}>
							<p>Track for</p>
							<input
								type='text'
								pattern='\d*'
								placeholder='0'
								maxLength={3}
								onChange={(e) =>
									setTrackingData({
										...trackingData,
										days: Number(e.target.value),
									})
								}
								onError={(e) => {
									e.target.value = '';
								}}
							/>
							<p>days</p>
						</div>
						<div className={styles.submit}>
							<p>Start Tracking</p>
							<FaRegArrowAltCircleRight />
						</div>
						<p>
							NOTE: Tracked reel can be downloaded or
							viewed in spreadsheet or (.xlxs)
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default CustomModal;
