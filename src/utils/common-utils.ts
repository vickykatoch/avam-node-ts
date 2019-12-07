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

export const uniqueId = () : string => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
export const shortId = (): string  => `${s4()}${s4()}${s4()}`;
export const dateStamp = () : string => {
  const dt = new Date();
  const month = `00${dt.getUTCMonth()+1}`.slice(-2);
  const day = `00${dt.getUTCDay()+1}`.slice(-2);
  return `${dt.getUTCFullYear()}-${month}-${day}`;
};