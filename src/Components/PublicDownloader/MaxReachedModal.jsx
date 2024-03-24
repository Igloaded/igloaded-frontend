import React from 'react';
import styles from './Styles/MaxReachedModal.module.scss';
import { MdErrorOutline } from 'react-icons/md';

const MaxReachedModal = ({ data, close }) => {
	return (
		<div className={styles.main}>
			<div className={styles.modal}>
				<MdErrorOutline />
				<h3>Couldn't get Data</h3>
				<p>{data}</p>
				<button onClick={close}>Close</button>
			</div>
		</div>
	);
};

export default MaxReachedModal;
