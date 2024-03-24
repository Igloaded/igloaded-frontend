import instagramGetUrl from 'instagram-url-direct';

const getlink = async () => {
	let links = await instagramGetUrl(
		'https://www.instagram.com/tv/CdmYaq3LAYo/'
	);

	console.log(links);
};

getlink();
