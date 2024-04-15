import React from 'react';
import { motion } from 'framer-motion';
import { localVolumeControlEndType } from '../Player/states';

interface VolumeSliderProps {
    volumeControl: localVolumeControlEndType;
    className?: string;
    textBgColor?: string;
    height?: number;
}

function VolumeSlider(props: VolumeSliderProps) {
    // Generate a unique ID for each instance
    const uniqueId = `volumeSlider${Math.floor(Math.random() * 1000000)}`;
    const { volumeControl, className = '', textBgColor = '', height = 100 } = props;

    const { localVolume, setLocalVolume } = volumeControl;

    return (
        <div className={'flex w-10 flex-row items-center gap-4 ' + className}>
            <input
                id={uniqueId}
                type="range"
                min="0"
                max="100"
                step="1"
                // @ts-ignore
                orient="vertical"
                value={localVolume}
                onChange={e => {
                    setLocalVolume(parseInt(e.currentTarget.value));
                }}
            />
            <style>
                {`
                    #${uniqueId} {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 5px;
                        height: ${typeof height === 'number' ? `${height}px` : height};
                    }

                    #${uniqueId}::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 15px;
                        height: 15px;
                        background-color: #f50;
                        border-radius: 50%;
                        border: none;
                        transition: .2s ease-in-out;
                    }

                    #${uniqueId}::-moz-range-thumb {
                        appearance: none;
                        width: 15px;
                        height: 15px;
                        background-color: rgb(255 0 0);
                        border-radius: 50%;
                        border: none;
                        transition: .2s ease-in-out;
                    }
                `}
            </style>
            <div style={{ height: height }}>
                <motion.p
                    className={textBgColor}
                    animate={{
                        y: height * (1 - localVolume / 100) + 0.12 * localVolume - 20,
                    }}
                >
                    {localVolume}
                </motion.p>
            </div>
        </div>
    );
}

export default VolumeSlider;
