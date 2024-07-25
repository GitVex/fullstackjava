import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prismaClientProvider';
import TItem from '../../../components/Viewer/types/TItem';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { page = 0, pageSize = 10, excludeIds = [] } = req.query;

    // Convert page, pageSize, and excludeIds to appropriate types
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);
    const excludeIdsArray: number[] = excludeIds ?
        (Array.isArray(excludeIds) ?
            excludeIds.map(id => parseInt(id, 10))
            :
            [parseInt(excludeIds as string, 10)])
        :
        [];

    // Query the database with pagination, excluding already sent IDs
    const result = await prisma.track.findMany({
        where: {
            track_id: {
                notIn: excludeIdsArray,
            },
        },
        orderBy: {
            created_at: 'desc',
        },
        include: {
            tags: true,
            artist: true,
        },
        skip: pageNumber * pageSizeNumber,
        take: pageSizeNumber,
    });

    // Randomize the result order
    function randomize() {
        return Math.random() - 0.5;
    }

    result.sort(randomize);

    // Prepare pagination info
    const totalRecords = await prisma.track.count();
    const totalPages = Math.ceil(totalRecords / pageSizeNumber);

    const pageObj = {
        data: result as TItem[],
        pagination: {
            totalRecords,
            totalPages,
            currentPage: pageNumber,
            pageSize: pageSizeNumber,
        },
    };

    res.status(200).json(pageObj);
}
