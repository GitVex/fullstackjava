import React, { useContext } from "react";
import { motion } from "framer-motion";
import WindowWidthContext from "../contexts/WindowWidthProvider";

interface Props {
	children?: React.ReactNode;
	state: boolean;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateSideBar({ children, state, setState }: Props) {
	const context = useContext(WindowWidthContext);
	const windowWidth = context?.windowWidth;

	return (
		<motion.div
			className="absolute flex flex-row gap-6 place-self-start left-0"
			animate={
				state
					? { x: 0 }
					: {	x: windowWidth ? -1 * Math.round((windowWidth - 48) / 2) : "auto" }
			}
		>
			<div
				style={{
					width: windowWidth
						? Math.round((windowWidth - 48) / 2)
						: "auto",
				}}

                className="h-56 backdrop-blur-md"
			>
				{children}
			</div>

			<div
				className=""
				onClick={() => setState((prevState) => !prevState)}
			>
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
		</motion.div>
	);
}

export default CreateSideBar;
