import React from 'react'
import { useState } from 'react'
import TagFinder from '../TagFinder'
import Affirmator from '../utils/Affirmator'

function Creator() {

    const [tags, setTags] = useState([])
    const [title, setTitle] = useState('')
    const [affirmState, setAffirmState] = useState(false)
    const [isPresent, setIsPresent] = useState(false)

    const callbackRequest = async (data: any) => {
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            setAffirmState(true)
        } else {
        }

    }

    const callbackSubmit = async (event: any) => {
        event.preventDefault()

        // query youtube oembed api
        const qUrl = event.target.url.value.split('&')[0]
        const response = await fetch(`https://www.youtube.com/oembed?url=${qUrl}&format=json`)
        const { title, author_name, provider_name } = await response.json()

        callbackRequest({
            title: title,
            artist: author_name,
            url: qUrl,
            platform: provider_name,
            tags: event.target.tags.value
        })
    }

    const callbackRequestTagRecommendation = async (data: any) => {
        const response = await fetch('/api/tagging', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const tags = await response.json()
        return tags
    }

    const callbackOnBlur = async (event: any) => {
        event.preventDefault()
        const rURL = event.target.value
        if (rURL === '') { setTitle(''); setTags([]); setIsPresent(false); return }

        const urlStripped = rURL.split('&')[0]
        const qURL = `https://www.youtube.com/oembed?url=${urlStripped}&format=json`

        const response = await fetch(qURL)
        const res = await response.json()

        const title = res.title
        setTitle(title)
        const author = res.author_name

        callbackRequestTagRecommendation({ prompt: { title: title, artist: author } }).then((tags: any) => {
            // replace quotes, \n and \r with nothing
            tags = tags.replace(/['"]+/g, '')
            tags = tags.replace(/[\n\r]+/g, '')
            // split the string into an array
            tags = tags.split(',')
            setTags(tags)
        }
        )

        // check if the track is already in the database
        const responseCheck = await fetch('/api/presenceCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlStripped })
        })

        const resCheck = await responseCheck.json()
        setIsPresent(resCheck.status)
    }

    return (
        <div className='flex flex-col gap-2 w-full items-center'>
            <h1>Creator</h1>
            <form autoComplete='off' onSubmit={callbackSubmit} className='flex flex-col gap-4 w-11/12'>
                <p>You are looking at {title ? `"${title}"` : '...nothing!'}{isPresent ? <em className='text-red-800'>, its already in here!</em> : ''}</p>
                <div className=' flex flex-row gap-2 w-auto'>
                    <label htmlFor='url' className='w-1/6'>URL</label>
                    <input onBlur={callbackOnBlur} type='text' name='url' id='url' className='p-1 rounded bg-gray-800/50 grow' />
                </div>
                <div className='flex flex-row gap-2'>
                    <label htmlFor='tags' className='w-1/6'>Tags</label>
                    <input type='text' name='tags' id='tags' className='p-1 rounded bg-gray-800/50 grow' />
                </div>
                <div className='flex flex-row flex-wrap gap-2 content-center'>
                    <p> Recommended Tags: </p>
                    {tags.map((tag: any) => (
                        <p key={tag} className='font-mono bg-gray-800/50 p-1 px-2 rounded-full text-center font-extralight text-gray-200/80'> {tag} </p>
                    ))}
                </div>
                <div className='flex flex-row gap-2 place-items-center'>
                    <button type='submit' className='p-2 rounded bg-gray-800/50 w-fit hover:bg-gray-800/80 duration-100'>Submit</button>
                    <Affirmator affirmState={affirmState} setAffirmState={setAffirmState} />
                </div>
            </form>
            <h1>Filters</h1>
            <TagFinder />
        </div>
    )
}

export default Creator