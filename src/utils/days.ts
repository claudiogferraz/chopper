import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

const getToday = () => dayjs();

const getLastSaturday = () => {
	let today = getToday();
	if (today.weekday() == 6) {
		return today;
	} else {
		return today.subtract(1, "w").weekday(6);
	}
};

export { getToday, getLastSaturday };
