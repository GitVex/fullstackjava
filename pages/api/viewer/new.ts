import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prismaClientProvider';
import TPage from '../../../components/Viewer/types/TPage';
import TItem from '../../../components/Viewer/types/TItem';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { page = 0, pageSize = 10 } = req.query;

    // Convert page and pageSize to numbers
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);

    // Calculate the number of records to skip
    const skip = pageNumber * pageSizeNumber;

    // Query the database
    const result = await prisma.track.findMany({
        skip: skip,
        take: pageSizeNumber,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            tags: true,
        },
    });

    // Query the total number of records for pagination info
    const totalRecords = await prisma.track.count();

    // Prepare pagination info
    const totalPages = Math.ceil(totalRecords / pageSizeNumber);
    const pageObj: TPage = {
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
