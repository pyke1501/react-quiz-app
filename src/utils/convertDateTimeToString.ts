/*
input: leaderboard
output: leaderboard_2025-11-20 030420
*/

export default function convertDateTimeToString(name: string) {
  const date = new Date();
  const getDay = `0${date.getDate()}`.slice(-2).toString();
  const getMonth = `0${date.getMonth() + 1}`.slice(-2).toString();
  const getYear = date.getFullYear().toString();
  const getHours = `0${date.getHours()}`.slice(-2).toString();
  const getMinutes = `0${date.getMinutes()}`.slice(-2).toString();
  const getSeconds = `0${date.getSeconds()}`.slice(-2).toString();
  return `${name}_${getYear}-${getMonth}-${getDay} ${getHours}${getMinutes}${getSeconds}`;
}