import React, { useEffect, useRef } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import styles from '../Styles/Home.module.scss';
import usersearch from '../assets/Ig/usersearch.png';
import storysearch from '../assets/Ig/storyicon.png';
import postsearch from '../assets/Ig/reelimg.png';
import mock5 from '../assets/Ig/mock_5.png';
import mock4 from '../assets/Ig/mock_4.png';
import mock3 from '../assets/Ig/mock_3.png';
import mock2 from '../assets/Ig/mock_2.png';
import mock1 from '../assets/animations/HeroHome.gif';
import service from '../assets/animations/searchHome.gif';
import { FiChrome } from 'react-icons/fi';

const Home = () => {
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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className={styles.wrapper}>
				<Header />
				<div className={styles.background}></div>
				<div className={styles.main}>
					<div className={styles.hero}>
						<div className={styles.left}>
							<h1>
								The All in One <span>Analytics</span> tool
								you'll ever <span>need</span> for IG!
							</h1>
							<p>
								Search Profiles, Check Requests and much
								more . .
							</p>
							<div
								className={styles.submitbtn}
								onClick={() => {
									window.location.href =
										'/public/download';
								}}
							>
								Get Started
							</div>
						</div>
						<div className={styles.right}>
							<img
								src={mock1}
								alt=''
							/>
						</div>
					</div>
					<div className={styles.servicesWrapper}>
						<div className={styles.background}></div>
						<div className={styles.left}>
							<img
								src={service}
								alt=''
							/>
							<h2>Services</h2>
							<p>
								Most promising service you'll ever get
							</p>
						</div>
						<div className={styles.right}>
							<div className={styles.serviceWrapper}>
								<div className={styles.service}>
									<img
										src={usersearch}
										alt=''
									/>
									<h3>Search Profile</h3>
									<p>
										Search any profile on Instagram with
										just their username!
									</p>
								</div>
								<div className={styles.service}>
									<img
										src={postsearch}
										alt=''
									/>
									<h3>Search Post</h3>
									<p>
										Search any post on Instagram with just
										post url!
									</p>
								</div>
							</div>
							<div className={styles.serviceWrapper}>
								<div className={styles.service}>
									<img
										src={storysearch}
										alt=''
									/>
									<h3>View Story</h3>
									<p>
										View any profile's story which is
										publicly available!
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.section3}>
						<div className={styles.background}></div>
						<div className={styles.left}>
							<div className={styles.card}>
								<FiChrome />
								<p className={styles.title}>
									Introducing <span>PowerFetcher</span>
								</p>
								<h3>Web Extension</h3>
								<p>
									Get your insights right away from the
									top-corner in your browser
								</p>
								<p>
									With IGLoaded's Powerful Chrome
									Extension, Get your account info in no
									time!
								</p>
								<p>
									*Supports only chromium based browser
								</p>
							</div>
						</div>
						<div className={styles.right}>
							<img
								src={mock3}
								alt=''
							/>
						</div>
					</div>
					<div className={styles.sectionImgRight}>
						<div className={styles.background}></div>
						<div className={styles.left}>
							<div className={styles.card}>
								<img
									src={postsearch}
									alt=''
								/>
								<h3>Search Post</h3>
								<p>Get insights of post just using URL</p>
								<p>
									Get Post Info such as Post Likes, Views,
									Plays, Comments, Date Posted, etc.
								</p>
							</div>
						</div>
						<div className={styles.right}>
							<img
								src={mock2}
								alt=''
							/>
						</div>
					</div>
					<div className={styles.sectionImgLeft}>
						<div className={styles.background}></div>
						<div className={styles.left}>
							<div className={styles.card}>
								<img
									src={postsearch}
									alt=''
								/>
								<h3>Search Profiles</h3>
								<p>
									Get insights of a profile right away
									using IGLoaded
								</p>
								<p>
									Get Profile Info such as Post count,
									Follower count, Following count,
									Biography, etc.
								</p>
							</div>
						</div>
						<div className={styles.right}>
							<img
								src={mock5}
								alt=''
							/>
						</div>
					</div>
					<div className={styles.sectionImgRight}>
						<div className={styles.background}></div>
						<div className={styles.left}>
							<div className={styles.card}>
								<img
									src={postsearch}
									alt=''
								/>
								<h3>Search Stories</h3>
								<p>
									Get All the stroies of a public account
									just by putting their username!
								</p>
								<p>
									Download the stories or view them once!
								</p>
							</div>
						</div>
						<div className={styles.right}>
							<img
								src={mock4}
								alt=''
							/>
						</div>
					</div>
					<div className={styles.ctaSection}>
						<div className={styles.card}>
							<h2>Get Started</h2>
							<p>
								The One and Only Analytics tool you'll
								ever need for Instagram!
							</p>
							<div className={styles.BtnWrapper}>
								<div
									className={styles.submitbtn}
									onClick={() => {
										window.location.href =
											'/public/download';
									}}
								>
									Get Started
								</div>
								<div
									className={styles.submitbtn}
									onClick={() => {
										window.location.href = '/subscribe';
									}}
								>
									View Pricing
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Home;
