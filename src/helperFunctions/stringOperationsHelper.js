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
