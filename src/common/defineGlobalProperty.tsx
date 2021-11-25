export function defineGlobalProperty(key: string, value: unknown) {
    (window as any)[key] = value
}

export function getGlobalProperty<T = unknown>(key: string): T | undefined {
    return (window as any)[key] as T
}
