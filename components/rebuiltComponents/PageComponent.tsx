import React, { useState, useEffect, useContext } from 'react';
import WindowSizeContext from '../contexts/WindowSizeProvider';
import Create from './Create';
import { breakpoints } from './breakpoints';
import Filter from './Filter';
import { Viewer } from './Viewer/Viewer';
import { ViewColumn } from './Viewer/ViewColumn';

function PageComponent() {
	const [isOpenPlayer, setIsOpenPlayer] = useState(false);

	useEffect(() => {
		console.log(isOpenPlayer);
	}, [isOpenPlayer]);

	const context = useContext(WindowSizeContext);
	const windowWidth = context?.windowWidth;
	const windowHeight = context?.windowHeight;

	function renderDivs() {
		if (windowWidth) {
			let numberOfDivs: number, widthClass: string;

			if (windowWidth >= breakpoints.lg) {
				widthClass = 'w-1/4';
				return (
					<>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='new'
						/>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='trend'
						/>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='filter'
						/>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='owned'
						/>
					</>
				);
			} else if (windowWidth >= breakpoints.md) {
				widthClass = 'w-1/3';
				return (
					<>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='new'
						/>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='filter'
						/>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='trend'
						/>
					</>
				);
			} else if (windowWidth >= breakpoints.sm) {
				widthClass = 'w-1/2';
				return (
					<>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
						/>
						<ViewColumn
							className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
							style={
								windowHeight
									? { height: windowHeight - 4 * 24 }
									: { height: '100%' }
							}
							type='trend'
						/>
					</>
				);
			} else {
				widthClass = 'w-full';
				return (
					<ViewColumn
						className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-slate-500/25`}
						style={
							windowHeight
								? { height: windowHeight - 4 * 24 }
								: { height: '100%' }
						}
					/>
				);
			}
		}
	}

	return (
		<div className='h-screen overflow-hidden'>
			<div className='flex h-full flex-col gap-6 p-6'>
				<div className='flex w-full flex-row justify-between'>
					<Create />

					<div
						className='flex justify-center'
						onClick={() =>
							setIsOpenPlayer(
								(prevIsOpenPlayer) => !prevIsOpenPlayer
							)
						}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-6 w-6 scale-x-[350%] cursor-pointer text-[#FF0000]'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19.5 8.25l-7.5 7.5-7.5-7.5'
							/>
						</svg>
					</div>

					<Filter />
				</div>

				<Viewer className={`flex w-full flex-1 flex-row gap-6`}>
					{renderDivs()}
				</Viewer>
			</div>
		</div>
	);
}

export default PageComponent;
