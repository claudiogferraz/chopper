import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const getToday = () => dayjs().utcOffset(-3);
const getLastSaturday = () => {
	let today = getToday();
	if (today.weekday() == 6) {
		return today;
	} else {
		return today.weekday(-6);
	}
};
const getPreviousSaturday = () => {
	let today = getToday();
	if (today.weekday() == 6) {
		return today.subtract(1, "week");
	} else {
		return today.subtract(1, "week").weekday(-6);
	}
};

export { getToday, getLastSaturday, getPreviousSaturday };
