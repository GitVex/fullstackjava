import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { WindowSizeProvider } from "../components/contexts/WindowSizeProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<WindowSizeProvider>
				<Component {...pageProps} />
			</WindowSizeProvider>
			<Analytics />
		</>
	);
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
	console.log(metric);
}
