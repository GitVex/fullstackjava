export default interface Preset {
	title: string;
	tracks: {
		url: string;
		volume: number;
		timestamp: number;
	}[];
}
