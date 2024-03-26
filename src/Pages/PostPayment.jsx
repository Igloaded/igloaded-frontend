import React, {
	useEffect,
	useState,
} from 'react';
import styles from '../Styles/PostPayment.module.scss';
import { useParams } from 'react-router-dom';
import thankyou from '../assets/staticAssets/thankyou.png';
import oops from '../assets/staticAssets/oops1.png';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { IoMailOutline } from 'react-icons/io5';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { RxCrossCircled } from 'react-icons/rx';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { GoHome } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import {
	epochToDateLocale,
	formatNumber,
} from '../Reusable.js';
import Cookies from 'js-cookie';
import logo from '../assets/logo_igl.png';
import Transition from '../Transitions';

const PostPayment = () => {
	const navigate = useNavigate();
	const { orderId } = useParams();

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

	const [planData, setPlanData] = useState({
		status: 'success',
		reason: 'Payment declined by bank',
		orderId: '1234',
		planName: 'Professional - Monthly',
		duration: '30 Days',
		planExpiry: 23233332323,
		amount: 2343,
	});

	let creditData = {
		purchaseType: 'credits',
		orderId: '1234',
		planName: 'Credits recharge',
		creditQuantity: 1000,
		amount: 2343,
	};

	useEffect(() => {
		if (
			orderId !== undefined &&
			orderId === Cookies.get('orderId')
		) {
			const orderDetails = JSON.parse(
				localStorage.getItem('orderDetails')
			);
			setPlanData(orderDetails);
		} else {
			navigate('/error');
		}
	}, []);

	const handleRedirect = (url) => {
		navigate(url);
	};
	return (
		<div className={styles.main}>
			<div className={styles.upperWrapper}>
				<img
					src={logo}
					alt=''
				/>
			</div>
			{planData.status === 'failed' ? (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<img src={oops} />
						<div className={styles.headingWrapper}>
							<h3>Payment Failed!</h3>
							<RxCrossCircled
								className={styles.failIcon}
							/>
						</div>
					</div>
					<div className={styles.line}></div>
					<div className={styles.infoWrapper}>
						<div className={styles.left}>
							<p>Your Summary</p>
							<div className={styles.infoCard}>
								<LiaFileInvoiceSolid />
								<div className={styles.itemWrapper}>
									<h3>Order Id</h3>
									<p>{planData.orderId}</p>
								</div>
								<div className={styles.itemWrapper}>
									<h3>Declined Reason</h3>
									<p>{planData.reason}</p>
								</div>
								<div className={styles.itemWrapper}>
									<h3>Purchase Type</h3>
									<p>{planData.planName}</p>
								</div>
								<div className={styles.itemWrapper}>
									<h3>Amount</h3>
									<p>
										₹{formatNumber(planData.amount)} /-
									</p>
								</div>
							</div>
						</div>
						<div className={styles.right}>
							<p>What's next?</p>
							<div className={styles.infoCard}>
								<div className={styles.itemWrapper}>
									<IoMailOutline />
									<h3>Don't Worry</h3>
									<p>
										If payment was deducted from your bank
										account, it will be refunded within 2-3
										working days. Please reach out to us at{' '}
										<a href='mailto:support@igloaded.com'>
											support@igloaded.com
										</a>{' '}
										for any queries.
									</p>
								</div>
								<div
									className={styles.startUsing}
									onClick={() =>
										handleRedirect('/public/download')
									}
								>
									<h3>Start Using IGLoaded</h3>
									<MdSend />
								</div>
								<div
									className={styles.startUsing}
									onClick={() => handleRedirect('/')}
								>
									<h3>Back to Home</h3>
									<GoHome />
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className={styles.card}>
					<div className={styles.confetti} />
					<div className={styles.cardHeader}>
						<img src={thankyou} />
						<div className={styles.headingWrapper}>
							<h3>Payment Successful!</h3>
							<IoMdCheckmarkCircle />
						</div>
					</div>
					<div className={styles.line}></div>
					<div className={styles.infoWrapper}>
						<div className={styles.left}>
							<p>Your Summary</p>
							<div className={styles.infoCard}>
								<LiaFileInvoiceSolid />
								<div className={styles.itemWrapper}>
									<h3>Order Id</h3>
									<p>{planData.orderId}</p>
								</div>
								<div className={styles.itemWrapper}>
									<h3>Purchase Type</h3>
									<p>{planData.planName}</p>
								</div>
								<div className={styles.itemWrapper}>
									{planData.creditQuantity !==
									undefined ? (
										<>
											<h3>Credits</h3>
											<p>{planData.creditQuantity}</p>
										</>
									) : (
										<>
											<h3>Plan Expiry</h3>
											<p>
												{epochToDateLocale(
													planData.planExpiry,
													'ms'
												)}
											</p>
										</>
									)}
								</div>
								<div className={styles.itemWrapper}>
									<h3>Amount</h3>
									<p>
										₹{formatNumber(planData.amount)} /-
									</p>
								</div>
							</div>
						</div>
						<div className={styles.right}>
							<p>What's next?</p>
							<div className={styles.infoCard}>
								<div className={styles.itemWrapper}>
									<IoMailOutline />
									<h3>Email Sent</h3>
									<p>
										An automated email of the transaction
										will be sent to your registered email
										address along with e-receipt.
									</p>
								</div>
								<div
									className={styles.startUsing}
									onClick={() =>
										handleRedirect('/public/download')
									}
								>
									<h3>Start Using IGLoaded</h3>
									<IoMdCheckmarkCircleOutline />
								</div>
								<div
									className={styles.startUsing}
									onClick={() => handleRedirect('/')}
								>
									<h3>Back to Home</h3>
									<GoHome />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Transition(PostPayment);
