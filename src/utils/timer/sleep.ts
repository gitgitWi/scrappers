export const sleep = async (seconds = 1) =>
  new Promise((_) => setTimeout(_, seconds * 1_000));
