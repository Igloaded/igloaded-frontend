import React, {
	useEffect,
	useState,
} from 'react';
import styles from './Styles/Userstory.module.scss';
import StoryModal from './StoryModal.jsx';
import swipeanimation from '../../assets/animations/swipe_anim.gif';
import oops from '../../assets/staticAssets/oops.png';
import { RxCross2 } from 'react-icons/rx';

import {
	MdOutlineDownloading,
	MdInfo,
} from 'react-icons/md';
import {
	Swiper,
	SwiperSlide,
} from 'swiper/react';
import {
	EffectCoverflow,
	Pagination,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const UserStory = ({ data }) => {
	const [swiper, setSwiper] = useState(null);

	const handleSlideClick = (index) => {
		if (swiper) {
			swiper.slideTo(index);
		}
	};

	const UserData = {
		username: data.username,
		full_name: data.full_name,
		is_verified: data.is_verified,
		profilePic: data.profilePic,
	};

	const storyData = data;

	const [modalOpen, setModalOpen] =
		useState(false);

	const handleModalOpen = (index) => {
		updateIndexAndStory(index);
		console.log(storyData.stories[currentIndex]);
		setModalOpen(true);
	};

	const [currentIndex, setCurrentIndex] =
		useState(0);

	const [currentStory, setCurrentStory] =
		useState(null);

	const CloseModal = () => {
		setModalOpen(false);
	};

	const updateIndexAndStory = (index) => {
		setCurrentIndex(index);
		setCurrentStory(storyData.stories[index]);
	};

	async function downloadFile(url, filename) {
		const response = await fetch(url);
		const blob = await response.blob();
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	const [showSwipeAnim, setShowSwipeAnim] =
		useState(true);

	return (
		<>
			<div className={styles.wrapper}>
				{storyData.stories.length === 0 && (
					<div className={styles.noStory}>
						<img
							src={oops}
							alt=''
						/>
						<p>No stories found</p>
						<div
							className={styles.btn}
							onClick={() => {
								window.location.reload();
							}}
						>
							Okay!
						</div>
					</div>
				)}
				<Swiper
					spaceBetween={40}
					effect={'coverflow'}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={'auto'}
					breakpoints={{
						// when window width is >= 200px
						200: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
						// when window width is >= 1024px
						1024: {
							slidesPerView: 4,
							spaceBetween: 40,
						},
					}}
					coverflowEffect={{
						rotate: 5,
						stretch: 0,
						depth: 50,
						modifier: 2,
					}}
					modules={[EffectCoverflow]}
					onSwiper={setSwiper}
					className={styles.swiperwrapper}
				>
					{storyData.stories.map((item, index) => {
						return (
							<SwiperSlide
								key={item.id}
								className={styles.card}
								onClick={() => handleSlideClick(index)}
							>
								<img
									src={item.thumbnail}
									alt=''
								/>
								<div className={styles.btnWrapper}>
									<div
										className={styles.btn}
										onClick={() =>
											downloadFile(
												item.video,
												`${item.taken_at}.mp4`
											)
										}
									>
										<MdOutlineDownloading />
									</div>
									<div
										className={styles.btn}
										onClick={() => handleModalOpen(item.id)}
										closeModal={CloseModal}
									>
										<MdInfo />
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
				{storyData.stories.length > 1 &&
					showSwipeAnim && (
						<div className={styles.swipeAnim}>
							<img
								src={swipeanimation}
								alt=''
							/>
							<p>Swipe to see more</p>
							<RxCross2
								onClick={() => {
									setShowSwipeAnim(false);
								}}
							/>
						</div>
					)}
			</div>
			{modalOpen && (
				<StoryModal
					data={currentStory}
					UserData={UserData}
					close={CloseModal}
					open={modalOpen}
				/>
			)}
		</>
	);
};

export default UserStory;
