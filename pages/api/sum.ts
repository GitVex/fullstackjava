/* query the database and get the total amount of tracks */
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const tracks = await prisma.track.count()
    res.json({ tracks })
}