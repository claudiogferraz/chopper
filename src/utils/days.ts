import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";

dayjs.extend(weekday);
dayjs.extend(utc);

const getToday = () => dayjs();

const getSaturday = () => {
	let today = getToday().utcOffset(-3);
	const weekday: number = today.weekday();
	let difference: number = 0;
	if (weekday < 6) {
		difference = 6 - weekday;
	}
	return today.add(difference, "d").weekday(6);
};

const getLastSaturday = () => {
	let today = getToday().utcOffset(-3).subtract(1, "week");
	const weekday: number = today.weekday();
	let difference: number = 0;
	if (weekday < 6) {
		difference = 6 - weekday;
	}
	return today.add(difference, "day").weekday(6);
};

export { getToday, getSaturday, getLastSaturday };
