import React from 'react'
import { useState, useEffect } from 'react'

function third() {

    const [tags, setTags] = useState([])
    const [title, setTitle] = useState('')

    const callbackRequest = async (data: any) => {
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

    const callbackSubmit = async (event: any) => {
        event.preventDefault()
        const rURL = event.target.link.value

        const urlStripped = rURL.split('&')[0]
        const qURL = `https://www.youtube.com/oembed?url=${urlStripped}&format=json`

        const response = await fetch(qURL)
        const res = await response.json()

        const title = res.title
        const author = res.author_name

        callbackRequest({ prompt: { title: title, artist: author } }).then((tags: any) => {
            // replace quotes, \n and \r with nothing
            tags = tags.replace(/['"]+/g, '')
            tags = tags.replace(/[\n\r]+/g, '')
            // split the string into an array
            tags = tags.split(',')
            setTags(tags)
            setTitle(title)
        }
        )
    }

    return (
        <div className='flex flex-col place-content-center items-center h-screen gap-2 bg-gradient-to-tr dark:from-darknavy-600'>
            <h1>Tag generator</h1>
            <p className=''>
                Want to create some tags? Paste a link to get started!
            </p>
            <form onSubmit={callbackSubmit} className='flex flex-col gap-2'>
                <input name='link' type='text' placeholder='Paste a link here' className='p-1 rounded w-[30rem]' />
                <button type='submit' hidden>Generate</button>
            </form>
            <p className=''>Some Tags for your Title '{title}':</p>
            <div className='flex flex-row gap-2'>
                {tags.map((tag: any) => (
                    <p key={tag} className="font-mono bg-gray-800/50 p-1 px-2 rounded-full text-center font-extralight text-gray-200/80" >{tag}</p>
                ))}
            </div>
        </div>
    )
}

export default third