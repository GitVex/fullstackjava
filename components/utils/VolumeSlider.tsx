import React, { useState } from 'react';
import IFPlayer from './IFPlayer';
import { motion } from 'framer-motion';

interface VolumeSliderProps {
	className?: string;
	textBgColor?: string;
	player?: IFPlayer | null | undefined;
	setVolume: React.Dispatch<number>;
	volume: number;
	height?: number;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
	className,
	textBgColor,
	setVolume,
	volume,
	height = 100,
}) => {
	// Generate a unique ID for each instance
	const [uniqueId] = useState(
		`volumeSlider${Math.floor(Math.random() * 1000000)}`
	);

	return (
		<div className={'flex w-10 flex-row items-center gap-4 ' + className}>
			<input
				id={uniqueId}
				type='range'
				min='0'
				max='100'
				step='1'
				// @ts-ignore
				orient='vertical'
				value={volume}
				onChange={(e) => {
					setVolume(parseInt(e.currentTarget.value));
				}}
			/>
			<style>
				{`
                    #${uniqueId} {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 5px;
                        height: ${
							typeof height === 'number' ? `${height}px` : height
						};
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
						y: height * (1 - volume / 100) + 0.12 * volume - 20,
					}}
				>
					{volume}
				</motion.p>
			</div>
		</div>
	);
};

export default VolumeSlider;
