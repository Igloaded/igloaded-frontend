import { toast } from 'react-toastify';

const toastprops = {
	position: 'bottom-right',
	autoClose: 3000,
	closeOnClick: true,
	pauseOnHover: true,
	progress: undefined,
	theme: 'light',
};

export const showMsg = (msg, type) => {
	if (type === 'error') {
		return toast.error(msg, toastprops);
	} else if (type === 'success') {
		return toast.success(msg, toastprops);
	} else if (type === 'info') {
		return toast.info(msg, toastprops);
	} else if (type === 'warning') {
		return toast.warning(msg, toastprops);
	}
	toast.success(msg, toastprops);
};

export const formatNumber = (num) => {
	const res = parseInt(num);
	return res.toLocaleString('en-IN');
};

export function epochCurrent(type) {
	switch (type) {
		case 'ms':
			return Date.now();
		case 's':
			return Math.floor(new Date().getTime() / 1000);
		case 'm':
			return Math.floor(
				new Date().getTime() / 1000 / 60
			);
		case 'h':
			return Math.floor(
				new Date().getTime() / 1000 / 60 / 60
			);
		case 'd':
			return Math.floor(
				new Date().getTime() / 1000 / 60 / 60 / 24
			);
		case 'w':
			return Math.floor(
				new Date().getTime() / 1000 / 60 / 60 / 24 / 7
			);
		case 'y':
			return Math.floor(
				new Date().getTime() /
					1000 /
					60 /
					60 /
					24 /
					365
			);
		default:
			return new Date().getTime();
	}
}

export const addToEpoch = (days) => {
	const epochTime = Math.floor(
		new Date().getTime() / 1000
	);
	const hoursToAdd = days * 24;
	const newEpochTime =
		epochTime + hoursToAdd * 60 * 60;
	return newEpochTime * 1000;
	// days is a number
	// returns epoch in ms
};

export const modifyAddToEpoch = (epoch, days) => {
	const epochTime = epoch;
	const hoursToAdd = days * 24;
	const newEpochTime =
		epochTime + hoursToAdd * 60 * 60 * 1000;
	return newEpochTime;
};

export const epochToDate = (epoch, type) => {
	let date;
	if (type == 'ms') {
		date = new Date(epoch);
	} else if (type == 's') {
		date = new Date(epoch * 1000);
	} else if (!type) {
		throw new Error('Type expected');
	} else {
		throw new Error('Invalid type');
	}
	return date.toLocaleString('en-In', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	});
};

export const epochToDateLocale = (
	epoch,
	type
) => {
	let date;
	if (type == 'ms') {
		date = new Date(epoch);
	} else if (type == 's') {
		date = new Date(epoch * 1000);
	} else if (!type) {
		throw new Error('Type expected');
	} else {
		throw new Error('Invalid type');
	}
	const options = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	};
	const formattedDate = date.toLocaleDateString(
		'en-IN',
		options
	);
	return formattedDate;
};

export const readFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			let content = event.target.result;
			let lines = content.split('\n');

			// Trim beginning and trailing empty lines
			while (lines.length && !lines[0].trim())
				lines.shift();
			while (
				lines.length &&
				!lines[lines.length - 1].trim()
			)
				lines.pop();

			const instagramUrlRegex =
				/^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/?.*/i;
			lines = lines.filter((line) =>
				instagramUrlRegex.test(line)
			);

			// Join the lines back together
			content = lines.join('\n');

			// Create a Blob from the content
			const blob = new Blob([content], {
				type: 'text/plain',
			});

			resolve({ data: blob, totalLines: lines });
		};
		reader.onerror = (err) => {
			reject(err);
		};
		reader.readAsText(file);
	});
};
