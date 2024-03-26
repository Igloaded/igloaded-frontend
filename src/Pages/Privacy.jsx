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
				<h2> IGLoaded / Privacy Policy</h2>
			</div>
			<div className={styles.contentWrapper}>
				<p>
					<b>IGLoaded</b>, is a SaaS product. This
					SERVICE is provided by Aditya Singh at no
					cost and is intended for use as is. This page
					is used to inform visitors regarding the
					policies with the collection, use, and
					disclosure of Personal Information if anyone
					decided to use this Service. If you choose to
					use this Service, then you agree to the
					collection and use of information in relation
					to this policy. The Personal Information that
					we collect is used for providing and
					improving the Service. We will not use or
					share your information with anyone except as
					described in this Privacy Policy. The terms
					used in this Privacy Policy have the same
					meanings as in our Terms and Conditions,
					which are accessible at IGLoaded unless
					otherwise defined in this Privacy Policy.
				</p>
				<h2 className={styles.headingText}>
					Information Collection and Use
				</h2>
				<p>
					For a better experience, while using our
					Service, We may require you to provide us
					with certain personally identifiable
					information, including but not limited to{' '}
					<b>
						Email Address, Instagram username, Name
					</b>
					. The information that We request will be
					retained on your device and is not collected
					by us in any way.
				</p>
				<h2 className={styles.headingText}>
					Log Data
				</h2>
				<p>
					We want to inform you that whenever you use
					my Service, in a case of an error in the app
					We collect data and information (through
					third-party products) on your phone called
					Log Data. This Log Data may include
					information such as your device Internet
					Protocol (“IP”) address, device name,
					operating system version, the configuration
					of the app when utilizing my Service, the
					time and date of your use of the Service, and
					other statistics.
				</p>
				<h2 className={styles.headingText}>
					Cookies
				</h2>
				<p>
					Cookies are files with a small amount of data
					that are commonly used as anonymous unique
					identifiers. These are sent to your browser
					from the websites that you visit and are
					stored on your device's internal memory. This
					Service does not use these “cookies”
					explicitly. However, the app may use
					third-party code and libraries that use
					“cookies” to collect information and improve
					their services. You have the option to either
					accept or refuse these cookies and know when
					a cookie is being sent to your device. If you
					choose to refuse our cookies, you may not be
					able to use some portions of this Service.
				</p>
				<h2 className={styles.headingText}>
					Service Providers
				</h2>
				<p>
					We may employ third-party companies and
					individuals due to the following reasons:
					<ul>
						<li>To facilitate our Service;</li>
						<li>
							To provide the Service on our behalf;
						</li>
						<li>
							To perform Service-related services; or
						</li>
						<li>
							To assist us in analyzing how our Service
							is used.
						</li>
					</ul>
					We want to inform users of this Service that
					these third parties have access to their
					Personal Information. The reason is to
					perform the tasks assigned to them on our
					behalf. However, they are obligated not to
					disclose or use the information for any other
					purpose.
				</p>

				<h2 className={styles.headingText}>
					Security
				</h2>
				<p>
					We value your trust in providing us your
					Personal Information, thus we are striving to
					use commercially acceptable means of
					protecting it. But remember that no method of
					transmission over the internet, or method of
					electronic storage is 100% secure and
					reliable, and We cannot guarantee its
					absolute security.
				</p>

				<h2 className={styles.headingText}>
					Links to Other Sites
				</h2>
				<p>
					This Service may contain links to other
					sites. If you click on a third-party link,
					you will be directed to that site. Note that
					these external sites are not operated by us.
					Therefore, We strongly advise you to review
					the Privacy Policy of these websites. We have
					no control over and assume no responsibility
					for the content, privacy policies, or
					practices of any third-party sites or
					services.
				</p>

				<h2 className={styles.headingText}>
					Children's Privacy
				</h2>
				<p>
					We do not knowingly collect personally
					identifiable information from children. We
					encourage all children to never submit any
					personally identifiable information through
					the Application and/or Services. We encourage
					parents and legal guardians to monitor their
					children's Internet usage and to help enforce
					this Policy by instructing their children
					never to provide personally identifiable
					information through the Application and/or
					Services without their permission. If you
					have reason to believe that a child has
					provided personally identifiable information
					to us through the Application and/or
					Services, please contact us. You must also be
					at least 16 years of age to consent to the
					processing of your personally identifiable
					information in your country (in some
					countries we may allow your parent or
					guardian to do so on your behalf).
				</p>
				<p className={styles.headingText}>
					Changes to This Privacy Policy
				</p>
				<p>
					We may update our Privacy Policy from time to
					time. Thus, you are advised to review this
					page periodically for any changes. We will
					notify you of any changes by posting the new
					Privacy Policy on this page. These changes
					are effective immediately after they are
					posted on this page.
				</p>
				<p className={styles.headingText}>
					Contact Us
				</p>
				<p>
					If you have any questions or suggestions
					about my Privacy Policy, do not hesitate to
					contact us at{' '}
					<a href='mailto:hello@igloaded.com'>
						hello@igloaded.com
					</a>
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default Transition(Privacy);
