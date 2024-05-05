import React, { useState } from 'react';
import VolumeSlider from '../VolumeSlider';

function Tester() {
    const [localVolume, setLocalVolume] = useState(50);

    return (
        <div className={`flex h-screen w-screen place-content-center items-center`}>
            <div className="flex max-w-min flex-col items-center gap-4 rounded border-2 border-licorice p-4 pt-2 bg-darknavy-500/50">
                <p className="text-center max-w-min">Master <br/> Volume</p>
                <VolumeSlider
                    volumeControl={{
                        localVolume,
                        setLocalVolume: (vol: number) => setLocalVolume(vol),
                    }}
                    height={500}
                />
            </div>
        </div>
    );
}

export default Tester;
