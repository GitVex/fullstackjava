import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prismaClientProvider";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // Query the database
    const result = await prisma.track.findMany({});

    // randomize the result order
    const seed = Math.random();
    result.sort(() => seed - 0.5);

    console.log("Randomized with seed: " + seed);

    res.status(200).json(result);
}
