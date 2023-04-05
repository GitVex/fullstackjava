// WindowWidthContext.tsx
import React, { createContext, useState, useEffect } from "react";

interface WindowWidthContextType {
	windowWidth: number | null;
}

const WindowWidthContext = createContext<WindowWidthContextType | null>(null);

interface WindowWidthProviderProps {
	children: React.ReactNode;
}

export const WindowWidthProvider: React.FC<WindowWidthProviderProps> = ({
	children,
}) => {
	const [windowWidth, setWindowWidth] = useState<number | null>(null);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		handleResize(); // Set initial value on mount
		window.addEventListener("resize", handleResize);

		// Cleanup function: remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<WindowWidthContext.Provider value={{ windowWidth }}>
			{children}
		</WindowWidthContext.Provider>
	);
};

export default WindowWidthContext;
