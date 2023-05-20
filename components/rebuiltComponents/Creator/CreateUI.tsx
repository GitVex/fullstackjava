import React, { useState, useMemo } from 'react';

function CreateUI() {
	const [url, setUrl] = useState('');
	const [tags, setTags] = useState('');

	const [focussedVideo, setFocussedVideo] = useState({});

	const unfocusUrlFieldHandler = async (e: React.FocusEvent<HTMLInputElement>) => {

		const url = e.target.value;

		/* Check if yt video url is valid */
		/* If valid, set url state */
		const re =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:\S+&)?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

		console.log(re.test(url));

		if (re.test(url)) {
			/* fetch video infos from oembed */

			setUrl(url);

			const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
			const data = await fetch(oembedUrl).then((res) => res.json());

			setFocussedVideo(data);
		}
	};

	return (
		<main className='flex h-full w-full flex-col gap-2 p-6'>
			<section className='h-1/3 w-full rounded bg-emerald-500/25'>
				<div className='h-full w-full p-2'>
					<form className='flex h-full w-full flex-col items-start gap-2'>
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
								className='rounded bg-emerald-800/50 p-1'
								onBlur={unfocusUrlFieldHandler}
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
								className='rounded bg-emerald-800/50 p-1'
							/>
						</fieldset>
						<button className='rounded bg-emerald-800/50 p-1'>
							Submit
						</button>
					</form>
				</div>
			</section>
			<section className='h-1/3 w-full rounded bg-amber-500/25' />
			<section className='h-1/3 w-full rounded bg-indigo-500/25' />
		</main>
	);
}

export default CreateUI;
