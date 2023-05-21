import { prisma } from './prismaClientProvider';
import { track, log } from '@prisma/client';
import { buildQuery } from '../../../utils/seperateTags';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const { title, author_name, url, platform, tags } = req.body;

    const connectOrCreateQuery = buildQuery(tags);

    console.log(title, author_name, url, platform, tags, connectOrCreateQuery);
    return res.json(req.body);

    const createTrack = await prisma.track.create({
        data: {
            title: title,
            artist: author_name,
            url: url,
            platform: platform,
            tags: {
                connectOrCreate: connectOrCreateQuery,
            },
        },
        include: {
            tags: true,
        },
    });

    /* log the creation of a new track */
    const logNewTrack = await prisma.log.create({
        data: {
            time: new Date(),
            type: 'create',
            message: `Created new track: ${title} by ${artist}`,
            history: JSON.stringify(createTrack),
        },
    });


    res.json(createTrack);
}