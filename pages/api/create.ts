import { PrismaClient } from '@prisma/client';
import { buildQuery, seperateTags } from '../../utils/seperateTags';

const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {

    const connectOrCreateQuery = buildQuery(req.body.tags);

    const createTrack = await prisma.track.create({
        data: {
            title: req.body.title,
            artist: req.body.artist,
            url: req.body.url,
            platform: req.body.platform,
            tags: {
                connectOrCreate: connectOrCreateQuery,
            },
        },
        include: {
            tags: true,
        },
    });

    res.json(createTrack);

}