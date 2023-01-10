import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

async function handle(req: NextApiRequest, res: NextApiResponse) {

    const params = req.body.filter as string[]

    const tags = await prisma.tag.findMany({
        where: {
            AND:
                params.map((tag: string) => { return ({ tracks: { some: { tags: { some: { name: tag } } } } }) })
            , id: {
                notIn: [1, 2, 3]
            }
        },
        orderBy: {
            tracks: {
                _count: "desc"
            }
        }
    })

    res.json(tags);
}

export default handle;