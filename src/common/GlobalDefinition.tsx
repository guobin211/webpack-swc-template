export const isBrowser = typeof window !== 'undefined'

/**
 * 定义全局变量
 */
export default class GlobalDefinition {
    static set(key: string, value: unknown) {
        if (isBrowser) {
            (window as any)[key] = value
        } else {
            (global as any)[key] = value
        }
    }

    static get<T = unknown>(key: string): T | undefined {
        if (isBrowser) {
            return (window as any)[key] as T
        }
        return (global as any)[key]  as T
    }
}
