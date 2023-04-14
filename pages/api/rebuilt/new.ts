import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./prismaClientProvider";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    console.log(`new called from: ${req.body.origin}`)

    // Query the database
    const result = await prisma.track.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });


    res.status(200).json(result);
}
