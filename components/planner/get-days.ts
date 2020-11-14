import moment, {Moment} from "moment";

interface Day {
  name: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  date: string;
  rawDate: Moment
}

export default function getDays (): Day[] {
  let dates = []

  for (let index = 1; index <= 7; index++) {
    const day = moment()
      .startOf('week')
      .add('days', index)

    dates.push(day)
  }

  return dates.map((date) => ({
    name: date.format('dddd'),
    date: date.format('DD-MM-YYYY'),
    rawDate: date
  })) as Day[]
}
