import { prisma } from '../rebuilt/prismaClientProvider';
import { track } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// first get all track urls
	const all_entries = await prisma.track.findMany({
		select: {
			id: true,
			url: true,
		},
	});

    // go through each track and check if it is region blocked. Use Promise.all to make it faster
    let unavailable_urls = await Promise.all(
        all_entries.map(async (entry) => {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${entry.url.split("?v=")[1]}&key=${process.env.YOUTUBE_API_KEY}`
            );
            const data = await response.json();

            if (data.items[0]?.contentDetails?.regionRestriction?.blocked) {
                return {...entry, ...data.items[0].contentDetails.regionRestriction};
            } else {
                return 'valid';
            }
        })
    );

    // filter out all valid urls
    unavailable_urls = unavailable_urls.filter((url) => url !== 'valid');

	return res.status(200).json(unavailable_urls);

    const deleted_entries = await Promise.all(
        unavailable_urls.map(async (entry) => {
            return await prisma.track.delete({
                where: {
                    id: entry.id
                }
            })
        })
    )

    // create new log entry to document the deletion
    await prisma.log.create({
        data: {
            type: 'cron',
            message: `Deleted ${deleted_entries.length} entries`,
            deleted:
                deleted_entries.length > 0
                    ? deleted_entries.map((entry) => entry.id)
                    : null,
        },
    });

	res.status(200).end('Hello Cron!');
}
