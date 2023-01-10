// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: 'John Doe' })
}

export default function whichBtn(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = req.body.name

    if (body === 'btn1') {
        res.status(200).json({ name: 'soul of btn1' })
    } else if (body === 'btn2') {
        res.status(200).json({ name: 'soul of btn2' })
    } else if (body === 'btn3'){
        res.status(200).json({ name: 'soul of btn3' })
    } else {
        res.status(200).json({ name: 'what?' })
    }
}
