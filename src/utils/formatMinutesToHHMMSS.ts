const formatMinutesToHHMMSS = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor((totalMinutes * 60) % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export default formatMinutesToHHMMSS;
