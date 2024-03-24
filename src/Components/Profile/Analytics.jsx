import React, {
	useEffect,
	useState,
} from 'react';
import styles from './Styles/Analytics.module.scss';
import { Progress } from 'antd';
import { PiCoinsLight } from 'react-icons/pi';
import axios from 'axios';
import { vars } from '../../../config';
import Cookies from 'js-cookie';

const Analytics = () => {
	const baseUrl = vars.API_URL;

	const compareEpoch = (epoch) => {
		const date = new Date(epoch);
		const currentDate = new Date();
		const diffInMs = Math.abs(currentDate - date);
		const diffInHours = Math.floor(
			diffInMs / (1000 * 60 * 60)
		);
		const diffInMinutes = Math.floor(
			diffInMs / (1000 * 60)
		);

		if (diffInHours > 0) {
			return date > currentDate
				? `in ${diffInHours} Hours`
				: `Expired ${diffInHours} Hours ago`;
		} else {
			return date > currentDate
				? `in ${diffInMinutes} Minutes`
				: `Expired ${diffInMinutes} Minutes ago`;
		}
	};

	const epochToDateString = (epoch) => {
		const date = new Date(epoch);
		const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		return dateStr;
	};

	const percentage = (num, per) => {
		if (num == 0 && per == 0) return 0;
		const result = (num / per) * 100;
		return result.toFixed(1);
	};

	const calculatePercentage = (
		startDate,
		endDate
	) => {
		if (startDate == 0 || endDate == 0) return 0;
		const now = new Date().getTime();
		const totalDuration = endDate - startDate;
		const passedDuration = now - startDate;
		const percentage =
			(passedDuration / totalDuration) * 100;
		const num = percentage.toFixed(1);
		return num;
	};

	const [usageData, setUsageData] = useState({
		profileSearched: 0,
		dailySearchesAllowed: 0,
		MonthlySearchesAllowed: 0,
		reelsTracked: 0,
		dailyReelsAllowed: 0,
		MonthlyReelsAllowed: 0,
		planName: '',
		planType: 'Monthly',
		planExpiry: 0,
		planPurchaseDate: 0,
		credits: 0,
		getFollowersRequest: 0,
		getFollowersTotal: 0,
		getFollowersRequestRefreshDate: 0,
	});

	const formatNum = (num) => {
		const number = parseInt(num);
		return number.toLocaleString('en-IN');
	};

	const getUsageData = async () => {
		const options = {
			method: 'GET',
			url: `${baseUrl}/user/usage`,
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
		};

		axios(options)
			.then((res) => {
				setUsageData({
					profileSearched:
						res.data.data.limits.dailySearchCount,
					dailySearchesAllowed:
						res.data.data.limits.maxSearchPerDay,
					MonthlySearchesAllowed:
						res.data.data.limits.maxSearchPerMonth,
					reelsTracked:
						res.data.data.limits.dailyReelCount,
					dailyReelsAllowed:
						res.data.data.limits.maxReelsPerDay,
					MonthlyReelsAllowed:
						res.data.data.limits.maxReelsPerMonth,
					getFollowersRequest:
						res.data.data.limits.dailyScanCount,
					getFollowersTotal:
						res.data.data.limits.maxScanPerDay,
					planName: res.data.data.plan.planName,
					planType: 'Monthly',
					planExpiry:
						res.data.data.plan.planExpiry == null
							? 0
							: res.data.data.plan.planExpiry,
					planPurchaseDate:
						res.data.data.plan.planPurchaseDate,

					credits: res.data.data.credits,
					getFollowersRequestRefreshDate: compareEpoch(
						res.data.data.limits.lastScanReset
					),
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUsageData();
	}, []);
	return (
		<div className={styles.wrapper}>
			<p>Usage Analytics</p>
			<div className={styles.analyticsWrapper}>
				<div className={styles.progressWrapper}>
					<Progress
						percent={percentage(
							usageData.profileSearched,
							usageData.dailySearchesAllowed
						)}
						status='active'
						trailColor='white'
						strokeColor='#6762ff'
						style={{ width: '70%' }}
					/>
					<p>
						{formatNum(usageData.profileSearched)}/
						{formatNum(usageData.dailySearchesAllowed)}{' '}
						Profiles/ Post/ Stories searched
					</p>
				</div>
				<div className={styles.progressWrapper}>
					<Progress
						percent={percentage(
							usageData.reelsTracked,
							usageData.dailyReelsAllowed
						)}
						status='active'
						trailColor='white'
						strokeColor='#6762ff'
						style={{ width: '70%' }}
					/>
					<p>
						{formatNum(usageData.reelsTracked)}/
						{formatNum(usageData.dailyReelsAllowed)}{' '}
						Reels tracked
					</p>
				</div>
			</div>
			<div className={styles.infoCardWrapper}>
				<div className={styles.infoCard}>
					<Progress
						type='dashboard'
						percent={percentage(
							usageData.getFollowersRequest,
							usageData.getFollowersTotal
						)}
						trailColor='white'
						status='active'
						strokeColor='#6762ff'
					/>
					<p>
						Request Limit:{' '}
						<span>
							{usageData.getFollowersRequest}/
							{usageData.getFollowersTotal}
						</span>
					</p>
					{/* <p>
						Refresh{' '}
						{usageData.getFollowersRequestRefreshDate}
					</p> */}
				</div>
				<div className={styles.infoCard}>
					<Progress
						type='dashboard'
						percent={calculatePercentage(
							usageData.planPurchaseDate,
							usageData.planExpiry
						)}
						trailColor='white'
						status='active'
						strokeColor='#6762ff'
					/>
					<p>
						Plan:
						{usageData.planName == 'Free' ? (
							<span> {usageData.planName}</span>
						) : (
							<span>
								{' '}
								{usageData.planName} ({usageData.planType}
								)
							</span>
						)}
					</p>
					{usageData.planExpiry != 0 ? (
						<p>
							Expiring on{' '}
							{epochToDateString(usageData.planExpiry)}
						</p>
					) : null}
				</div>
				<div className={styles.infoCard}>
					<PiCoinsLight />
					<p>
						Credits:{' '}
						<span>{formatNum(usageData.credits)}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
