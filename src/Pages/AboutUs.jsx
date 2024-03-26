import React, { useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import styles from '../Styles/Privacy.module.scss';
import Transition from '../Transitions';

const Privacy = () => {
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
		<div className={styles.main}>
			<Header />
			<div className={styles.headingWrapper}>
				<h2> IGLoaded / About Us</h2>
			</div>
			<div className={styles.contentWrapper}>
				<p className={styles.headingText}>
					About Company
				</p>
				<p>
					IGLoaded is an analytical company that
					specializes in handling data in the
					real-world social media market. With our
					expertise in data analytics, we provide
					valuable insights and solutions to businesses
					looking to optimize their social media
					presence and drive growth.
				</p>
				<p className={styles.headingText}>
					Mission and Vision:
				</p>
				<p>
					Our mission is to empower businesses with
					data-driven strategies that enhance their
					social media performance and ultimately drive
					their success in the digital landscape. We
					strive to be at the forefront of innovation,
					continually adapting to the evolving social
					media trends and technologies. <br />
					<br />
					Our vision is to become a trusted partner for
					businesses seeking to harness the power of
					social media data. We aim to revolutionize
					the way companies leverage social media
					analytics, enabling them to make informed
					decisions and achieve their goals.
				</p>
				<p className={styles.headingText}>
					Core Values:
				</p>
				<p>
					<ol>
						<li>
							<b>Excellence</b>: We are committed to
							delivering exceptional results and
							exceeding client expectations. We
							continuously strive for excellence in all
							aspects of our work, from data analysis to
							client service.
						</li>
						<li>
							<b>Integrity</b>: We conduct our business
							with the utmost integrity, ensuring that
							all data and insights are handled ethically
							and responsibly. We prioritize transparency
							and honesty in our interactions with
							clients and stakeholders.
						</li>
						<li>
							<b>Innovation</b>: We embrace innovation as
							a driving force behind our success. We
							constantly explore new technologies and
							methodologies to enhance our data analytics
							capabilities and provide cutting-edge
							solutions to our clients.
						</li>
						<li>
							<b>Collaboration</b>: We believe in the
							power of collaboration and teamwork. We
							foster a collaborative environment where
							diverse perspectives are valued, and ideas
							are shared freely. By working together, we
							can achieve greater outcomes for our
							clients.
						</li>
					</ol>
				</p>
				<p className={styles.headingText}>Team</p>
				<p>
					At IGLoaded, our team consists of highly
					skilled professionals with expertise in data
					analytics, social media marketing, and
					business strategy. Each team member brings a
					unique set of skills and experiences,
					enabling us to deliver comprehensive
					solutions tailored to our clients' specific
					needs. <br />
					<br />
					Our team is committed to staying up-to-date
					with the latest industry trends and
					continuously expanding our knowledge and
					skills. We are passionate about helping
					businesses succeed in the social media market
					and are dedicated to providing exceptional
					service and support.
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default Transition(Privacy);
