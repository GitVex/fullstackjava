import PlayerManager from "../components/mixerComponents/PlayerManager"
import PlayerHolderProvider from "../components/contexts/PlayerHolderProvider"

function mixer() {
	return (
		<PlayerHolderProvider>
			<PlayerManager />
		</PlayerHolderProvider>
	)
}

export default mixer