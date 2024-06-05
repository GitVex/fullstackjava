import Slider from '@mui/material/Slider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEffect, useCallback, useRef, useState } from 'react';
import { localVolumeControlEndType } from '../Player/states';
import styles from './VolumeSlider.module.css';

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
            },
        },
    },
});

interface VolumeSliderProps {
    volumeControl: localVolumeControlEndType;
    className?: string;
    textBgColor?: string;
    height?: number | string;
}

const VolumeSlider = ({ volumeControl, className = '', textBgColor = '', height = 100 }: VolumeSliderProps) => {
    /*const uniqueId = useMemo(() => `volumeSlider${Math.floor(Math.random() * 1000000)}`, []);*/
    const { localVolume, setLocalVolume } = volumeControl;

    const componentRef = useRef<HTMLDivElement>(null);
    const [componentHeight, setComponentHeight] = useState(0);

    useEffect(() => {
        if (componentRef.current) {
            setComponentHeight(componentRef.current.clientWidth);
        }
    }, [componentRef]);

    /* const handleVolumeChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalVolume(parseInt(e.currentTarget.value));
        },
        [setLocalVolume]
    ); */
    const handleVolumeChangeMui = useCallback(
        (e: any, value: number | number[], activeThumb: number) => {
            setLocalVolume(value as number);
        },
        [setLocalVolume],
    );

    return (
        <div className={`${styles.container} ${className}`}>
            <ThemeProvider theme={theme}>
                <Slider
                    ref={componentRef}
                    orientation="vertical"
                    value={localVolume}
                    onChange={(e, val, thumb) => {
                        handleVolumeChangeMui(e, val, thumb);
                    }}
                    aria-labelledby="vertical-slider"
                    style={{ height: `${typeof height === 'number' ? `${height}px` : height}` }}
                    size="small"
                />
            </ThemeProvider>

            <div style={{ height: `${typeof height === 'number' ? `${height}px` : height}` }}>
                <motion.p
                    className={textBgColor}
                    animate={{
                        y: componentHeight * (1 - localVolume / 100) + 0.12 * localVolume - 20,
                        transition: { ease: 'easeOut', duration: 0.5 },
                    }}
                >
                    {localVolume}
                </motion.p>
            </div>
        </div>
    );
};

export default VolumeSlider;
