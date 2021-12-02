import type { Argument } from 'classnames'
import classnames from 'classnames'

export const TREE_CLASS_NAME = 'met-tree'

/**
 * 合并className
 * @param args
 */
export function mergeClasses(...args: Argument[]): string {
    return classnames(TREE_CLASS_NAME, ...args)
}
