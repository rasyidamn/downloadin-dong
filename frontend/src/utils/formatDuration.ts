type FormatDuration = (totalSecond: number ) => string

export const formatDuration : FormatDuration = (totalSecond) => {
	if (isNaN(totalSecond) || totalSecond < 0) {
		return "00:00";
	}

	const hours = Math.floor(totalSecond / 3600);
	const minutes = Math.floor((totalSecond % 3600) / 60);
	const seconds = Math.floor(totalSecond % 60);

	const paddedMinutes = String(minutes).padStart(2, "0");
	const paddedSeconds = String(seconds).padStart(2, "0");

	if (hours > 0) {
		return `${hours}:${paddedMinutes}:${paddedSeconds}`;
	} else {
		return `${paddedMinutes}:${paddedSeconds}`;
	}
}
