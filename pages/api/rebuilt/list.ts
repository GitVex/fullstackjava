import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prismaClientProvider";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // Query the database
    const result = await prisma.track.findMany({});

    // randomize the result order
    result.sort(() => Math.random() - 0.5);

    res.json(result);
}
