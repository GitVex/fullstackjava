import React from 'react';

function CreateUI() {
	return (
		<div className='flex h-full w-full flex-col gap-2 p-6'>
			<div className='h-1/3 w-full rounded bg-emerald-500/25'>
				<div className='h-full p-2'>
					<form className='grid h-fit grid-cols-[1fr,7fr] grid-rows-2 gap-2'>
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
					</form>
				</div>
			</div>
			<div className='h-1/3 w-full rounded bg-amber-500/25' />
			<div className='h-1/3 w-full rounded bg-indigo-500/25' />
		</div>
	);
}

export default CreateUI;
