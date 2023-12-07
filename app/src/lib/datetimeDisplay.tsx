const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const dateTimeDisplay = (dt: Date) => {
  return `${dt.toDateString()} at ${formatAMPM(dt)}`;
};
