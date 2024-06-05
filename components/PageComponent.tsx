import React, { useMemo } from 'react';
import CreateSideMenu from './Creator/CreateSideMenu';
import FilterSideMenu from './Filter/FilterSideMenu';
import PlayerTopMenu from './Player/PlayerTopMenu';
import { ViewColumn } from './Viewer/ViewColumn';
import { Viewer } from './Viewer/Viewer';
import PlayerHolderProvider from './contexts/PlayerHolderProvider';
import FilterStateProvider from './contexts/RebuiltFilterStateProvider';
import { useWindowSize } from './contexts/WindowSizeProvider';
import { breakpoints } from './utils/breakpoints';

function renderViewColumn(widthClass: string, type: string, windowHeight: number) {
    return (
        <div
            key={type} // Adding key for mapping
            className={`${widthClass} flex flex-col gap-2 overflow-x-hidden`}
            style={{ height: windowHeight - 4 * 24 }}
        >
            <p className="w-full rounded bg-indigo-900/25 text-center capitalize">{type}</p>
            <div className={`h-full overflow-y-auto overflow-x-hidden scroll-smooth rounded bg-indigo-900/25 p-2`}>
                <ViewColumn type={type} />
            </div>
        </div>
    );
}

function PageComponent() {
    const { windowWidth, windowHeight } = useWindowSize();

    const renderDivs = useMemo(() => {
        if (windowWidth === 0 || windowHeight === 0) {
            return null; // Handle the case where context values are not available
        }

        let widthClass: string;
        let columns: string[] = [];

        if (windowWidth >= breakpoints.lg) {
            widthClass = 'w-1/4';
            columns = ['new', 'filter', 'trend', 'owned'];
        } else if (windowWidth >= breakpoints.md) {
            widthClass = 'w-1/3';
            columns = ['new', 'filter', 'trend'];
        } else if (windowWidth >= breakpoints.sm) {
            widthClass = 'w-1/2';
            columns = ['new', 'trend'];
        } else {
            widthClass = 'w-full';
            return renderViewColumn(widthClass, 'new', windowHeight);
        }

        return <>{columns.map(columnType => renderViewColumn(widthClass, columnType, windowHeight))}</>;
    }, [windowWidth, windowHeight]);

    return (
        <main className="h-screen overflow-hidden">
            <div className="flex h-full flex-col gap-6 p-6 bg-darknavy-900">
                <PlayerHolderProvider>
                    <FilterStateProvider>
                        <div className="flex w-full flex-row justify-between">
                            <CreateSideMenu />
                            <PlayerTopMenu />
                            <FilterSideMenu />
                        </div>

                        <Viewer className="flex flex-1 flex-row gap-4">{renderDivs}</Viewer>
                    </FilterStateProvider>
                </PlayerHolderProvider>
            </div>
        </main>
    );
}

export default PageComponent;
