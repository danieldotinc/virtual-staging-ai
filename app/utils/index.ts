export const sortAlphabetically = <T>(list: T[], property: keyof T) =>
  list.sort((a, b) =>
    (a[property] as string).toUpperCase() < (b[property] as string).toUpperCase()
      ? -1
      : (a[property] as string).toUpperCase() > (b[property] as string).toUpperCase()
      ? 1
      : 0
  );
