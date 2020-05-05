export const memoizedResult = <T = any>(memory: Map<string, any>, key: string, fn: () => T) => {
    if (memory.has(key)) {
        return memory.get(key);
    }
    const combineResult = fn();
    memory.set(key, combineResult);

    return combineResult;
};
