import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    // add the tags to the filter if their value is true
    const filter = req.body.filter as string[];
    const maxResults = req.body.maxResults as number;

    // include where clause if filter is not empty
    // entries should contain all tags
    const where = filter.length > 0 ? {
        AND:
            filter.map((tag: string) => { return ({ tags: { some: { name: tag } } }) })
    } : {};


    const result = await prisma.track.findMany({
        where: where,
        include: {
            tags: true,
            presets: true,
        },
        take: maxResults,
    });
    res.json(result);
}