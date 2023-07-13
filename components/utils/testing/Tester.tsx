import { get } from 'http';
import React, { useState, useEffect } from 'react';
import { videoData } from '../../rebuiltComponents/Creator/CreateUI';
// @ts-ignore
import ColorThief from 'colorthief';

function Tester() {
	const [link, setLink] = useState('');
	const [videoData, setVideoData] = useState({} as videoData);

	console.log('Color Thief is: ', ColorThief);

	const handleSubmit = (e: React.FormEventHandler<HTMLFormElement>) => {
		//@ts-ignore
		e.preventDefault();
		//@ts-ignore
		setLink(e.target.url.value);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setLink(e.target.value);
	};

	const validateUrl = (url: string) => {
		const re = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
		return re.test(url);
	};

	const fetchVideoInfo = async (url: string) => {
		const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
		const data = await fetch(oembedUrl).then((res) => res.json());
		data.html = data.html
			.replace(/width="\d+"/, 'width="100%"')
			.replace(/height="\d+"/, 'height="113"');
		return data;
	};

	const getVideoData = async (url: string) => {
		const data = await fetchVideoInfo(url);
		setVideoData(data);
	};

	const getColorFromThumbnail = async (url: string) => {
		const img = new Image();
		img.src = url;

		ColorThief.default.getColor(img).then((color: any) => {
			console.log('color is: ', color);
		});
	};

	useEffect(() => {
		if (!link) {
			setVideoData({} as videoData);
			return;
		} else if (validateUrl(link)) {
			getVideoData(link);
		}
	}, [link]);

	useEffect(() => {
		console.log('videoData set to: ', videoData);
		getColorFromThumbnail(videoData.thumbnail_url);
	}, [videoData]);

	return (
		<div className='flex h-screen w-screen flex-col place-content-center place-items-center'>
			{/* @ts-ignore */}
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='url'
					id='url'
					className='w-96 rounded-sm '
					onBlur={handleBlur}
				/>
				<button type='submit' hidden>
					Submit
				</button>
			</form>
			{videoData && <img src={videoData.thumbnail_url} />}
		</div>
	);
}

export default Tester;
