// Viewer.tsx
import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useWindowSize } from '../Contexts/WindowSizeProvider';
import { breakpoints } from '../utils/breakpoints';
import { ViewColumn } from './ViewColumn';

const ViewColumnWrapper = ({ widthClass, type, windowHeight }: { widthClass: string, type: string, windowHeight: number | null }) => (
    <div
        key={type}
        className={`${widthClass} flex flex-col gap-2 overflow-x-hidden`}
        style={{ height: (windowHeight ?? 0) - 4 * 20 }}
    >
        <p className="w-full rounded bg-indigo-900/25 text-center capitalize">{type}</p>
        <div className="h-full scroll-smooth rounded bg-indigo-900/25 p-2">
            <ViewColumn type={type} />
        </div>
    </div>
);

export function Viewer() {
    const { windowWidth, windowHeight } = useWindowSize();

    const columns = useMemo(() => {
        if (windowWidth === null || windowHeight === null) {
            return null;
        }

        if (windowWidth >= breakpoints.lg) {
            return { widthClass: 'w-1/4', types: ['new', 'filter', 'trend', 'owned'] };
        } else if (windowWidth >= breakpoints.md) {
            return { widthClass: 'w-1/3', types: ['new', 'filter', 'trend'] };
        } else if (windowWidth >= breakpoints.sm) {
            return { widthClass: 'w-1/2', types: ['new', 'trend'] };
        } else {
            return { widthClass: 'w-full', types: ['new'] };
        }
    }, [windowWidth, windowHeight]);

    if (!columns) return null;

    return (
        <div className="flex flex-1 flex-row gap-4 h-full">
            <QueryClientProvider client={new QueryClient()}>
                {columns.types.map((type) => (
                    <ViewColumnWrapper
                        key={type}
                        widthClass={columns.widthClass}
                        type={type}
                        windowHeight={windowHeight}
                    />
                ))}
            </QueryClientProvider>
        </div>
    );
}
