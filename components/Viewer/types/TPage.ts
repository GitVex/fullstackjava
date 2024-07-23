import TItem from './TItem';

type TPage = {
    data: TItem[];
    pagination: {
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    }
}

export default TPage;