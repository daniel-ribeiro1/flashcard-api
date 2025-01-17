export function pickProperties<T, K extends keyof T>(
  objectRef: T,
  pickProperties: K[],
): Pick<T, K> {
  const newObject: Pick<T, K> = {} as Pick<T, K>;

  for (const key in objectRef) {
    if (pickProperties.includes(key as unknown as K)) {
      Object.assign(newObject, { [key]: objectRef[key] });
    }
  }

  return newObject;
}

export function removeProperties<T, K extends keyof T>(
  objectRef: T,
  removeProperties: K[],
): Omit<T, K> {
  const newObject: Omit<T, K> = {} as Omit<T, K>;

  for (const key in objectRef) {
    if (!removeProperties.includes(key as unknown as K)) {
      Object.assign(newObject, { [key]: objectRef[key] });
    }
  }

  return newObject;
}
