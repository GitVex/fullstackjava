import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import DBForm from '../components/dbForm/DBForm'

function second() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <DBForm />
        </QueryClientProvider>
    )
}

export default second