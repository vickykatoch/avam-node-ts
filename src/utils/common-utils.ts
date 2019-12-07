export function throwIfTrue(isTrue: boolean, error: string | Error) {
  if (isTrue) {
    if (error instanceof Error) throw error;
    throw new Error(error);
  }
}

const s4 = (): string =>
  Math.floor(1 + Math.random() * 0x10000)
    .toString(16)
    .substring(1);

export const uniqueId = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
