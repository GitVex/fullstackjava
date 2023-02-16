import PlayerManager from "../components/mixerComponents/PlayerManager"
import PlayerHolderProvider from "../components/contexts/PlayerHolderProvider"
import { useEffect } from "react"

function mixer() {

	// display the name of the users audio output device
	/* useEffect(() => {
		console.log("Audio Output Devices:", navigator.mediaDevices.enumerateDevices())
	}, []) */

	return (
		<PlayerHolderProvider>
			<PlayerManager />
		</PlayerHolderProvider>
	)
}

export default mixer