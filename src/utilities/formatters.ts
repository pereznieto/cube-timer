export const formatTime = (time: number) => {
  const splitTime = String(time).split('');
  const hundredths = splitTime[splitTime.length - 1] || 0;
  const tenths = splitTime[splitTime.length - 2] || 0;
  const totalSeconds = Number(splitTime.slice(0, -2).join('')) || 0;
  const minutes = totalSeconds >= 60 ? Math.trunc(totalSeconds / 60) : 0;
  const secondsUnwrapped = totalSeconds >= 60 ? totalSeconds % 60 : totalSeconds;
  const seconds = String(secondsUnwrapped).length < 2 ? `0${secondsUnwrapped}` : secondsUnwrapped;

  return [minutes, seconds, tenths, hundredths];
};

export const prettifyTime = (time: number) => {
  const [minutes, seconds, tenths, hundredths] = formatTime(time);
  return `${minutes ? `${minutes}:` : ''}${seconds}.${tenths}${hundredths}`;
};

export const average = (times: number[]) => {
  const sum = times.reduce((previous: number, current: number) => previous + current, 0);
  return Math.round(sum / times.length);
};

export const getScramble = (count: number) => Array(count).fill('').reduce(
  (previous, current, index) => {
    const moves = [
      'R', 'R’', 'R2',
      'L', 'L’', 'L2',
      'U', 'U’', 'U2',
      'D', 'D’', 'D2',
      'F', 'F’', 'F2',
      'B', 'B’', 'B2',
    ];
    const moves_i = [
      'L', 'L’', 'L2',
      'R', 'R’', 'R2',
      'D', 'D’', 'D2',
      'U', 'U’', 'U2',
      'B', 'B’', 'B2',
      'F', 'F’', 'F2',
    ];
    const randomIndex = Math.floor(Math.random() * 18);
    const previousItem = index === 0 ? previous[0] : previous[index];
    const differentSide = moves[randomIndex].split('')[0] !== previousItem.split('')[0];

    return differentSide ? [...previous, moves[randomIndex]] : [...previous, moves_i[randomIndex]];
  },
  ['']).join(' ');
