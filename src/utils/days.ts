import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt-br";

dayjs.extend(weekday);
dayjs.extend(utc);
dayjs.locale("pt-br");

const getToday = () => dayjs();

const getSaturday = (weekBefore: boolean) => {
	let today = getToday();
	if (weekBefore) {
		today = today.subtract(1, "week");
	}
	const weekday: number = today.weekday();
	let difference: number = 0;
	if (weekday < 6) {
		difference = 6 - weekday;
	}
	return today.add(difference, "d").weekday(6).hour(21).minute(0).second(0);
};

const getLastSaturday = (weekBefore: boolean) => {
	let today = getToday().subtract(1, "week");
	if (weekBefore) {
		today = today.subtract(1, "week");
	}
	const weekday: number = today.weekday();
	let difference: number = 0;
	if (weekday < 6) {
		difference = 6 - weekday;
	}
	return today.add(difference, "day").weekday(6).hour(21).minute(0).second(0);
};

export { getToday, getSaturday, getLastSaturday };
