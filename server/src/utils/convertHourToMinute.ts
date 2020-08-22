export default function convertHourToMinute(time: string) {
	const [hour, minutes] = time.split(":").map(Number);
	const result = hour * 60 + minutes;
	return result;
}
