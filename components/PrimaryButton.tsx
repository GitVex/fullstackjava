import React from 'react'

function PrimaryButton(props: { id: string, callback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, color?: string }) {

    const id = props.id
    const callback = props.callback
    let color = props.color ? props.color : 'bg-blue-500'

    // find the number at the end of the color string by getting everything after the third hyphen
    // then add 200 to it to get the hover color
    const hoverColor = color.slice(0, color.length - 3) + (parseInt(color.slice(color.length - 3, color.length)) + 200)

    return (
        <button id={id} onClick={callback} className={ color + ' ' + 'hover:' + hoverColor + ' text-white font-bold py-2 px-4 rounded duration-100'}>
            {id} here
        </button>
    )
}

export default PrimaryButton