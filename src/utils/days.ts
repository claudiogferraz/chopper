import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

const getToday = () => dayjs();

const getLastSaturday = () => {
	let today = getToday();
	return today.subtract(1, "d").subtract(1, "w").weekday(6);
};

export { getToday, getLastSaturday };
