import React from 'react'
import { useState } from 'react'
import TagFinder from '../TagFinder'

function Creator() {

    const [tags, setTags] = useState([])
    const [title, setTitle] = useState('')

    const callbackRequest = async (data: any) => {
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const res = await response.json()
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

    const callbackTagRecommendations = async (event: any) => {
        event.preventDefault()
        const rURL = event.target.value
        if (rURL === '') { setTitle(''); setTags([]); return }

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


    }

    return (
        <div className='flex flex-col gap-2'>
            <h1>Creator</h1>
            <form autoComplete='off' onSubmit={callbackSubmit} className='flex flex-col gap-4 w-[37rem]'>
                <p>You are looking at {title ? `"${title}"` : '...nothing!'}</p>
                <div className='flex flex-row gap-2'>
                    <label htmlFor='url' className='w-1/6'>URL</label>
                    <input onBlur={callbackTagRecommendations} type='text' name='url' id='url' className='grow p-1 rounded bg-gray-800/50' />
                </div>
                <div className='flex flex-row gap-2'>
                    <label htmlFor='tags' className='w-1/6'>Tags</label>
                    <input type='text' name='tags' id='tags' className='grow p-1 rounded bg-gray-800/50' />
                </div>
                <div className='flex flex-row gap-2 content-center'>
                    <p> Recommended Tags: </p>
                    {tags.map((tag: any) => (
                        <p key={tag} className='font-mono bg-gray-800/50 p-1 px-2 rounded-full text-center font-extralight text-gray-200/80'> {tag} </p>
                    ))}
                </div>
                <input type='submit' value='Submit' hidden />    
            </form>
            <h1>Filters</h1>
            <TagFinder />
        </div>
    )
}

export default Creator