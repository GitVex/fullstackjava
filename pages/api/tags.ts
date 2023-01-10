import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const filter : Array<string> = req.body.filter;
    console.log("got request with filter: " + filter, typeof filter)

    const where = filter.length > 0 ? {
        AND:
            filter.map((tag: string) => { return ({ tracks: { some: {tags: { some: { name: tag } } } } }) })
    } : {};

    console.log(`where: ${JSON.stringify(where)}`);
    
    const result = await prisma.tag.findMany({
        //get all tags that are present in the tracks that fit the already applied filter
        where: where,
        include: {
            tracks: true
        }
    });

    console.log("sending response: " + result);
    res.json(result);
}