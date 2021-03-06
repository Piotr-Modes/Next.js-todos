import moment from 'moment'
import 'moment-timezone'

export const timezoneFormatedDate = givenDate => {
  const timeZone = moment.tz.guess()
  let date = moment(new Date(givenDate))
  date = date.tz(timeZone).format('MM/DD/YY/HH:mm')
  return date
}
