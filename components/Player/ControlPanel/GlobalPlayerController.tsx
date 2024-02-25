import React, { useEffect } from 'react';
import { usePresetState } from '../../contexts/PlayerHolderProvider';
import { useDebounceCallback } from 'usehooks-ts';

function GlobalPlayerController() {

    const { presetState, presetDispatch } = usePresetState();

    useEffect(() => {})


	return {};
}

export default GlobalPlayerController;
