import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prismaClientProvider';
import TItem from '../../../components/Viewer/types/TItem';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { page = 0, pageSize = 10 } = req.query;
    const { filter = [] } = req.body;

    // Convert page, pageSize, and excludeIds to appropriate types
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);
    const skip = pageNumber * pageSizeNumber;

    // Generate the where clause based on the filter
    const where = filter.length > 0
        ? {
            AND: [
                ...filter.map((tag: string) => ({ tags: { some: { name: tag } } })),
            ],
        } : {};

    // Query the database with pagination and filtering
    const result = await prisma.track.findMany({
        skip: skip,
        take: pageSizeNumber,
        where: where,
        include: {
            tags: true,
            artist: true,
        },
    });

    // Prepare pagination info
    const totalRecords = await prisma.track.count({ where });
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
