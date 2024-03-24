import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import styles from './Styles/Transactions.module.scss';
import { IoFilter } from 'react-icons/io5';
import FilterModal from './FilterModal';
import { FaSortAlphaDown } from 'react-icons/fa';
import { FaSortAlphaUpAlt } from 'react-icons/fa';
import { RiCoinsFill } from 'react-icons/ri';
import space from '../../assets/staticAssets/space.png';
import axios from 'axios';
import { vars } from '../../../config.js';
import Cookies from 'js-cookie';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import { formatNumber } from '../../Reusable.js';

const Transactions = () => {
	const [filter, setFilter] = useState({
		isEnabled: false,
		byOrder: 1,
		byType: [],
	});
	const [filterModal, setFilterModal] =
		useState(false);
	const closeModal = () => {
		setFilterModal(false);
	};
	const [currentPage, setCurrentPage] =
		useState(1);
	const [
		isTransactionEmpty,
		setIsTransactionEmpty,
	] = useState(true);

	const [transactionProps, setTransactionProps] =
		useState({
			totalTransactions: 0,
			nextPage: 1,
			limit: 5,
		});

	const [transactionData, setTransactionData] =
		useState([]);

	useEffect(() => {
		getTransactionData(1);
	}, []);

	const email = Cookies.get('email');

	const getTotalPages = () => {
		return Math.ceil(
			transactionProps.totalTransactions /
				transactionProps.limit
		);
	};

	const getTransactionData = (page) => {
		setLoading(true);
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/transaction`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				page: page,
				limit: transactionProps.limit,
				email: email,
				order: order,
				filter: filter,
			},
			withCredentials: true,
		};

		axios(options)
			.then((res) => {
				setLoading(false);
				if (res.data.totalTransactions == 0) {
					setIsTransactionEmpty(true);
				} else {
					setIsTransactionEmpty(false);
				}
				if (res.data.status == 'ok') {
					setTransactionData([
						...res.data.transactions,
					]);
					setTransactionProps({
						...transactionProps,
						totalTransactions:
							res.data.totalTransactions,
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState(-1);

	useEffect(() => {
		getTransactionData(1);
		setCurrentPage(1);
	}, [order]);

	useEffect(() => {
		// console.log(filter);
		getTransactionData(1);
	}, [filter]);

	const getFilterData = (data) => {
		if (data.type.length >= 1) {
			setFilter({
				...filter,
				isEnabled: true,
				byType: data.type,
			});
		} else if (data.type.length == 0) {
			setFilter({
				...filter,
				isEnabled: false,
				byType: [],
			});
		}
	};

	return (
		<div className={styles.wrapper}>
			{filterModal && (
				<FilterModal
					close={closeModal}
					data={filter}
					setData={getFilterData}
				/>
			)}
			{loading && (
				<div className={styles.loading}>
					<div className={styles.loader}></div>
					<p>Fetching transactions</p>
				</div>
			)}
			<div className={styles.upperWrapper}>
				<div className={styles.title}>
					<h3>
						Transactions History{' '}
						<span>
							{`(${formatNumber(
								transactionProps.totalTransactions
							)})`}
						</span>
					</h3>
				</div>
				<div className={styles.rightWrapper}>
					<div
						className={styles.filterWrapper}
						onClick={() => setOrder(order * -1)}
					>
						{order == 1 ? (
							<FaSortAlphaUpAlt title='Sorted in Descending order' />
						) : (
							<FaSortAlphaDown title='Sorted in Ascending order' />
						)}
					</div>
					<div
						className={styles.filterWrapper}
						onClick={() => setFilterModal(!filterModal)}
					>
						<IoFilter />
					</div>
				</div>
			</div>
			{!isTransactionEmpty ? (
				<>
					<div className={styles.transactionWrapper}>
						{transactionData.map((item, index) => {
							return (
								<div
									key={item._id}
									className={styles.transaction}
								>
									<RiCoinsFill />
									<div className={styles.info}>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
										<p>{`On ${moment(item.date).format('Do MMM, YYYY [at] h:mm A')}`}</p>
									</div>
									<div className={styles.amountType}>
										{item.type == 'planpurchase' ? (
											<p style={{ color: 'white' }}>
												Plan Activated (₹
												{formatNumber(item.amount)})
											</p>
										) : item.type == 'debit' ? (
											<p style={{ color: 'red' }}>
												- {formatNumber(item.amount)} Credits
											</p>
										) : (
											<p style={{ color: 'lightgreen' }}>
												+ {formatNumber(item.amount)} Credits
											</p>
										)}
										<p></p>
									</div>
								</div>
							);
						})}
					</div>
					<div className={styles.paginationHolder}>
						<Pagination
							count={getTotalPages()}
							size='large'
							variant='text'
							page={currentPage}
							siblingCount={0}
							sx={{
								'& .MuiPaginationItem-root': {
									color: 'white',
									backgroundColor: 'transparent',
									'&:hover': {
										backgroundColor: '#6762ff',
									},
								},
								'& .MuiPaginationItem-page.Mui-selected':
									{
										backgroundColor: '#6762ff',
										color: 'white',
										'&:hover': {
											backgroundColor: '#6762ff',
										},
									},
							}}
							onChange={(e, value) => {
								if (value != currentPage) {
									getTransactionData(value);
									setCurrentPage(value);
								}
							}}
						/>
					</div>
				</>
			) : (
				<div className={styles.noTransaction}>
					<img
						src={space}
						alt=''
					/>
					<p>No Transactions Yet</p>
				</div>
			)}
		</div>
	);
};

export default Transactions;
