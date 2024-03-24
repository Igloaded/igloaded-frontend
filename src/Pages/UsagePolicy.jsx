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
				<h2> IGLoaded / Acceptable Usage Policy</h2>
			</div>
			<div className={styles.contentWrapper}>
				<p className={styles.small}>
					Last updated March 02, 2024
				</p>
				<p>
					This Acceptable Use Policy <b>('Policy')</b>{' '}
					is part of our
					https://igloaded.com/terms-and-conditions{' '}
					<b>('Legal Terms')</b> and should therefore
					be read alongside our main Legal Terms:
					https://igloaded.com/terms-and-conditions. If
					you do not agree with these Legal Terms,
					please refrain from using our Services. Your
					continued use of our Services implies
					acceptance of these Legal Terms.
					<br />
					<br /> Please carefully review this Policy
					which applies to any and all:{' '}
					<p>
						<ul>
							<li>
								uses of our Services (as defined in{' '}
								<b>'Legal Terms'</b>)
							</li>
							<li>
								forms, materials, consent tools, comments,
								post, and all other content available on
								the Services <b>('Content')</b> and
							</li>
							<li>
								material which you contribute to the
								Services including any upload, post,
								review, disclosure, ratings, comments,
								chat etc. in any forum, chatrooms,
								reviews, and to any interactive services
								associated with it ('Contribution').
							</li>
						</ul>
					</p>
				</p>
				<h2 className={styles.headingText}>
					WHO WE ARE
				</h2>
				<p>
					We are Nexus Infinity, doing business as
					IGLoaded (<b>'Company'</b>,<b>'we'</b>,{' '}
					<b>'us'</b>, or <b>'our'</b>) a company
					registered in India at Vasantdata Patil
					College Incubation Centre, Near LBS Marg,
					Evarad nagar, Sion, Mumbai, Maharashtra
					400022. We operate the website
					https://www.igloaded.com (the <b>'Site'</b>),
					as well as any other related products and
					services that refer or link to this Policy
					(collectively, the <b>'Services'</b>).
				</p>
				<h2 className={styles.headingText}>
					USE OF THE SERVICES
				</h2>
				<p>
					When you use the Services you warrant that
					you will comply with this Policy and with all
					applicable laws. You also acknowledge that
					you may not:
					<ul>
						<li>
							Systematically retrieve data or other
							content from the Services to create or
							compile, directly or indirectly, a
							collection, compilation, database, or
							directory without written permission from
							us.
						</li>
						<li>
							Make any unauthorised use of the Services,
							including collecting usernames and/or email
							addresses of users by electronic or other
							means for the purpose of sending
							unsolicited email, or creating user
							accounts by automated means or under false
							pretences.
						</li>
						<li>
							Circumvent, disable, or otherwise interfere
							with security-related features of the
							Services, including features that prevent
							or restrict the use or copying of any
							Content or enforce limitations on the use
							of the Services and/or the Content
							contained therein.
						</li>
						<li>
							Engage in unauthorised framing of or
							linking to the Services.
						</li>
						<li>
							Trick, defraud, or mislead us and other
							users, especially in any attempt to learn
							sensitive account information such as user
							passwords.
						</li>
						<li>
							Make improper use of our Services,
							including our support services or submit
							false reports of abuse or misconduct.
						</li>
						<li>
							Engage in any automated use of the
							Services, such as using scripts to send
							comments or messages, or using any data
							mining, robots, or similar data gathering
							and extraction tools.
						</li>
						<li>
							Interfere with, disrupt, or create an undue
							burden on the Services or the networks or
							the Services connected.
						</li>
						<li>
							Attempt to impersonate another user or
							person or use the username of another user.
						</li>
						<li>
							Use any information obtained from the
							Services in order to harass, abuse, or harm
							another person.
						</li>
						<li>
							Use the Services as part of any effort to
							compete with us or otherwise use the
							Services and/or the Content for any
							revenue-generating endeavour or commercial
							enterprise.
						</li>
						<li>
							Decipher, decompile, disassemble, or
							reverse engineer any of the software
							comprising or in any way making up a part
							of the Services, except as expressly
							permitted by applicable law.
						</li>
						<li>
							Attempt to bypass any measures of the
							Services designed to prevent or restrict
							access to the Services, or any portion of
							the Services.
						</li>
						<li>
							Harass, annoy, intimidate, or threaten any
							of our employees or agents engaged in
							providing any portion of the Services to
							you.
						</li>
						<li>
							Delete the copyright or other proprietary
							rights notice from any Content.
						</li>
						<li>
							Copy or adapt the Services’ software,
							including but not limited to Flash, PHP,
							HTML, JavaScript, or other code.
						</li>
						<li>
							Upload or transmit (or attempt to upload or
							to transmit) viruses, Trojan horses, or
							other material, including excessive use of
							capital letters and spamming (continuous
							posting of repetitive text), that
							interferes with any party’s uninterrupted
							use and enjoyment of the Services or
							modifies, impairs, disrupts, alters, or
							interferes with the use, features,
							functions, operation, or maintenance of the
							Services.
						</li>
						<li>
							Upload or transmit (or attempt to upload or
							to transmit) any material that acts as a
							passive or active information collection or
							transmission mechanism, including without
							limitation, clear graphics interchange
							formats ('gifs'), 1×1 pixels, web bugs,
							cookies, or other similar devices
							(sometimes referred to as 'spyware' or
							'passive collection mechanisms' or 'pcms').
						</li>
						<li>
							Except as may be the result of standard
							search engine or Internet browser usage,
							use, launch, develop, or distribute any
							automated system, including without
							limitation, any spider, robot, cheat
							utility, scraper, or offline reader that
							accesses the Services, or using or
							launching any unauthorised script or other
							software.
						</li>
						<li>
							Disparage, tarnish, or otherwise harm, in
							our opinion, us and/or the Services.
						</li>
						<li>
							Use the Services in a manner inconsistent
							with any applicable laws or regulations.
						</li>
					</ul>
					If you subscribe to our Services, you
					understand, acknowledge, and agree that you
					may not, except if expressly permitted:
					<ul>
						<li>
							Engage in any use, including modification,
							copying, redistribution, publication,
							display, performance, or retransmission, of
							any portions of any Services, other than as
							expressly permitted by this Policy, without
							the prior written consent of Nexus
							Infinity, which consent Nexus Infinity may
							grant or refuse in its sole and absolute
							discretion.
						</li>
						<li>
							Reconstruct or attempt to discover any
							source code or algorithms of the Services,
							or any portion thereof, by any means
							whatsoever.
						</li>
						<li>
							Provide, or otherwise make available, the
							Services to any third party.
						</li>
						<li>
							Intercept any data not intended for you.
						</li>
						<li>
							Damage, reveal, or alter any user's data,
							or any other hardware, software, or
							information relating to another person or
							entity.
						</li>
					</ul>
				</p>
				<h2 className={styles.headingText}>
					AGREEMENTS
				</h2>
				<p>
					By continuing to use the Services, you agree
					to following agreements :
					<br />
					<ul>
						<li>
							IGLoaded is a service based platform, If
							the partnered service is down, we can't do
							anything except waiting, delay may occur in
							the delivery of the service.
						</li>
						<li>
							Data deletion may occur if we lost
							something in the database, we will try to
							recover it but we can't guarantee it.
						</li>
						<li>
							We are not responsible for any loss of data
							or any other loss.
						</li>
					</ul>
				</p>
				<h2 className={styles.headingText}>
					CONTRIBUTIONS
				</h2>
				<p>
					In this Policy, the term 'Contribution'
					means:
					<ul>
						<li>
							any data, information, software, text,
							code, music, scripts, sound, graphics,
							photos, videos, tags, messages, interactive
							features, or other materials that you post,
							share, upload, submit, or otherwise provide
							in any manner on or through to the
							Services; or
						</li>
						<li>
							any other content, materials, or data you
							provide to Nexus Infinity or use with the
							Services.
						</li>
					</ul>
					Some areas of the Services may allow users to
					upload, transmit, or post Contributions. We
					may but are under no obligation to review or
					moderate the Contributions made on the
					Services, and we expressly exclude our
					liability for any loss or damage resulting
					from any of our users' breach of this Policy.
					Please report any Contribution that you
					believe breaches this Policy; however, we
					will determine, in our sole discretion,
					whether a Contribution is indeed in breach of
					this Policy.
					<br />
					You warrant that:
					<ul>
						<li>
							you are the creator and owner of or have
							the necessary licences, rights, consents,
							releases, and permissions to use and to
							authorise us, the Services, and other users
							of the Services to use your Contributions
							in any manner contemplated by the Services
							and this Policy;
						</li>
						<li>
							all your Contributions comply with
							applicable laws and are original and true
							(if they represent your opinion or facts);
						</li>
						<li>
							the creation, distribution, transmission,
							public display, or performance, and the
							accessing, downloading, or copying of your
							Contributions do not and will not infringe
							the proprietary rights, including but not
							limited to the copyright, patent,
							trademark, trade secret, or moral rights of
							any third party; and
						</li>
						<li>
							you have the verifiable consent, release,
							and/or permission of each and every
							identifiable individual person in your
							Contributions to use the name or likeness
							of each and every such identifiable
							individual person to enable inclusion and
							use of your Contributions in any manner
							contemplated by the Services and this
							Policy.
						</li>
					</ul>
					You also agree that you will not post,
					transmit, or upload any (or any part of a)
					Contribution that:
					<ul>
						<li>
							is in breach of applicable laws,
							regulation, court order, contractual
							obligation, this Policy, our Legal Terms, a
							legal duty, or that promotes or facilitates
							fraud or illegal activities;
						</li>
						<li>
							is defamatory, obscene, offensive, hateful,
							insulting, intimidating, bullying, abusive,
							or threatening, to any person or group;
						</li>
						<li>
							is false, inaccurate, or misleading;
						</li>
						<li>
							includes child sexual abuse material, or
							violates any applicable law concerning
							child pornography or otherwise intended to
							protect minors;
						</li>
						<li>
							contains any material that solicits
							personal information from anyone under the
							age of 18 or exploits people under the age
							of 18 in a sexual or violent manner;
						</li>
						<li>
							promotes violence, advocates the violent
							overthrow of any government, or incites,
							encourages, or threatens physical harm
							against another;
						</li>
						<li>
							is obscene, lewd, lascivious, filthy,
							violent, harassing, libellous, slanderous,
							contains sexually explicit material, or is
							otherwise objectionable (as determined by
							us);
						</li>
						<li>
							is discriminatory based on race, sex,
							religion, nationality, disability, sexual
							orientation, or age;
						</li>
						<li>
							bullies, intimidates, humiliates, or
							insults any person;
						</li>
						<li>
							promotes, facilitates, or assists anyone in
							promoting and facilitating acts of
							terrorism;
						</li>
						<li>
							infringes, or assists anyone in infringing,
							a third party's intellectual property
							rights or publicity or privacy rights;
						</li>
						<li>
							is deceitful, misrepresents your identity
							or affiliation with any person and/or
							misleads anyone as to your relationship
							with us or implies that the Contribution
							was made by someone else than you;
						</li>
						<li>
							contains unsolicited or unauthorised
							advertising, promotional materials, pyramid
							schemes, chain letters, spam, mass
							mailings, or other forms of solicitation
							that has been 'paid for', whether with
							monetary compensation or in kind; or
						</li>
						<li>
							misrepresents your identity or who the
							Contribution is from.
						</li>
					</ul>
				</p>
				<h2 className={styles.headingText}>
					REPORTING A BREACH OF THIS POLICY
				</h2>
				<p>
					We may but are under no obligation to review
					or moderate the Contributions made on the
					Services and we expressly exclude our
					liability for any loss or damage resulting
					from any of our users' breach of this Policy.
					<br />
					If you consider that any Content or
					Contribution:
					<br />
					<ul>
						<li>
							breach this Policy, please email us at
							support@igloaded.com, or refer to the
							contact details at the bottom of this
							document to let us know which Content or
							Contribution is in breach of this Policy
							and why; or
						</li>
						<li>
							infringe any third-party intellectual
							property rights, please email us at
							support@igloaded.com.
						</li>
					</ul>
					<br />
					<br />
					We will reasonably determine whether a
					Content or Contribution breaches this Policy.
				</p>

				<h2 className={styles.headingText}>
					CONSEQUENCES OF BREACHING THIS POLICY
				</h2>
				<p>
					The consequences for violating our Policy
					will vary depending on the severity of the
					breach and the user's history on the
					Services, by way of example:
					<br />
					<br />
					We may, in some cases, give you a warning
					and/or remove the infringing Contribution,
					however, if your breach is serious or if you
					continue to breach our Legal Terms and this
					Policy, we have the right to suspend or
					terminate your access to and use of our
					Services and, if applicable, disable your
					account. We may also notify law enforcement
					or issue legal proceedings against you when
					we believe that there is a genuine risk to an
					individual or a threat to public safety.
					<br />
					<br />
					We exclude our liability for all action we
					may take in response to any of your breaches
					of this Policy.
				</p>

				<h2 className={styles.headingText}>
					COMPLAINTS AND REMOVAL OF LEGITIMATE CONTENT
				</h2>
				<p>
					If you consider that some Content or
					Contribution have been mistakenly removed or
					blocked from the Services, please refer to
					the contact details at the bottom of this
					document and we will promptly review our
					decision to remove such Content or
					Contribution. The Content or Contribution may
					stay 'down' whilst we conduct the review
					process.
					<br />
					<br />
					Any content shared to IGLoaded which is NSFW
					or illegeal may result in direct removal from
					the platform, with or without notice.
				</p>

				<h2 className={styles.headingText}>
					DISCLAIMER
				</h2>
				<p>
					Nexus Infinity is under no obligation to
					monitor user's activities, and we disclaim
					any responsibility for any user's misuse of
					the Services. Nexus Infinity has no
					responsibility for any user or other Content
					or Contribution created, maintained, stored,
					transmitted, or accessible on or through the
					Services, and is not obligated to monitor or
					exercise any editorial control over such
					material. If Nexus Infinity becomes aware
					that any such Content or Contribution
					violates this Policy, Nexus Infinity may, in
					addition to removing such Content or
					Contribution and blocking your account,
					report such breach to the police or
					appropriate regulatory authority. Unless
					otherwise stated in this Policy, Nexus
					Infinity disclaims any obligation to any
					person who has not entered into an agreement
					with Nexus Infinity for the use of the
					Services.
				</p>
				<p className={styles.headingText}>
					HOW CAN YOU CONTACT US ABOUT THIS POLICY?
				</p>
				<p>
					If you have any further questions or comments
					or wish to report any problematic Content or
					Contribution, you may contact us by Email :{' '}
					<br />
					<a href='mailto:support@igloaded.com'>
						support@igloaded.com
					</a>
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default Privacy;
