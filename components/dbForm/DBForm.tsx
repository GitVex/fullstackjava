import React from 'react'
import Creator from './Creator'
import Viewer from './Viewer'
import { FilterStateProvider } from '../contexts/FilterStateProvider'

function DBForm() {
    return (
        <FilterStateProvider>
            <div className='flex flex-col xl:flex-row xl:place-content-between max-md:my-4 items-center w-screen h-screen bg-gradient-to-tr dark:from-darknavy-600'>
                <div className='flex flex-col xl:basis-1/2 items-center place-content-center'>
                    <Creator />
                </div>
                <div className='flex flex-col xl:basis-1/2 items-center place-content-center'>
                    <Viewer />
                </div>
            </div>
        </FilterStateProvider>
    )
}

export default DBForm