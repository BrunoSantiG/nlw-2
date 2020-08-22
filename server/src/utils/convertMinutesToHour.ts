export default function convertMinuteToHour(time: number) {
	const horas = Math.floor(time / 60);
	const minutos = time % 60;
	let minutosStr = minutos.toString();
	minutosStr = minutosStr.length > 1 ? minutosStr : minutosStr + "0";
	const horario = `${horas}:${minutosStr}`;
	return horario;
}
