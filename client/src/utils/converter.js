const numbers = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

export function convertNumberToString(num) {
  if (num > 99) return 'infinity';
  if (num === 0) return 'no';
  let result = [];
  let keys = Object.keys(numbers).sort((a, b) => b - a);
  keys.forEach((el) => {
    if (num >= el) {
      num = num - el;
      result.push(numbers[el]);
    }
  });
  return result.join(' ');
}

export function countDiffInDays(date1, date2) {
  let daysLeft = Math.ceil((new Date(date1) - date2) / 1000 / 60 / 60 / 24);
  if (daysLeft < 0)
    return `You violated deadline by ${daysLeft * -1} day${
      daysLeft < -1 ? 's' : ''
    }`;
  if (daysLeft > 0) return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
  return 'Do it today';
}

export function dateToString() {
  const daysOfWeek = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };
  const months = {
    0: 'january',
    1: 'february',
    2: 'march',
    3: 'april',
    4: 'may',
    5: 'june',
    6: 'july',
    7: 'august',
    8: 'september',
    9: 'october',
    10: 'november',
    11: 'december',
  };

  const today = new Date();

  const day = today.getDate();
  const dayOfWeek = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();

  return `${daysOfWeek[dayOfWeek]}, ${day} ${months[month]} ${year}`;
}
