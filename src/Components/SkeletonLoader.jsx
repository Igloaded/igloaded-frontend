import React from 'react';
import styles from './Styles/Loaderstyles.module.scss';

const SkeletonLoader = () => {
	return (
		<div className={styles.contentDiv}>
			<div className={styles.postWrapper}>
				<div className={styles.videoCover} />
			</div>
			<div className={styles.postInfo}>
				<div className={styles.profileInfo}>
					<div className={styles.accountInfo}>
						<div className={styles.profilePic} />
						<div className={styles.name}>
							<div className={styles.nameLabel} />
							<div className={styles.usernameLabel} />
						</div>
					</div>
					<div className={styles.captionInfo}></div>
					<div className={styles.captionInfo}></div>
					<div className={styles.captionInfo}></div>
					<div className={styles.captionInfo}></div>
					<div className={styles.postMetadata}>
						<div className={styles.chunkWrapper}></div>
						<div className={styles.chunkWrapper}></div>
						<div className={styles.chunkWrapper}></div>
						<div className={styles.chunkWrapper}></div>
					</div>
					<div className={styles.btnWrapper}>
						<div className={styles.download}></div>
						<div className={styles.download}></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
