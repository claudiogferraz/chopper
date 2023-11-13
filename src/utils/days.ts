import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const getToday = () => dayjs().utcOffset(-3);
const getLastSaturday = () =>
	getToday().subtract(1, "week").startOf("day").weekday(7);
const getPreviousSaturday = () =>
	getToday().subtract(2, "weeks").startOf("day").weekday(7);

export { getToday, getLastSaturday, getPreviousSaturday };
