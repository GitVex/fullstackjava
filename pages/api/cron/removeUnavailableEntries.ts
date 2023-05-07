import { prisma } from "../rebuilt/prismaClientProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('Cron job started');

  res.status(200).end('Hello Cron!');
}