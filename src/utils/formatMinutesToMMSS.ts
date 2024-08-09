const formatMinutesToMMSS = (minutes: number): string => {
  const mins = Math.floor(minutes);
  const secs = Math.floor((minutes - mins) * 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(mins)}:${pad(secs)}`;
};

export default formatMinutesToMMSS;
