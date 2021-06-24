

export default function timeString(val) {
	const arr = val.split(':'); // splitting the string by colon
	const seconds = arr[0] * 3600 + arr[1] * 60; // converting
	return seconds;
}

