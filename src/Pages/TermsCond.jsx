import React, { useEffect } from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import styles from '../Styles/Privacy.module.scss';

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
	return (
		<div className={styles.main}>
			<Header />
			<div className={styles.headingWrapper}>
				<h2> IGLoaded / Terms and Conditions</h2>
			</div>
			<div className={styles.contentWrapper}>
				<p>
					These terms and conditions outline the rules
					and regulations for the use of IGLoaded's
					Website, located at https://www.igloaded.com.{' '}
					<br />
					<br />
					By accessing this website we assume you
					accept these terms and conditions. Do not
					continue to use www.igloaded.com if you do
					not agree to take all of the terms and
					conditions stated on this page. <br />
					<br />
					The following terminology applies to these
					Terms and Conditions, Privacy Statement and
					Disclaimer Notice and all Agreements:
					<b>"Client"</b>, <b>"You"</b> and{' '}
					<b>"Your"</b> refers to you, the person log
					on this website and compliant to the
					Company's terms and conditions.{' '}
					<b>"The Company"</b>, <b>"Ourselves"</b>,{' '}
					<b>"We"</b>, <b>"Our"</b> and <b>"Us"</b>,
					refers to our Company. <b>"Party"</b>,{' '}
					<b>"Parties"</b>, or <b></b>
					<b>"Us"</b>, refers to both the Client and
					ourselves. All terms refer to the offer,
					acceptance and consideration of payment
					necessary to undertake the process of our
					assistance to the Client in the most
					appropriate manner for the express purpose of
					meeting the Client's needs in respect of
					provision of the Company's stated services,
					in accordance with and subject to, prevailing
					law of in. Any use of the above terminology
					or other words in the singular, plural,
					capitalization and/or he/she or they, are
					taken as interchangeable and therefore as
					referring to same.
				</p>
				<p className={styles.headingText}>Cookies</p>
				<p>
					We employ the use of cookies. By accessing
					www.igloaded.com, you agreed to use cookies
					in agreement with the IGLoaded's Privacy
					Policy. Most interactive websites use cookies
					to let us retrieve the user's details for
					each visit. Cookies are used by our website
					to enable the functionality of certain areas
					to make it easier for people visiting our
					website. Some of our affiliate/advertising
					partners may also use cookies.
				</p>
				<p className={styles.headingText}>License</p>
				<p>
					Unless otherwise stated, IGLoaded and/or its
					licensors own the intellectual property
					rights for all material on www.igloaded.com.
					All intellectual property rights are
					reserved. You may access this from
					www.igloaded.com for your own personal use
					subjected to restrictions set in these terms
					and conditions.
				</p>
				<p className={styles.headingText}>
					You must not:
				</p>
				<p>
					<ul>
						<li>
							Republish material from www.igloaded.com
						</li>
						<li>
							Sell, rent or sub-license material from
							www.igloaded.com
						</li>
						<li>
							Reproduce, duplicate or copy material from
							www.igloaded.com
						</li>
						<li>
							Redistribute content from www.igloaded.com
						</li>
					</ul>
				</p>
				<p>
					This Agreement shall begin on the date
					hereof. Our Terms and Conditions were created
					with the help of the Free Terms and
					Conditions Generator.
				</p>
				<p className={styles.headingText}>
					Hyperlinking to our Content
				</p>
				<p>
					The following organizations may link to our
					Website without prior written approval:
				</p>
				<p>
					<ul>
						<li>Government agencies;</li>
						<li>Search engines;</li>
						<li>News organizations;</li>
						<li>
							Online directory distributors may link to
							our Website in the same manner as they
							hyperlink to the Websites of other listed
							businesses; and
						</li>
						<li>
							System wide Accredited Businesses except
							soliciting non-profit organizations,
							charity shopping malls, and charity
							fundraising groups which may not hyperlink
							to our Web site.
						</li>
					</ul>
				</p>
				<br />
				<p>
					These organizations may link to our home
					page, to publications or to other Website
					information so long as the link: (a) is not
					in any way deceptive; (b) does not falsely
					imply sponsorship, endorsement or approval of
					the linking party and its products and/or
					services; and (c) fits within the context of
					the linking party's site.
				</p>
				<p className={styles.headingText}>
					Content Liability
				</p>
				<p>
					We shall not be hold responsible for any
					content that appears on your Website. You
					agree to protect and defend us against all
					claims that is rising on your Website. No
					link(s) should appear on any Website that may
					be interpreted as libelous, obscene or
					criminal, or which infringes, otherwise
					violates, or advocates the infringement or
					other violation of, any third party rights.
				</p>
				<p className={styles.headingText}>
					Reservation of Rights
				</p>
				<p>
					We reserve the right to request that you
					remove all links or any particular link to
					our Website. You approve to immediately
					remove all links to our Website upon request.
					We also reserve the right to amen these terms
					and conditions and it's linking policy at any
					time. By continuously linking to our Website,
					you agree to be bound to and follow these
					linking terms and conditions.
				</p>
				<p className={styles.headingText}>
					Removal of links from our website
				</p>
				<p>
					If you find any link on our Website that is
					offensive for any reason, you are free to
					contact and inform us any moment. We will
					consider requests to remove links but we are
					not obligated to or so or to respond to you
					directly. We do not ensure that the
					information on this website is correct, we do
					not warrant its completeness or accuracy; nor
					do we promise to ensure that the website
					remains available or that the material on the
					website is kept up to date.
				</p>
				<p className={styles.headingText}>
					Disclaimer
				</p>
				<p>
					To the maximum extent permitted by applicable
					law, we exclude all representations,
					warranties and conditions relating to our
					website and the use of this website. Nothing
					in this disclaimer will:
					<br /> <br />
					<ul>
						<li>
							limit or exclude our or your liability for
							death or personal injury;
						</li>
						<li>
							limit or exclude our or your liability for
							fraud or fraudulent misrepresentation;
						</li>
						<li>
							limit any of our or your liabilities in any
							way that is not permitted under applicable
							law; or
						</li>
						<li>
							exclude any of our or your liabilities that
							may not be excluded under applicable law.
						</li>
					</ul>
				</p>
				<br />
				<p>
					The limitations and prohibitions of liability
					set in this Section and elsewhere in this
					disclaimer: (a) are subject to the preceding
					paragraph; and (b) govern all liabilities
					arising under the disclaimer, including
					liabilities arising in contract, in tort and
					for breach of statutory duty. As long as the
					website and the information and services on
					the website are provided free of charge, we
					will not be liable for any loss or damage of
					any nature.
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default Privacy;
