import { prisma } from '../../../utils/prismaClientProvider';
import { buildQuery } from '../../../utils/separateTags';
import { getAverageColor } from './calculateColor';
import { NextApiRequest, NextApiResponse } from 'next';
import { IVideoData } from '../../../components/Creator/types/IVideoData';

type track_data = IVideoData & {
    tags: string;
    url: string;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { title, author_name, url, provider_url, tags, thumbnail_url } = req.body as track_data;
    // console.log(`title: ${title}\n author_name: ${author_name}\n url: ${url}\n provider_url: ${provider_url}\n tags: ${tags}\n thumbnail_url: ${thumbnail_url}`);

    const connectOrCreateQuery = buildQuery(tags);
    let track_color = '#000000';
    let luminance = 0;
    try {
        const color_data = await getAverageColor(thumbnail_url);
        track_color = color_data.color;
        luminance = color_data.luminance;
    } catch (e) {
        console.log(`error processing ${thumbnail_url} | ${e}`);
    }

    // Separate Prisma call to handle the artist
    let artist;
    try {
        artist = await prisma.artist.upsert({
            where: { name: author_name },
            update: {},
            create: { name: author_name },
        });
    } catch (e) {
        console.log(`Error handling artist creation/upsert: ${e}`);
        res.status(500).json({ error: 'Error processing artist data' });
        return;
    }

    try {
        const createTrack = await prisma.track.create({
            data: {
                title: title,
                url: url,
                platform: provider_url,
                luminance: luminance,
                color: track_color,
                tags: {
                    connectOrCreate: connectOrCreateQuery,
                },
                artist: {
                    connect: { artist_id: artist.artist_id },
                },
            },
            include: {
                tags: true,
                artist: true,
            },
        });

        res.json(createTrack);
    } catch (e) {
        console.log(`Error creating track: ${e}`);
        res.status(500).json({ error: 'Error creating track' });
    }
}