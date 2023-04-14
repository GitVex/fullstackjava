import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prismaClientProvider";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    console.log(`list called from: ${req.body.origin}`)

    // Query the database
    const result = await prisma.track.findMany({});

    // randomize the result order
    const seed = Math.random();
    result.sort(() => seed - 0.5);

    res.status(200).json(result);
}
