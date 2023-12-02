/**
 * Returns true if it's able to be updated, and false otherwise.
 */
export const updateIntervalCheck = (
  lastUpdateTimestampMS: number | undefined,
  interval: number
) => {
  return (
    !lastUpdateTimestampMS || // first username or ...
    lastUpdateTimestampMS <= Date.now() - interval * 24 * 60 * 60 * 1000
  ); // N days gone
};
