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
				<h2>
					{' '}
					IGLoaded / Cancellation - Refund Policy
				</h2>
			</div>
			<div className={styles.contentWrapper}>
				<p className={styles.small}>
					Last updated: January 30, 2024
				</p>
				<br />
				<p>
					Thank you for shopping at IGLoaded. If, for
					any reason, You are not completely satisfied
					with a purchase We invite You to review our
					policy on refunds and returns. This Return
					and Refund Policy
				</p>
				<p>
					The following terms are applicable for any
					products that You purchased with Us.
				</p>
				<br />
				<p className={styles.headingText}>
					Interpretation
				</p>
				<p>
					The words of which the initial letter is
					capitalized have meanings defined under the
					following conditions. The following
					definitions shall have the same meaning
					regardless of whether they appear in singular
					or in plural.
				</p>
				<p className={styles.headingText}>
					Definitions
				</p>
				<p>
					For the purposes of this Return and Refund
					Policy:
					<br />
					<ul>
						<li>
							Company (referred to as either "the
							Company", "We", "Us" or "Our" in this
							Agreement) refers to IGLoaded, Mumbai,
							India.
						</li>
						<li>
							Goods refer to the paid subscriptions to
							the Service.
						</li>
						<li>
							Orders mean a request by You to purchase a
							paid subscription to the Service.
						</li>
						<li>Service refers to the Website.</li>
						<li>
							Website refers to IGLoaded, accessible from
							https://www.igloaded.com
						</li>
						<li>
							'You' means the individual accessing or
							using the Service, or the company, or other
							legal entity on behalf of which such
							individual is accessing or using the
							Service, as applicable.
						</li>
					</ul>
				</p>
				<p className={styles.headingText}>
					Your Order Cancellation Rights
				</p>
				<p>
					You are entitled to cancel Your Order within
					7 days without giving any reason for doing
					so. <br />
					<br />
					The deadline for cancelling an Order is 7
					days from the date on which You received the
					Goods or on which a third party you have
					appointed, who is not the carrier, takes
					possession of the product delivered. <br />
					<br /> In order to exercise Your right of
					cancellation, You must inform Us of your
					decision by means of a clear statement. You
					can inform us of your decision by:
					<ul>
						<br />
						<li>
							By Email :{' '}
							<a
								className={styles.link}
								href='mailto:contact@igloaded.com'
							>
								contact@igloaded.com
							</a>
						</li>
					</ul>
					<br />
					We will reimburse You no later than 14 days
					from the day on which We receive the returned
					Goods. We will use the same means of payment
					as You used for the Order, and You will not
					incur any fees for such reimbursement.
				</p>
				<p className={styles.headingText}>
					Conditions for Refunds
				</p>
				<p>
					Incase of any refunds, you should contact
					Team IGLoaded by support email and explain
					why you want to cancel the subscription. If
					the service meant to be provided is not up,
					you should not ask for refund immediately
					without resolving the issue with the team.
					<br />
					<br />
					No Refunds would be provided in case of:
					<br />
					<br />
					<ul>
						<li>
							You have changed your mind about paid
							subscription;
						</li>
						<li>
							You bought the goods by mistake and for you
							its not useful; or
						</li>
						<li>
							You do not have sufficient expertise to use
							the item.
						</li>
					</ul>
				</p>
				<p className={styles.headingText}>Gifts</p>
				<p>
					If you get the Goods under a gift, the amount
					of credits would be directly added to your
					IGLoaded Profile and no (Cash/E-refunds)
					would be provided.
				</p>
				<p className={styles.headingText}>
					Contact Us
				</p>
				<p>
					If you have any questions about our Returns
					and Refunds Policy, please contact us: <br />
					<a href='mailto:contact@igloaded.com'>
						contact@igloaded.com
					</a>
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default Transition(Privacy);
