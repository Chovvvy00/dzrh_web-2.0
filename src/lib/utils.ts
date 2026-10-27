import { formatInTimeZone } from 'date-fns-tz'

export function formatDate(date: string | undefined | null) {
  if (!date) return ''
  return formatInTimeZone(date, 'Asia/Manila', 'dd MMMM yyyy')
}

export function smartTrim(
  str: string,
  length: number,
  delim: string,
  appendix: string,
) {
  if (str.length <= length) {
    return str
  }

  let trimmedStr = str.slice(0, length + delim.length)

  const lastDelimIndex = trimmedStr.lastIndexOf(delim)
  if (lastDelimIndex >= 0) {
    trimmedStr.slice(0, lastDelimIndex)
  }

  if (trimmedStr) {
    trimmedStr += appendix
  }

  return trimmedStr
}
