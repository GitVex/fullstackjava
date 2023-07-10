import { prisma } from './prismaClientProvider';
import { track } from '@prisma/client';
import Jimp from 'jimp';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getDominantColor(url: string): Promise<Jimp.RGBA> {
	const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`;
	const oembedResponse = await fetch(oembedUrl);
	const oembedJson = await oembedResponse.json();
	const thumbnailUrl = oembedJson.thumbnail_url;

	const image = await Jimp.read(thumbnailUrl);

	const colorCount: Record<string, number> = {};
	let dominantColor = '#000000';
	let maxCount = 0;

	image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
		const red = image.bitmap.data[idx];
		const green = image.bitmap.data[idx + 1];
		const blue = image.bitmap.data[idx + 2];
		const alpha = image.bitmap.data[idx + 3];

		const colorKey = `${red},${green},${blue},${alpha}`;

		if (colorCount[colorKey]) {
			colorCount[colorKey]++;
		} else {
			colorCount[colorKey] = 1;
		}

		if (colorCount[colorKey] > maxCount) {
			maxCount = colorCount[colorKey];
			const dominantColor_rgba  = { r: red, g: green, b: blue, a: alpha };
			const dominantColorInt = Jimp.rgbaToInt(dominantColor_rgba.r, dominantColor_rgba.g, dominantColor_rgba.b, dominantColor_rgba.a);
			dominantColor = `#${dominantColorInt.toString(16).padStart(6, '0')}`;
		}
	});

	console.log(url, dominantColor);

	return dominantColor;
}

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get all entries that don't have a set color field (#000000)
	const tracks = await prisma.track.findMany({
		/* where: {
			color: '#000000',
		}, */
	});

	// for each entry, get the dominant color of the image
	const tracksWithColors = await Promise.all(
		tracks.map(async (track) => {
			console.log(`processing ${track.url}`);
			var dominantColor = '#000000';
			try {
				dominantColor = await getDominantColor(track.url);
			} catch (e) {
				console.log(`error processing ${track.url} | ${e}`);
			}
			return {
				...track,
				color: dominantColor,
			};
		})
	);

	// update the entries with the dominant color
	const updatedTracks = await Promise.all(
		tracksWithColors.map(async (track) => {
			const updatedTrack = await prisma.track.update({
				where: {
					id: track.id,
				},
				data: {
					color: track.color,
				},
			});
			return updatedTrack;
		})
	);

	/* log the update of the tracks */
	const logNewTrack = await prisma.log.create({
		data: {
			time: new Date(),
			type: 'update',
			message: `Updated ${updatedTracks.length} tracks with dominant color`,
			history: JSON.stringify(updatedTracks),
		},
	});

	console.log(`updated ${updatedTracks.length} tracks`);
	res.json(updatedTracks);
}
