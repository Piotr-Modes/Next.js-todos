import moment from 'moment'
import 'moment-timezone'

export const trimedString = (str, limiter) => {
  if (str.length <= limiter) return str.replace(/\n/g, ' ')
  const trimedStr =
    str
      .split(' ')
      .reduce((limitedArray, word) => {
        if (limitedArray.join(' ').length + word.length < limiter) {
          limitedArray.push(word)
        }
        return limitedArray
      }, [])
      .join(' ')
      .replace(/\n/g, ' ') + '...'
  return trimedStr
}

export const timezoneFormatedDate = (givenDate) => {
  const timeZone = moment.tz.guess()
  let date = moment(new Date(givenDate))
  date = date.tz(timeZone).format('MM/DD/YY/HH:mm')
  return date
}

export const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export const ApiHelper = (url, method = 'GET', data = {}) => {
  const bearer = `Bearer ${process.env.NEXT_PUBLIC_GOREST_API_TOKEN}`
  let aditional
  method === 'POST' ? (aditional = { body: JSON.stringify(data) }) : (aditional = {})
  return fetch(url, {
    ...aditional,
    method: method,
    withCredentials: true,
    headers: {
      Authorization: bearer,
      'X-FP-API-KEY': 'chaptoken',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        error = error
      },
    )
}

export const localStorageGet = (key) => {
  const item = localStorage.getItem(key)
  if (!item) return
  if (item[0] === '{' || item[0] === '[') return JSON.parse(item)
  return item
}

export const localStorageSave = (key, value) => {
  if (value === undefined) $.error("Can't store undefinded value")
  if (typeof value === 'object' || typeof value === 'array') {
    value = JSON.stringify(value)
  }
  if (typeof value !== 'string') $.error("Can't store unrecognized format value")
  localStorage.setItem(key, value)
}

export const isTodoAppDataInLocalStorage = async () => {
  try {
    const response = await localStorageGet('todoAppData-TodoList')
    if (response) return true
    return false
  } catch (err) {
    console.log(err)
  }
}

export const getOneTodoListFromTwoCompetingOnes = (oldTodoList, newTodoList) => {
  return oldTodoList.map((oldTodo) => {
    if (newTodoList.find((newTodo) => newTodo.id === oldTodo.id))
      return newTodoList.find((newTodo) => newTodo.id === oldTodo.id)
    return oldTodo
  })
}
