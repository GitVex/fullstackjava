import React, { useMemo } from 'react';
import CreateSideMenu from './Creator/CreateSideMenu';
import FilterSideMenu from './Filter/FilterSideMenu';
import PlayerTopMenu from './Player/PlayerTopMenu';
import { ViewColumn } from './Viewer/ViewColumn';
import { Viewer } from './Viewer/Viewer';
import PlayerHolderProvider from './Contexts/PlayerHolderProvider';
import FilterStateProvider from './Contexts/FilterStateProvider';
import { useWindowSize } from './Contexts/WindowSizeProvider';
import { breakpoints } from './utils/breakpoints';



function MainApp() {


    return (
        <main className="h-screen overflow-hidden">
            <div className="flex h-full flex-col gap-4 p-6 bg-darknavy-900 text-gray-200">
                <PlayerHolderProvider>
                    <FilterStateProvider>
                        <div className="flex w-full flex-row justify-between">
                            <CreateSideMenu />
                            <PlayerTopMenu />
                            <FilterSideMenu />
                        </div>

                        <Viewer />
                    </FilterStateProvider>
                </PlayerHolderProvider>
            </div>
        </main>
    );
}

export default MainApp;
