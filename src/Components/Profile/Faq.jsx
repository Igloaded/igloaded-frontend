import React, {
	useState,
	useRef,
	useEffect,
} from 'react';
import styles from './Styles/Faq.module.scss';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';

const Faq = () => {
	const { token } = theme.useToken();
	const getGeneralItems = (panelStyle) => [
		{
			key: '1',
			label: 'What is IGLoaded?',
			children: (
				<p>
					IGLoaded is a SaaS platform that provides
					information about Instagram content and
					offers insights into user profiles using
					authentic and legitimate methods.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '2',
			label: 'How does IGLoaded help users?',
			children: (
				<p>
					IGLoaded helps users manage their Instagram
					insights and identify pain points in their
					profiles or content by providing detailed
					information and analytics.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '3',
			label:
				'What kind of information does IGLoaded provide?',
			children: (
				<p>
					IGLoaded provides profile data, post
					insights, and story insights for Instagram
					users.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '4',
			label:
				'Can IGLoaded track specific posts or reels?',
			children: (
				<p>
					Yes, IGLoaded allows users to track specific
					posts or reels by entering the URL and
					scheduling tracking for a specified period.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '5',
			label:
				'What are the subscription plans offered by IGLoaded?',
			children: (
				<p>
					IGLoaded currently offers three subscription
					plans: Free, Individual, and Professional.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '6',
			label:
				'What kind of information does IGLoaded provide?',
			children: (
				<p>
					IGLoaded provides profile data, post
					insights, and story insights for Instagram
					users.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '7',
			label: "What is IGLoaded's primary function?",
			children: (
				<p>
					IGLoaded primarily provides information and
					insights about Instagram content and user
					profiles using legitimate methods.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '8',
			label: 'Can IGLoaded track Instagram stories?',
			children: (
				<p>
					No, IGLoaded doesn't offers insights and
					tracking for Instagram stories as part of its
					services.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '9',
			label:
				'How does IGLoaded ensure the authenticity of the data it provides?',
			children: (
				<p>
					IGLoaded uses authentic and legitimate
					methods to gather and provide accurate
					information about Instagram content and
					profiles.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '10',
			label:
				'Is IGLoaded available for use in all countries?',
			children: (
				<p>
					Yes, IGLoaded is accessible to users in most
					countries where Instagram is available.
				</p>
			),
			style: panelStyle,
		},
	];

	const getAccountItems = (panelStyle) => [
		{
			key: '1',
			label:
				'Can I use IGLoaded for multiple Instagram accounts?',
			children: (
				<p>
					Yes, users can use IGLoaded for multiple
					Instagram accounts by logging in with each
					account's credentials.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '2',
			label:
				'Can IGLoaded access Instagram business accounts?',
			children: (
				<p>
					Yes, IGLoaded can access and provide insights
					for Instagram business accounts as well as
					personal accounts.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '3',
			label:
				'Can I change my Instagram password after providing it to IGLoaded for request scans?',
			children: (
				<p>
					Yes, users can change their Instagram
					password at any time for security reasons,
					even after providing it to IGLoaded.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '4',
			label:
				'Can IGLoaded access private Instagram accounts?',
			children: (
				<p>
					No, IGLoaded can only access and provide
					information for public Instagram accounts.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '5',
			label:
				'Is it safe to provide my Instagram username and password to IGLoaded for request scans?',
			children: (
				<p>
					IGLoaded uses authentic and legitimate
					methods to access Instagram data, ensuring
					the safety and privacy of user accounts.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '6',
			label:
				'Can I change my Instagram password after providing it to IGLoaded for request scans?',
			children: (
				<p>
					Yes, users can change their Instagram
					password at any time for security reasons,
					even after providing it to IGLoaded.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '7',
			label: 'How does IGLoaded handle user data?',
			children: (
				<p>
					IGLoaded follows strict privacy and security
					measures to protect user data and ensures
					compliance with data protection regulations.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '8',
			label:
				'Can I change my subscription plan on IGLoaded?',
			children: (
				<p>
					Yes, users can upgrade or downgrade their
					subscription plans on IGLoaded as per their
					requirements. Previous subscription will get
					cancelled and new subscription will be
					activated.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '9',
			label:
				'Is there a limit to the number of posts I can track with IGLoaded?',
			children: (
				<p>
					The tracking limit varies based on the
					subscription plan, with higher plans allowing
					tracking of more posts or reels.
				</p>
			),
			style: panelStyle,
		},
	];
	const getPricingItems = (panelStyle) => [
		{
			key: '1',
			label:
				' What services are included in the Free plan on IGLoaded?',
			children: (
				<p>
					The Free plan includes services such as 100
					post/story/profile scans per month and the
					ability to download media.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '2',
			label: 'What are "credits" on IGLoaded?',
			children: (
				<p>
					Credits are a type of IGLoaded coin that can
					be used to purchase in-app services such as
					request scans.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '3',
			label:
				'What is the difference between the Individual and Professional plans on IGLoaded?',
			children: (
				<p>
					The Individual plan offers fewer
					post/story/profile scans and request scans
					compared to the Professional plan.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '4',
			label:
				'Can I upgrade my plan on IGLoaded at any time?',
			children: (
				<p>
					Yes, users can upgrade their plan on IGLoaded
					at any time to access more features and
					services.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '5',
			label:
				'What is the difference between the Individual and Professional plans on IGLoaded?',
			children: (
				<p>
					The Individual plan offers fewer
					post/story/profile scans and request scans
					compared to the Professional plan.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '6',
			label:
				'Are there any additional charges for using IGLoaded services?',
			children: (
				<p>
					IGLoaded's subscription plans excludes
					payment gateway charges and they are
					calculated at the time of payment.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '7',
			label: ' How are credits used on IGLoaded?',
			children: (
				<p>
					Credits on IGLoaded can be used to purchase
					in-app services such as request scans and
					other premium features.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '8',
			label:
				'Can I purchase additional credits on IGLoaded?',
			children: (
				<p>
					Yes, users can purchase additional credits on
					IGLoaded to access more in-app services
					beyond their subscription plan.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '9',
			label:
				'Are there any discounts available for long-term subscriptions on IGLoaded?',
			children: (
				<p>
					IGLoaded may offer discounts for long-term
					subscriptions or bulk purchases of credits,
					depending on promotional offers. Currently,
					We don't have one.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '10',
			label:
				'What payment methods are accepted on IGLoaded?',
			children: (
				<p>
					IGLoaded accepts various payment methods,
					including credit/debit cards, UPI and other
					secure online payment options.
				</p>
			),
			style: panelStyle,
		},
	];
	const getMyDataItems = (panelStyle) => [
		{
			key: '1',
			label:
				'How does IGLoaded handle user data privacy?',
			children: (
				<p>
					IGLoaded follows strict privacy and security
					measures to protect user data and ensures
					compliance with data protection regulations.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '2',
			label:
				'Can I download the tracking data from IGLoaded?',
			children: (
				<p>
					Yes, users can easily download the tracking
					data, including reel URL, post views, likes,
					date posted, tracking date, and username,
					from their profile.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '3',
			label: 'Is my data secure on IGLoaded?',
			children: (
				<p>
					Yes, IGLoaded ensures the security and
					confidentiality of user data through robust
					encryption and privacy measures.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '4',
			label:
				'Can I delete my tracking data from IGLoaded?',
			children: (
				<p>
					Yes, users have the option to delete their
					tracking data from IGLoaded as per their
					preferences.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '5',
			label:
				'Can I access my tracking data from multiple devices?',
			children: (
				<p>
					Yes, users can access their tracking data
					from any device with internet access by
					logging into their IGLoaded account.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '6',
			label: 'Is my data secure on IGLoaded?',
			children: (
				<p>
					Yes, IGLoaded ensures the security and
					confidentiality of user data through robust
					encryption and privacy measures.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '7',
			label:
				'Can I export my tracking data from IGLoaded to other platforms?',
			children: (
				<p>
					Technically you can download the specific
					reel data and post data and use it as per
					your requirement. But currently, we don't
					support bulk export.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '8',
			label:
				'How long is tracking data stored on IGLoaded?',
			children: (
				<p>
					IGLoaded stores tracking data for a specified
					period based on the user's tracking slot,
					after which it is automatically deleted.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '9',
			label:
				'Can I share my tracking data with other IGLoaded users?',
			children: (
				<p>
					Currently No, due to privacy and security of
					the user data. We don't support sharing of
					the data.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '10',
			label:
				'Is my tracking data visible to other Instagram users?',
			children: (
				<p>
					No, tracking data on IGLoaded is private and
					only accessible to the user who initiated the
					tracking.
				</p>
			),
			style: panelStyle,
		},
	];
	const getTermsItems = (panelStyle) => [
		{
			key: '1',
			label:
				'Can I use IGLoaded for competitive analysis of other Instagram accounts?',
			children: (
				<p>
					IGLoaded's terms of use specify the
					permissible uses of the platform's services,
					including competitive analysis guidelines.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '2',
			label:
				'Are there any restrictions on sharing data obtained from IGLoaded?',
			children: (
				<p>
					IGLoaded's terms of use outline the
					restrictions on sharing data obtained from
					the platform to ensure privacy and compliance
					with regulations.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '3',
			label:
				'What happens if I encounter technical issues while using IGLoaded?',
			children: (
				<p>
					Users can contact IGLoaded's support team for
					assistance with technical issues or any other
					platform-related queries.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '4',
			label:
				'Can IGLoaded suspend or terminate my account without notice?',
			children: (
				<p>
					IGLoaded reserves the right to suspend or
					terminate user accounts in case of violations
					of the terms of use or suspicious activities,
					as outlined in the platform's policies.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '5',
			label:
				'What are the terms of use for IGLoaded?',
			children: (
				<p>
					The terms of use for IGLoaded outline the
					conditions and guidelines for using the
					platform's services and features.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '6',
			label:
				'Are there any restrictions on using IGLoaded?',
			children: (
				<p>
					IGLoaded's terms of use specify the
					acceptable and prohibited uses of the
					platform's services and features.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '7',
			label:
				'Can I use IGLoaded for commercial purposes?',
			children: (
				<p>
					No, The use of this platform is only allowed
					for self research purpose.IGLoaded's terms of
					use define the permissible use of the
					platform for personal and commercial
					purposes.
				</p>
			),
			style: panelStyle,
		},
		{
			key: '8',
			label:
				'What happens if I violate the terms of use on IGLoaded?',
			children: (
				<p>
					Violating the terms of use on IGLoaded may
					result in account suspension or termination
					as per the platform's policies.
				</p>
			),
			style: panelStyle,
		},
	];
	const panelStyle = {
		marginBottom: 5,
		background: '#dcdcdc',
		borderRadius: token.borderRadiusLG,
		border: 'none',
		color: 'white',
	};

	const handleScroll = (content) => {
		const element =
			document.getElementById(content);
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	};

	const [activeSection, setActiveSection] =
		useState('first');
	const firstRef = useRef(null);
	const secondRef = useRef(null);
	const thirdRef = useRef(null);
	const fourthRef = useRef(null);
	const fifthRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.7 }
		);

		observer.observe(firstRef.current);
		observer.observe(secondRef.current);
		observer.observe(thirdRef.current);
		observer.observe(fourthRef.current);
		observer.observe(fifthRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<p>Categories</p>
				<p
					onClick={() => handleScroll('first')}
					style={{
						color:
							activeSection === 'first'
								? '#fdab8b'
								: 'white',
					}}
				>
					General
				</p>
				<p
					onClick={() => handleScroll('second')}
					style={{
						color:
							activeSection === 'second'
								? '#fdab8b'
								: 'white',
					}}
				>
					Account
				</p>
				<p
					onClick={() => handleScroll('third')}
					style={{
						color:
							activeSection === 'third'
								? '#fdab8b'
								: 'white',
					}}
				>
					Pricing
				</p>
				<p
					onClick={() => handleScroll('fourth')}
					style={{
						color:
							activeSection === 'fourth'
								? '#fdab8b'
								: 'white',
					}}
				>
					My Data
				</p>
				<p
					onClick={() => handleScroll('fifth')}
					style={{
						color:
							activeSection === 'fifth'
								? '#fdab8b'
								: 'white',
					}}
				>
					Terms of Use
				</p>
			</div>
			<div className={styles.right}>
				<p>Having Questions?</p>
				<p>Read these FAQs to get yours resolved</p>
				<div
					className={styles.contentWrapper}
					id='first'
					ref={firstRef}
				>
					<p className={styles.title}>1. General</p>
					<Collapse
						bordered={false}
						defaultActiveKey={['1']}
						expandIcon={({ isActive }) => (
							<CaretRightOutlined
								rotate={isActive ? 90 : 0}
							/>
						)}
						style={{}}
						items={getGeneralItems(panelStyle)}
					/>
				</div>
				<div
					className={styles.contentWrapper}
					id='second'
					ref={secondRef}
				>
					<p className={styles.title}>2. Account</p>
					<Collapse
						bordered={false}
						defaultActiveKey={['1']}
						expandIcon={({ isActive }) => (
							<CaretRightOutlined
								rotate={isActive ? 90 : 0}
							/>
						)}
						style={{}}
						items={getAccountItems(panelStyle)}
					/>
				</div>
				<div
					className={styles.contentWrapper}
					id='third'
					ref={thirdRef}
				>
					<p className={styles.title}>3. Pricing</p>
					<Collapse
						bordered={false}
						defaultActiveKey={['1']}
						expandIcon={({ isActive }) => (
							<CaretRightOutlined
								rotate={isActive ? 90 : 0}
							/>
						)}
						style={{}}
						items={getPricingItems(panelStyle)}
					/>
				</div>
				<div
					className={styles.contentWrapper}
					id='fourth'
					ref={fourthRef}
				>
					<p className={styles.title}>4. My Data</p>
					<Collapse
						bordered={false}
						defaultActiveKey={['1']}
						expandIcon={({ isActive }) => (
							<CaretRightOutlined
								rotate={isActive ? 90 : 0}
							/>
						)}
						style={{}}
						items={getMyDataItems(panelStyle)}
					/>
				</div>
				<div
					className={styles.contentWrapper}
					id='fifth'
					ref={fifthRef}
				>
					<p className={styles.title}>
						5. Terms of Use
					</p>
					<Collapse
						bordered={false}
						defaultActiveKey={['1']}
						expandIcon={({ isActive }) => (
							<CaretRightOutlined
								rotate={isActive ? 90 : 0}
							/>
						)}
						style={{}}
						items={getTermsItems(panelStyle)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Faq;
