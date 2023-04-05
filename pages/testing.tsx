import React, { useState, useEffect, useContext } from "react";
import WindowWidthContext from "../components/contexts/WindowWidthProvider";

function testing() {

	const [isOpenPlayer, setIsOpenPlayer] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [isOpenFilter, setIsOpenFilter] = useState(false);

	useEffect(() => {
		console.log(isOpenCreate, isOpenPlayer, );
	}, [isOpenCreate, isOpenPlayer, isOpenFilter]);

	const context = useContext(WindowWidthContext);
	const windowWidth = context?.windowWidth;

	return (
		<div className="h-screen">
			<div className="flex h-full flex-col gap-6 p-6">
				<div className="flex w-full  flex-row justify-between">
					<div className="place-self-start" onClick={() => setIsOpenCreate(prevIsOpenCreate => !prevIsOpenCreate)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-6 w-6 cursor-pointer text-[#FF0000]"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</div>

					<div className="flex justify-center" onClick={() => (setIsOpenPlayer(prevIsOpenPlayer => !prevIsOpenPlayer))}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-6 w-6 scale-x-[350%] cursor-pointer text-[#FF0000]"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</div>

					<div className="relative flex flex-row gap-2 place-self-end text-center">
						{windowWidth !== null &&
						windowWidth !== undefined &&
						windowWidth > 768 ? (
							<p className="absolute -left-60 cursor-default opacity-50">
								Looking for something specific?
							</p>
						) : null}

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-6 w-6 cursor-pointer text-[#FF0000]"
							onClick={() => (setIsOpenFilter(prevIsOpenFilter => !prevIsOpenFilter))}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
							/>
						</svg>
					</div>
				</div>

				<div className="flex w-full flex-grow flex-row gap-6">
					{(() => {
						if (windowWidth !== null && windowWidth !== undefined) {
							if (windowWidth >= 1024) {
								return (
									<>
										<div className="w-1/4 rounded bg-slate-500/25" />
										<div className="w-1/4 rounded bg-slate-500/25" />
										<div className="w-1/4 rounded bg-slate-500/25" />
										<div className="w-1/4 rounded bg-slate-500/25" />
									</>
								);
							} else if (windowWidth >= 768) {
								return (
									<>
										<div className="w-1/3 rounded bg-slate-500/25" />
										<div className="w-1/3 rounded bg-slate-500/25" />
										<div className="w-1/3 rounded bg-slate-500/25" />
									</>
								);
							} else if (windowWidth >= 640) {
								return (
									<>
										<div className="w-1/2 rounded bg-slate-500/25" />
										<div className="w-1/2 rounded bg-slate-500/25" />
									</>
								);
							} else {
								return (
									<>
										<div className="w-full rounded bg-slate-500/25" />
									</>
								);
							}
						}
					})()}
				</div>
			</div>
		</div>
	);
}

export default testing;
