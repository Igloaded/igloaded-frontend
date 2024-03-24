import React, {
	useState,
	useEffect,
} from 'react';
import styles from './Styles/FilterModal.module.scss';
import { IoMdCloseCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';

const FilterModal = ({
	close,
	data,
	setData,
}) => {
	const [isFilterEnabled, setIsFilterEnabled] =
		useState(data.isEnabled);

	const [filterProps, setFilterProps] = useState({
		type: [...data.byType],
	});

	const validateFilter = () => {
		setData(filterProps);
	};

	const defaultFilter = {
		type: [],
	};

	const addType = (type) => {
		if (!filterProps.type.includes(type)) {
			setFilterProps({
				...filterProps,
				type: [...filterProps.type, type],
			});
		}
	};

	const removeType = (type) => {
		const filteredType = filterProps.type.filter(
			(t) => t !== type
		);
		setFilterProps({
			...filterProps,
			type: filteredType,
		});
	};

	const removeFilter = () => {
		isFilterEnabled && setIsFilterEnabled(false);
		setFilterProps(defaultFilter);
	};

	useEffect(() => {
		if (filterProps.type.length > 0) {
			setIsFilterEnabled(true);
		} else {
			setIsFilterEnabled(false);
		}
	}, [filterProps]);

	return (
		<div className={styles.main}>
			<div className={styles.heading}>
				<p>Filter by :</p>
				{isFilterEnabled && (
					<div
						className={styles.clearBtn}
						onClick={removeFilter}
					>
						<p>Clear All</p>
						<IoMdCloseCircle />
					</div>
				)}
			</div>
			<div className={styles.amountWrapper}></div>
			<div className={styles.typeWrapper}>
				<p>Type</p>
				<div className={styles.type}>
					<div className={styles.typeItem}>
						<input
							type='checkbox'
							name='type'
							value='credit'
							onChange={(e) => {
								e.target.checked && addType('credit');
								!e.target.checked && removeType('credit');
							}}
							checked={filterProps.type.includes(
								'credit'
							)}
						/>
						<p>Credit</p>
					</div>
					<div className={styles.typeItem}>
						<input
							type='checkbox'
							name='type'
							value='debit'
							onChange={(e) => {
								e.target.checked && addType('debit');
								!e.target.checked && removeType('debit');
							}}
							checked={filterProps.type.includes(
								'debit'
							)}
						/>
						<p>Debit</p>
					</div>
					<div className={styles.typeItem}>
						<input
							type='checkbox'
							name='type'
							value='Plan'
							onChange={(e) => {
								e.target.checked &&
									addType('planpurchase');
								!e.target.checked &&
									removeType('planpurchase');
							}}
							checked={filterProps.type.includes(
								'planpurchase'
							)}
						/>
						<p>Plan</p>
					</div>
				</div>
			</div>
			<div
				className={styles.submit}
				onClick={() => {
					validateFilter();
				}}
			>
				<div>Apply</div>
				<FaCheckCircle />
			</div>
		</div>
	);
};

export default FilterModal;
