import React, { useState } from 'react';
import VolumeSlider from '../VolumeSlider';

function Tester() {
    const [localVolume, setLocalVolume] = useState(50);

    return (
        <div className={`flex h-screen w-screen place-content-center items-center text-2xl`}>
            <VolumeSlider height={350} volumeControl={{ localVolume: localVolume, setLocalVolume: vol => setLocalVolume(vol) }} />
        </div>
    );
}

export default Tester;
