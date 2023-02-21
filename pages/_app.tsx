import '../styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}
