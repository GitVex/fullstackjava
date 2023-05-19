import { prisma } from '../rebuilt/prismaClientProvider';
import { track } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// first get all track urls
	const allTracks = await prisma.track.findMany({
		select: {
			id: true,
			url: true,
		},
	});

	// go through each track and check if it is region blocked. Use Promise.all to make it faster
	let regionBlockedTracks = await Promise.all(
		allTracks.map(async (entry) => {
			const response = await fetch(
				`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${
					entry.url.split('?v=')[1]
				}&key=${process.env.YOUTUBE_API_KEY}`
			);
			const data = await response.json();

			if (data.items[0]?.contentDetails?.regionRestriction?.blocked) {
				return {
					...entry,
					...data.items[0].contentDetails.regionRestriction,
				};
			} else {
				return 'valid';
			}
		})
	);

	// filter out all valid urls
	regionBlockedTracks = regionBlockedTracks.filter((url) => url !== 'valid' && url.blocked.length > 2);

	//test wise
	const tracksToBeDeleted = regionBlockedTracks;

	// create new log entry to document the deletion
	await prisma.log.create({
		data: {
			time: new Date(),
			type: 'cron',
			message: `Deleted ${tracksToBeDeleted.length} entry(s)`,
			history: JSON.stringify(tracksToBeDeleted),
		},
	});

	const deletedTracks = await Promise.all(
        tracksToBeDeleted.map(async (entry) => {
            return await prisma.track.delete({
                where: {
                    id: entry.id
                }
            })
        })
    )

	res.status(200).json(deletedTracks);
}
