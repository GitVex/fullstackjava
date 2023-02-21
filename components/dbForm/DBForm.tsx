import React from 'react'
import Creator from './Creator'
import Viewer from './Viewer'
import { FilterStateProvider } from '../contexts/FilterStateProvider'

function DBForm() {
    return (
        <FilterStateProvider>
            <div className='flex flex-col xl:flex-row p-4 items-center place-content-center h-full'>
                <div className='flex flex-col xl:basis-1/2 items-center place-content-center w-full'>
                    <Creator />
                </div>
                <div className='flex flex-col xl:basis-1/2 items-center place-content-center w-full'>
                    <Viewer />
                </div>
            </div>
        </FilterStateProvider>
    )
}

export default DBForm