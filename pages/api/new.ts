import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prismaClientProvider";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // Query the database
    const result = await prisma.track.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            tags: true
        }
    });


    res.status(200).json(result);
}
