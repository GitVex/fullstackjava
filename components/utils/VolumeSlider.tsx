import React, { useMemo, useCallback } from 'react';
import { localVolumeControlEndType } from '../Player/states';
import { motion } from 'framer-motion';
import styles from './VolumeSlider.module.css';

interface VolumeSliderProps {
    volumeControl: localVolumeControlEndType;
    className?: string;
    textBgColor?: string;
    height?: number;
}

const VolumeSlider = ({ volumeControl, className = '', textBgColor = '', height = 100 }: VolumeSliderProps) => {
    const uniqueId = useMemo(() => `volumeSlider${Math.floor(Math.random() * 1000000)}`, []);
    const { localVolume, setLocalVolume } = volumeControl;

    const handleVolumeChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalVolume(parseInt(e.currentTarget.value));
        },
        [setLocalVolume]
    );

    return (
        <div className={`${styles.container} ${className}`}>
            <input
                id={uniqueId}
                className={styles.slider}
                type="range"
                min="0"
                max="100"
                step="1"
                //@ts-ignore
                orient="vertical"
                value={localVolume}
                onChange={handleVolumeChange}
                style={{ height: `${height}px` }} // Inline style for dynamic height
            />
            <div style={{ height }}>
                <motion.p
                    className={textBgColor}
                    animate={{
                        y: height * (1 - localVolume / 100) + 0.12 * localVolume - 20,
                        transition: { ease: 'easeOut', duration: .5 },
                    }}
                >
                    {localVolume}
                </motion.p>
            </div>
        </div>
    );
};

export default VolumeSlider;
