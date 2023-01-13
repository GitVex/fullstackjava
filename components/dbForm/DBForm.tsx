import React from 'react'
import Creator from './Creator'
import Viewer from './Viewer'
import { FetchSignalProvider } from '../contexts/FetchSignalProvider'
import { FilterStateProvider } from '../contexts/FilterStateProvider'

function DBForm() {
    return (
        <FilterStateProvider>
            <FetchSignalProvider>
                <div className='flex items-center h-screen place-content-around bg-gradient-to-tr dark:from-darknavy-600'>
                    <div className='flex basis-1/2 items-center place-content-center'>
                        <Creator />
                    </div>
                    <div className='flex flex-col basis-1/2 items-center place-content-center'>
                        <Viewer />
                    </div>
                </div>
            </FetchSignalProvider>
        </FilterStateProvider>
    )
}

export default DBForm