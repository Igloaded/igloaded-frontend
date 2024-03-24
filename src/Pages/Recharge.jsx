import React, {
	useEffect,
	useState,
} from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import styles from '../Styles/Recharge.module.scss';
import { LuCoins } from 'react-icons/lu';
import { MdCancel } from 'react-icons/md';
import LoginModal from '../Components/PublicDownloader/LoginModal.jsx';
import { LuShoppingBag } from 'react-icons/lu';
import { FaCheckCircle } from 'react-icons/fa';
import {
	formatNumber,
	showMsg,
} from '../Reusable.js';
import Cookies from 'js-cookie';
import { vars } from '../../config.js';
import axios from 'axios';
const Recharge = () => {
	const [Pricing, setPricing] = useState([
		{
			id: 1,
			coins: 100,
			price: 100,
		},
		{
			id: 2,
			coins: 500,
			price: 500,
		},
		{
			id: 3,
			coins: 1000,
			price: 999,
		},
		{
			id: 4,
			coins: 3000,
			price: 2499,
		},
		{
			id: 5,
			coins: 5000,
			price: 4249,
		},
		{
			id: 6,
			coins: 10000,
			price: 8999,
		},
	]);

	const [amountData, setAmountData] = useState({
		amount: 0,
		tax: 0,
		gatewayCharges: 0,
		payableAmount: 0,
	});

	const getTaxAmount = (amount) => {
		let num = Number(amount * 0);
		return Number(Math.ceil(num));
	};

	const getGatewayCharges = (amount) => {
		let num = Number(amount * 0.03);
		return Number(Math.ceil(num));
	};

	const getPayableAmount = (amount) => {
		let finalAmt =
			amount +
			getTaxAmount(amount) +
			getGatewayCharges(amount) -
			promoCodeData.discount;
		return Number(finalAmt.toFixed(0));
	};

	const [selectedData, setSelectedData] = useState(
		{
			id: -1,
			coins: 0,
			price: 0,
			tax: 0,
			gatewayCharges: 0,
			payableAmount: 0,
		}
	);
	const [Modal, setModal] = useState(false);

	const handleSelectItem = (
		quantity,
		price,
		id
	) => {
		resetPromocode();
		setSelectedData({
			id: id,
			coins: quantity,
			price: price,
			tax: getTaxAmount(price),
			gatewayCharges: getGatewayCharges(price),
			payableAmount: getPayableAmount(price),
		});
	};

	const isLoggedIn = () => {
		if (Cookies.get('token')) {
			return true;
		} else {
			return false;
		}
	};

	const handleModal = () => {
		console.log(isLoggedIn());
		if (isLoggedIn() == true) {
			inititatePayment();
		} else {
			setModal(true);
		}
	};
	useEffect(() => {
		console.log(selectedData);
	}, [selectedData]);

	const [promoCodeData, setPromoCodeData] =
		useState({
			isApplied: false,
			code: '',
			discount: 0,
			description: '',
		});

	useEffect(() => {
		setSelectedData({
			...selectedData,
			payableAmount: getPayableAmount(
				selectedData.price
			),
		});
	}, [promoCodeData]);

	const resetPromocode = () => {
		setPromoCodeData({
			isApplied: false,
			code: '',
			discount: 0,
			description: '',
		});
	};

	const validatePayment = (
		razorpayPaymentId,
		razorpayOrderId,
		razorpaySignature
	) => {
		const ordeDetails = {
			notifyUser: true,
			email: Cookies.get('email'),
			amount: selectedData.payableAmount,
			transactionType: 'credit',
			transactionData: {
				tax: selectedData.tax,
				discount: promoCodeData.discount,
				total: selectedData.payableAmount,
				price: selectedData.price,
				credits: selectedData.coins,
				gatewayCharges: selectedData.gatewayCharges,
			},
			orderId: razorpayOrderId,
		};
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/payment/payment-verify`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				razorpayPaymentId,
				razorpayOrderId,
				razorpaySignature,
				ordeDetails: ordeDetails,
			},
			withCredentials: true,
		};

		axios(options)
			.then((response) => {
				console.log(response);
				if (response.data.status === 'ok') {
					let creditData = {
						purchaseType: 'credits',
						orderId: razorpayOrderId,
						planName: 'Credits Recharge',
						creditQuantity: selectedData.coins,
						amount: selectedData.payableAmount,
					};
					localStorage.setItem(
						'orderDetails',
						JSON.stringify(creditData)
					);
					Cookies.set('orderId', razorpayOrderId, {
						expires: 1 / 96,
					});
					showMsg('Payment Successful', 'success');
					setTimeout(() => {
						window.open(
							`/post/payment/${razorpayOrderId}`,
							'_self'
						);
					}, 2000);
				}
			})
			.catch((error) => {
				console.log(error);
				showMsg('Payment Failed', 'error');
			});
	};

	const openPaymentScreen = (amount, order_id) => {
		var options = {
			key: vars.RAZORPAY_KEY,
			amount: amount,
			currency: 'INR',
			name: 'IGLoaded',
			description: 'Credits Purchase',
			image:
				'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708870604/StaticAssests/favicon_hxet6p.png',
			order_id: order_id,
			handler: function (response) {
				console.log(response);
				validatePayment(
					response.razorpay_payment_id,
					response.razorpay_order_id,
					response.razorpay_signature
				);
			},
			prefill: {
				name: Cookies.get('name'),
				email: Cookies.get('email'),
				contact: '',
			},
			notes: {
				address: '',
			},
			theme: {
				color: '#6762ff',
			},
		};
		var rzp1 = new Razorpay(options);
		rzp1.on('payment.failed', function (response) {
			console.log(response);
			showMsg(
				'Payment Failed! Please try again',
				'error'
			);
		});
		rzp1.open();
	};

	const inititatePayment = () => {
		const promocodeData = {
			isPromocodeApplied: promoCodeData.isApplied,
			promocode: promoCodeData.code,
			discount: promoCodeData.discount,
		};
		const paymentData = {
			purchaseId: selectedData.id,
			creditsAmount: selectedData.coins,
			price: selectedData.price,
			tax: selectedData.tax,
			gatewayCharges: selectedData.gatewayCharges,
			finalAmount: selectedData.payableAmount,
			discount: promoCodeData.discount,
			purchaseType: 'credits',
		};
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/payment/initiate`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: JSON.stringify({
				email: Cookies.get('email'),
				paymentData: paymentData,
				promocodeData: promocodeData,
			}),
			withCredentials: true,
		};

		axios(options)
			.then((response) => {
				console.log(response);
				if (
					response.data.status === 'ok' ||
					response.status == 200
				) {
					openPaymentScreen(
						response.data.amount,
						response.data.id
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const checkPromocode = (promocode) => {
		if (selectedData.price == 0) {
			return;
		}
		if (!promocode) {
			showMsg('Please enter a promocode', 'error');
			return;
		}
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/promocode/check`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				email: Cookies.get('email'),
				promocode: promoCodeData.code,
				amount: selectedData.price,
			},
			withCredentials: true,
		};

		axios(options)
			.then((response) => {
				console.log(response);
				if (response.data.status === 'ok') {
					setPromoCodeData({
						...promoCodeData,
						isApplied: true,
						description: `₹${response.data.discount} Savings Applied`,
						discount: response.data.discount,
					});
					showMsg(
						`₹${response.data.discount} Savings Applied`,
						'success'
					);
				}
			})
			.catch((error) => {
				if (error.response.data.status == 'error') {
					setPromoCodeData({
						isApplied: false,
						description: error.response.data.message,
						discount: 0,
						code: promocode,
					});
					showMsg(
						error.response.data.message,
						'error'
					);
				}
			});
	};

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
		console.log(promoCodeData);
	}, [promoCodeData]);
	return (
		<>
			{Modal && (
				<LoginModal
					close={() => {
						setModal(false);
					}}
					data={{
						title: 'Wanna Puchase?',
						description:
							'Please login to continue with the purchase.',
					}}
				/>
			)}
			<div className={styles.main}>
				<Header />
				<div className={styles.container}>
					<h3>Recharge Wallet</h3>
					<p>Add credits to your wallet</p>
				</div>
				<div className={styles.mainHolder}>
					<div className={styles.left}>
						<div className={styles.cardHolder}>
							{Pricing.map((item) => {
								return (
									<div
										className={styles.card}
										key={item.id}
										onClick={() => {
											handleSelectItem(
												item.coins,
												item.price,
												item.id
											);
										}}
									>
										<div className={styles.coinInfo}>
											<LuCoins />
											<h3>
												Buy {formatNumber(item.coins)} Credits
											</h3>
											{selectedData.id === item.id && (
												<FaCheckCircle
													className={styles.checkIcon}
												/>
											)}
										</div>
										<div className={styles.amount}>
											<h3>
												₹ {formatNumber(item.price)} /-
											</h3>
											<p>
												Get {formatNumber(item.coins)} credits
												in ₹{formatNumber(item.price)}
											</p>
										</div>
									</div>
								);
							})}
						</div>
						<div className={styles.infoWrapper}>
							<p className={styles.note}>
								Note: This price is excluding taxes and
								additional gateway charges
							</p>
							<div className={styles.infoBgWrapper}>
								<h4>Why Use Credits?</h4>
								<p className={styles.info}>
									Use Credits to check your pending request
									from the web version.
								</p>
							</div>
						</div>
					</div>
					<div className={styles.TotalContainer}>
						<div className={styles.promocodeSection}>
							<p>Have a Promocode?</p>
							<div className={styles.codeInputWrapper}>
								<input
									type='text'
									placeholder='XCVYTR4'
									value={promoCodeData.code}
									onChange={(e) => {
										setPromoCodeData({
											...promoCodeData,
											code: e.target.value,
										});
									}}
								/>
								<div
									className={
										selectedData.price == 0
											? `${styles.codeSubmitBtnDisabled}`
											: `${styles.codeSubmitBtn}`
									}
									title='Select a plan to apply promocode'
									onClick={() =>
										checkPromocode(promoCodeData.code)
									}
								>
									Apply
								</div>
							</div>
							{promoCodeData.isApplied && (
								<p className={styles.appliedDescription}>
									{promoCodeData.description}
								</p>
							)}
						</div>
						<h3>Order Details</h3>
						{selectedData.coins == 0 ? (
							<div className={styles.emptyProduct}>
								<LuShoppingBag />
								<p>No Credits Plan Selected</p>
							</div>
						) : (
							<div
								className={styles.productDetailWrapper}
							>
								<div className={styles.productInfo}>
									<div
										className={styles.cancelBtn}
										onClick={() => {
											setSelectedData({
												id: -1,
												coins: 0,
												price: 0,
												tax: 0,
												gatewayCharges: 0,
												payableAmount: 0,
											});
										}}
									>
										<MdCancel />
									</div>
									<h3>
										{formatNumber(selectedData.coins)}{' '}
										Credits
									</h3>
									<p>
										Purchase of{' '}
										{formatNumber(selectedData.coins)}{' '}
										Credits
									</p>
								</div>
								<div className={styles.priceDetails}>
									<div className={styles.left}>
										<p>Amount</p>
										<p>Tax</p>
										<p>Gateway Charges (3%)</p>
										{promoCodeData.isApplied && (
											<p>Promocode</p>
										)}
										<p className={styles.boldText}>
											Payable Amount
										</p>
									</div>
									<div className={styles.right}>
										<p>
											₹{formatNumber(selectedData.price)} /-
										</p>
										<p>
											₹{formatNumber(selectedData.tax)} /-
										</p>
										<p>
											₹
											{formatNumber(
												selectedData.gatewayCharges
											)}{' '}
											/-
										</p>
										{promoCodeData.isApplied && (
											<p>- ₹{promoCodeData.discount} /-</p>
										)}
										<p className={styles.boldText}>
											₹
											{formatNumber(
												selectedData.payableAmount
											)}{' '}
											/-
										</p>
									</div>
								</div>
								<div
									className={styles.PaymentBtn}
									onClick={handleModal}
								>
									<p>
										Pay ₹
										{formatNumber(
											selectedData.payableAmount
										)}
									</p>
								</div>
								<div className={styles.badgeHolder}>
									<img
										src='https://cdn.razorpay.com/static/assets/merchant-badge/badge-dark.png'
										alt=''
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Recharge;
