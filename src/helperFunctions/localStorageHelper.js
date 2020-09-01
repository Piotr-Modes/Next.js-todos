export const localStorageGet = key => {
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
