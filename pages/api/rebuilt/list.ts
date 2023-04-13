import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prismaClientProvider";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const result = await prisma.track.findMany({
        include: {
            tags: true,
            presets: true,
        }
    });
    res.json(result);
}
