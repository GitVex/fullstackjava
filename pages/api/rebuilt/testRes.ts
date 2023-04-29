import { NextApiRequest, NextApiResponse } from "next";

const testList = [
    {
        id: 1,
        name: 'test1',
        description: 'test1 description',
        image: 'https://picsum.photos/200/300',
    },
    {
        id: 2,
        name: 'test2',
        description: 'test2 description',
        image: 'https://picsum.photos/200/301',
    },
    {
        id: 3,
        name: 'test3',
        description: 'test3 description',
        image: 'https://picsum.photos/200/302',
    },
    {
        id: 4,
        name: 'test4',
        description: 'test4 description',
        image: 'https://picsum.photos/200/303',
    },
    {
        id: 5,
        name: 'test5',
        description: 'test5 description',
        image: 'https://picsum.photos/200/304',
    },
    {
        id: 6,
        name: 'test6',
        description: 'test6 description',
        image: 'https://picsum.photos/200/305',
    },
    {
        id: 7,
        name: 'test7',
        description: 'test7 description',
        image: 'https://picsum.photos/200/306',
    },
    {
        id: 8,
        name: 'test8',
        description: 'test8 description',
        image: 'https://picsum.photos/200/307',
    },
    {
        id: 9,
        name: 'test9',
        description: 'test9 description',
        image: 'https://picsum.photos/200/308',
    },
    {
        id: 10,
        name: 'test10',
        description: 'test10 description',
        image: 'https://picsum.photos/200/309',
    },
    {
        id: 11,
        name: 'test11',
        description: 'test11 description',
        image: 'https://picsum.photos/200/310',
    },
    {
        id: 12,
        name: 'test12',
        description: 'test12 description',
        image: 'https://picsum.photos/200/311',
    },
    {
        id: 13,
        name: 'test13',
        description: 'test13 description',
        image: 'https://picsum.photos/200/312',
    },
    {
        id: 14,
        name: 'test14',
        description: 'test14 description',
        image: 'https://picsum.photos/200/313',
    },
    {
        id: 15,
        name: 'test15',
        description: 'test15 description',
        image: 'https://picsum.photos/200/314',
    },
    {
        id: 16,
        name: 'test16',
        description: 'test16 description',
        image: 'https://picsum.photos/200/315',
    },
    {
        id: 17,
        name: 'test17',
        description: 'test17 description',
        image: 'https://picsum.photos/200/316',
    },
    {
        id: 18,
        name: 'test18',
        description: 'test18 description',
        image: 'https://picsum.photos/200/317',
    },
    {
        id: 19,
        name: 'test19',
        description: 'test19 description',
        image: 'https://picsum.photos/200/318',
    },
    {
        id: 20,
        name: 'test20',
        description: 'test20 description',
        image: 'https://picsum.photos/200/319',
    },
    {
        id: 21,
        name: 'test21',
        description: 'test21 description',
        image: 'https://picsum.photos/200/320',
    },
    {
        id: 22,
        name: 'test22',
        description: 'test22 description',
        image: 'https://picsum.photos/200/321',
    },
    {
        id: 23,
        name: 'test23',
        description: 'test23 description',
        image: 'https://picsum.photos/200/322',
    },
    {
        id: 24,
        name: 'test24',
        description: 'test24 description',
        image: 'https://picsum.photos/200/323',
    },
    {
        id: 25,
        name: 'test25',
        description: 'test25 description',
        image: 'https://picsum.photos/200/324',
    },
];
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(testList);
}
