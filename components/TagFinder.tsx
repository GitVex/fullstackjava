import React from 'react'
import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'

function TagFinder(props: { filterState: any, setFilterState: any }) {

    const { filterState, setFilterState } = props
    const [availableTags, setAvailableTags] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        console.log(search)
    }, [search])

    const callbackRequest = async () => {

        // apend the filterState to the request body
        const response = await fetch('/api/tagsRetry', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filter: filterState })
        })

        const data = await response.json()
        // update the available tags if the response is not the same as the current state
        if (JSON.stringify(data) !== JSON.stringify(availableTags)) {
            setAvailableTags(data)
        }
        return data
    }

    const { isLoading, error, data } = useQuery('tags', callbackRequest, { refetchInterval: 1000 })

    const updateFilter = async (e: any) => {
        const { name } = e.target
        if (!filterState.includes(name)) {
            const temp = [...filterState, name]
            setFilterState(temp)
        } else {
            const temp = filterState.filter((tag: any) => tag !== name)
            setFilterState(temp)
        }

        await callbackRequest()
    }

    return (
        <form className='flex flex-row flex-wrap gap-2 w-[40rem] h-64 bg-gray-700/20 p-2 rounded' >
            <div className='flex flex-col gap-2 items-start' onChange={updateFilter}>
                <div key="ambience" className='flex flex-row gap-1 px-2 rounded bg-gray-800/50'>
                    <input type='checkbox' name="ambience" id="AmbienceBox" />
                    <label htmlFor="AmbienceBox" className='w-1/6'>Ambience</label>
                </div>
                <div key="music" className='flex flex-row gap-1 px-2 rounded bg-gray-800/50'>
                    <input type='checkbox' name="music" id="MusicBox" />
                    <label htmlFor="MusicBox" className='w-1/6'>Music</label>
                </div>
                <div key="standalone" className='flex flex-row gap-1 px-2 rounded bg-gray-800/50'>
                    <input type='checkbox' name="standalone" id="StandaloneBox" />
                    <label htmlFor="StandaloneBox" className='w-1/6'>Standalone</label>
                </div>
            </div>
            <div className='w-1 h-auto border-l-2 border-gray-800/50'></div>
            <div className="flex flex-col gap-2 h-full w-[78%]">
                <div className='w-auto h-1/6'>
                    <input type="text" className='p-2 w-full h-full rounded bg-gray-800/50' placeholder="Search..." onChange={ (e) => { setSearch(e.target.value) } }/>
                </div>
                <div className='flex flex-col gap-2 items-start flex-wrap h-5/6 w-full overflow-x-scroll' onChange={updateFilter}>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        //@ts-ignore
                        <div>Error: {error.message}</div>
                    ) : (
                        <>
                            {availableTags.map((tag: any) => (
                                tag.name.includes(search) ? <div key={tag.name} className='flex flex-row gap-1 px-2 rounded bg-gray-800/50'>
                                    <input type='checkbox' name={tag.name} id={tag.name + "Box"} />
                                    <label htmlFor={tag.name + "Box"} className='w-1/6'>{tag.name}</label>
                                </div>
                            : null) )}
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}

export default TagFinder