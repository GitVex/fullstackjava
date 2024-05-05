import React from 'react';
import PageComponent from '../components/PageComponent';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function second() {
    return (
/*         <div className={inter.className}>
 */            <PageComponent />
/*         </div>
 */    );
}

export default second;
