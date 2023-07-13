import React from 'react';

function PlayerUI() {
	return (
        <div className="flex flex-col backdrop-blur-md" style={{'width': window.innerWidth - 30, 'height': window.innerHeight - 30 }}>
            PlayerUI
            <div className='w-24 h-24 bg-emerald-500' />
            <div className='w-24 h-24 bg-emerald-500' />
            <div className='w-24 h-24 bg-emerald-500' />
            <div className='w-24 h-24 bg-emerald-500' />
        </div>
    );
}

export default PlayerUI;
