import React, { useState } from 'react';
import IFPlayer from './IFPlayer';
import { motion } from 'framer-motion';

interface VolumeSliderProps {
	player?: IFPlayer | null | undefined;
	setVolume: React.Dispatch<number>;
	volume: number;
	height?: number;
	userOnChange?: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.FormEvent<HTMLInputElement>
	) => void;
	userOnInput?: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.FormEvent<HTMLInputElement>
	) => void;
}

function sliderInputHandler(
	e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>,
	player: IFPlayer | null | undefined,
	setVolumeFunc: React.Dispatch<number>
) {
	const field = e.target as HTMLInputElement;
	setVolumeFunc(parseInt(field.value));

	if (player) {
		player.setVolume(parseInt(field.value));
	}
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
	player,
	setVolume,
	volume,
	height = 100,
	userOnChange,
	userOnInput,
}) => {
	// Generate a unique ID for each instance
	const [uniqueId] = useState(
		`volumeSlider${Math.floor(Math.random() * 1000000)}`
	);

	return (
		<div className='flex w-10 flex-row items-center gap-4'>
			<input
				id={uniqueId}
				type='range'
				min='0'
				max='100'
				step='1'
				// @ts-ignore
				orient='vertical'
				value={volume}
				onChange={
					userOnChange
						? userOnChange
						: (e) => sliderInputHandler(e, player, setVolume)
				}
				onInput={
					userOnInput
						? userOnInput
						: (e) => sliderInputHandler(e, player, setVolume)
				}
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
