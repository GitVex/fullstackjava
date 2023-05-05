import React, { useState, useEffect, useContext } from 'react';
import WindowSizeContext from '../contexts/WindowSizeProvider';
import Create from './Create';
import { breakpoints } from '../utils/breakpoints';
import FilterSideMenu from './Filter/FilterSideMenu';
import { Viewer } from './Viewer/Viewer';
import { ViewColumn } from './Viewer/ViewColumn';
import FilterStateProvider from '../contexts/RebuiltFilterStateProvider';
import CreateSideMenu from './Creator/CreateSideMenu';

function PageComponent() {
	const [isOpenPlayer, setIsOpenPlayer] = useState(false);

	const context = useContext(WindowSizeContext);
	const windowWidth = context?.windowWidth;
	const windowHeight = context?.windowHeight;
	  
	  function renderDivs() {
		function renderViewColumn(widthClass: string, type?: string) {
			return (
			  <ViewColumn
				className={`${widthClass} overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-indigo-900/25`}
				style={
				  windowHeight
					? { height: windowHeight - 4 * 24 }
					: { height: '100%' }
				}
				type={type}
			  />
			);
		  }

		if (windowWidth) {
		  let widthClass: string;
		  let columns: string[];
	  
		  if (windowWidth >= breakpoints.lg) {
			widthClass = 'w-1/4';
			columns = ['new', 'filter', 'trend', 'owned'];
		  } else if (windowWidth >= breakpoints.md) {
			widthClass = 'w-1/3';
			columns = ['new', 'filter', 'trend'];
		  } else if (windowWidth >= breakpoints.sm) {
			widthClass = 'w-1/2';
			columns = ['filter', 'new'];
		  } else {
			widthClass = 'w-full';
			return renderViewColumn(widthClass);
		  }
	  
		  return (
			<>
			  {columns.map((columnType) => renderViewColumn(widthClass, columnType))}
			</>
		  );
		}
	  }
	  

	return (
		<div className='h-screen overflow-hidden'>
			<div className='flex h-full flex-col gap-6 p-6'>
				<FilterStateProvider>
					<div className='flex w-full flex-row justify-between'>
						<CreateSideMenu />

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
								className='h-6 w-6 scale-x-[350%] cursor-pointer text-red-600'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 8.25l-7.5 7.5-7.5-7.5'
								/>
							</svg>
						</div>

						<FilterSideMenu />
					</div>

					<Viewer className={`flex w-full flex-1 flex-row gap-6`}>
						{renderDivs()}
					</Viewer>
				</FilterStateProvider>
			</div>
		</div>
	);
}

export default PageComponent;
