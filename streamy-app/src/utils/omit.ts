export const omit = <T extends object>(obj: T, keys: string[]): T => {
    return Object.fromEntries(
        Object.entries(obj).filter(([k]) => !keys.includes(k))
    ) as T;
};
