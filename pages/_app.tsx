import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { WindowWidthProvider } from "../components/contexts/WindowWidthProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<WindowWidthProvider>
				<Component {...pageProps} />
			</WindowWidthProvider>
			<Analytics />
		</>
	);
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.log(metric);
}
