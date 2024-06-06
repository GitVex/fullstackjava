import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { localVolumeControlEndType } from '../Player/states';
import styles from './VolumeSlider.module.css';
import { useWindowSize } from '../contexts/WindowSizeProvider';

const theme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#FF0000',
                },
                thumb: {
                    backgroundColor: 'red',
                },
                track: {
                    color: 'red',
                },
                rail: {
                    color: '#8B0F2A',
                },
                active: {
                    color: 'red',
                },
                valueLabel: {
                    backgroundColor: 'transparent',
                }
            },
        },
    },
});

interface VolumeSliderProps {
    volumeControl: localVolumeControlEndType;
    className?: string;
    textBgColor?: string;
    height?: number | string;
    opaque?: boolean;
}

const VolumeSlider = ({ volumeControl, height, opaque = false }: VolumeSliderProps) => {
    const { localVolume, setLocalVolume } = volumeControl;
    const { windowHeight } = useWindowSize();
    const componentHeight = typeof height === 'number' ? height : (windowHeight ? windowHeight / 7.58 : 0);

    const handleVolumeChange = useCallback(
        (value: number) => {
            setLocalVolume(value);
        },
        [setLocalVolume],
    );

    return (
        <div className={`${styles.container} rounded border-2 border-darknavy-400/25`}
             style={{ height: height ?? '80%' }}>
            <ThemeProvider theme={theme}>
                <Slider
                    orientation="vertical"
                    value={localVolume}
                    onChange={(e, val) => {
                        handleVolumeChange(val as number);
                    }}
                    style={{ height: '90%' }}
                    aria-labelledby="vertical-slider"
                    size="small"
                    valueLabelDisplay={'on'}
                />
            </ThemeProvider>

            {/* <div style={{ height: `90%` }}>
                <motion.p
                    className={`absolute ${opaque ? 'bg-darknavy-500' : ''} min-w-[26px]`}
                    animate={{
                        y: componentHeight * (1 - localVolume / 100) + 0.12 * localVolume - 22,
                        transition: { ease: 'easeOut', duration: 0.5 },
                    }}
                >
                    {localVolume}
                </motion.p>
            </div> */}
        </div>
    );
};

export default VolumeSlider;
