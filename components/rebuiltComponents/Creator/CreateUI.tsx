import React, { useState, useMemo } from 'react';

interface videoData {
	author_name: string;
	author_url: string;
	height: number;
	html: string;
	provider_name: string;
	provider_url: string;
	thumbnail_height: number;
	thumbnail_url: string;
	thumbnail_width: number;
	title: string;
	type: string;
	version: string;
	width: number;
}

function CreateUI() {
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState('');
	const [isPresent, setIsPresent] = useState(false);

	const [focussedVideo, setFocussedVideo] = useState({} as videoData);

	const validateUrl = (url: string) => {
		const re = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
		console.log(re.test(url));
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

	const unBlurUrlFieldHandler = async (
		e: React.FocusEvent<HTMLInputElement>
	) => {
		const url = e.target.value;

		if (!url) {
			setFocussedVideo({} as videoData);
			return;
		}

		if (validateUrl(url)) {
			setUrl(url);
			checkPresence(url);
			const data = await fetchVideoInfo(url);
			setFocussedVideo(data);
		}
	};

	const checkPresence = async (url: string) => {
		const res = await fetch('/api/rebuilt/presenceCheck', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ url }),
		});
		const presence = await res.json();

		console.log(presence.status);

		setIsPresent(presence.status);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!url) {
			return;
		}

		if (!validateUrl(url)) {
			return;
		}

		console.log(url, tags);

		// make a call to the create endpoint
		const res = await fetch('/api/rebuilt/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// add all data from focusVideo and the tags and url to the body
			body: JSON.stringify({
				...focussedVideo,
				tags,
				url,
			}),
		});

		const data = await res.json();

		console.log(data);

		// if successful, clear the fields
		setUrl('');
		setTags('');
	};

	return (
		<main className='flex h-full w-full flex-col gap-2 p-6'>
			<section className='h-1/3 w-full rounded bg-indigo-500/5'>
				<div className='h-full w-full p-2'>
					<form
						className='flex h-full w-full flex-col items-start gap-2'
						onSubmit={handleSubmit}
					>
						<span className='place-self-center text-center text-2xl font-bold'>
							Creator
						</span>
						<fieldset className='grid h-fit w-full grid-cols-[1fr,7fr] grid-rows-2 gap-2'>
							<label
								htmlFor='url'
								className='text-center align-middle'
							>
								URL
							</label>
							<input
								type='text'
								name='url'
								id='url'
								className='rounded bg-indigo-800/50 p-1'
								onBlur={unBlurUrlFieldHandler}
							/>
							<label
								htmlFor='url'
								className='text-center align-middle'
							>
								Tags
							</label>
							<input
								type='text'
								name='url'
								id='url'
								className='rounded bg-indigo-800/50 p-1'
							/>
						</fieldset>
						<button className='place-self-center rounded bg-indigo-800/50 p-1'>
							Submit
						</button>
					</form>
				</div>
			</section>
			<section className='flex h-1/3 w-full flex-col place-items-center justify-center rounded bg-indigo-500/5 p-2'>
				<span className='order-first text-center text-xl font-bold'>
					You're looking at:
				</span>
				<span className='w-full truncate text-center text-lg'>
					{focussedVideo.title}
				</span>
				<div className='w-fit flex-grow p-2'>
					{focussedVideo && (
						/* insert iframe from focussedVideo.html here */
						<div
							className='h-full w-full'
							dangerouslySetInnerHTML={{
								__html: focussedVideo.html,
							}}
						/>
					)}
				</div>
				<span className='text-md w-full truncate text-center text-red-600'>
						{isPresent && "... It's already in here!"}
					</span>
			</section>
		</main>
	);
}

export default CreateUI;
