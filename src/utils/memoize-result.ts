export const memoizedResult = <T = any, K = string>(memory: Map<K, T>, key: K, fn: () => T): T => {
    if (memory.has(key)) {
        return memory.get(key) as T;
    }
    const combineResult = fn();
    memory.set(key, combineResult);

    return combineResult;
};
