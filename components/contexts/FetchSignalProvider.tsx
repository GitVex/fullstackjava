import React, { useContext, useState, useEffect } from 'react'

const FetchSignalContext = React.createContext({})
const FetchSignalUpdateContext = React.createContext({})

export function useFetchSignal() {
    return useContext(FetchSignalContext)
}

export function useFetchSignalUpdate() {
    return useContext(FetchSignalUpdateContext)
}
export function FetchSignalProvider({ children }: any) {

    const [refetchSignal, setRefetchSignal] = useState(false)

    function pingRefetch() {
        setRefetchSignal(refetchSignal => !refetchSignal)
    }

    useEffect(() => {
        console.log('[Global] refetchSignal pinged')
    }, [refetchSignal])

    return (
        <FetchSignalContext.Provider value={refetchSignal}>
            <FetchSignalUpdateContext.Provider value={pingRefetch}>
                {children}
            </FetchSignalUpdateContext.Provider>
        </FetchSignalContext.Provider>

    )
}

export default FetchSignalProvider