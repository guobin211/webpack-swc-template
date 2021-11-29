import type { FlatNode, NodeState, TreeNode } from './VirtualizedTree'

export interface LastNodes {
    /**
     * 节点
     */
    nodes: TreeNode[];
    /**
     * 节点id
     */
    ids: string[];
}

export interface BaseTreeUtils {
    /**
     * 格式化树
     * @param nodes {any[]}
     */
    normalizeTreeNodes: (nodes: any[]) => TreeNode[];
    /**
     * 格式化带父节点信息的树
     * @param tree
     */
    normalizeFlatNodes: (tree: TreeNode[]) => FlatNode[];
    /**
     * toggle折叠树节点
     * @param nodes
     * @param updateNode
     */
    updateNodeExpanded: (nodes: TreeNode[], updateNode: TreeNode) => TreeNode[];
    /**
     * toggle选中树节点
     * @param nodes
     * @param updateNode
     * @param deepness
     */
    updateNodeSelection: (nodes: TreeNode[], updateNode: TreeNode, deepness?: number) => TreeNode[];
    /**
     * 获取节点的最终节点信息
     * @param node
     * @return {LastNodes}
     */
    getLastNode: (node: TreeNode) => LastNodes;
}

/**
 * 获取最后的子节点信息
 * @param node
 * @return LastNodes
 */
export function getLastNode(node: TreeNode): LastNodes {
    const nodes: TreeNode[] = []
    const ids: string[] = []
    if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
            const lastNode = getLastNode(child)
            nodes.push(...lastNode.nodes)
            ids.push(...lastNode.ids)
        })
    } else {
        nodes.push(node)
        ids.push(node.id)
    }
    return {
        nodes,
        ids
    }
}

/**
 * 铺平tree
 * @param tree
 * @param parents
 */
export function flatten(tree: TreeNode, parents: string[] = []): TreeNode[] {
    const res: TreeNode[] = []
    res.push({
        ...tree,
        parents,
        deepness: parents.length
    })
    if (tree.children && tree.children.length > 0) {
        tree.children.forEach((child) => {
            res.push(...flatten(child, parents.concat(tree.id)))
        })
    }
    return res
}

/**
 * 控制展开或折叠,toggle功能
 * @param nodes {TreeNode[]} 树
 * @param updateNode {TreeNode} 折叠的节点
 */
export function updateNodeExpanded(nodes: TreeNode[], updateNode: TreeNode) {
    return nodes.map((node) => {
        if (node.id === updateNode.id) {
            const {expanded} = node.state || {}
            return {
                ...node,
                state: {
                    ...node.state,
                    expanded: !expanded
                }
            }
        }
        if (node.children && node.children.length !== 0) {
            node.children = updateNodeExpanded(node.children, updateNode)
        }
        return node
    })
}

/**
 * 更新选中状态,toggle功能
 * @param nodes {TreeNode[]} 树
 * @param updateNode {TreeNode} 要更新的节点
 * @param deepness {number} 层级
 */
export function updateNodeSelection(
    nodes: TreeNode[],
    updateNode: TreeNode,
    deepness = 0
): TreeNode[] {
    const {checked} = updateNode.state || {}
    return nodes.map((node) => {
        // 父节点
        if (updateNode.parents[deepness] === node.id) {
            deepness++
            const parentNode = {
                ...node,
                children: updateNodeSelection(node.children!, updateNode, deepness)
            }
            parentNode.state = getCheckState(parentNode, !checked)
            return parentNode
        }
        // 节点本身
        if (node.id === updateNode.id) {
            return {
                ...node,
                state: {
                    ...node.state,
                    checked: !checked
                },
                children: node.children ? updateChildren(node.children, !checked) : []
            }
        }
        // 不相关的节点
        return node
    })
}

/**
 * 合并选中
 * @param tree {TreeNode[]}
 * @param selectedIds {string[]} 选中的节点id
 */
export function mergeTreeState(tree: TreeNode[], selectedIds: string[]): TreeNode[] {
    if (tree.length === 0 || selectedIds.length === 0) {
        return tree
    }
    return tree.map((node) => {
        if (selectedIds.includes(node.id)) {
            return {
                ...node,
                state: {
                    ...node.state,
                    checked: true
                },
                children: node.children ? updateChildren(node.children, true) : []
            }
        } else if (node.children) {
            node.children = mergeTreeState(node.children, selectedIds)
        }
        return node
    })
}

/**
 * 获取父节点半选中状态
 * @param node
 * @param checked {boolean} 是否选中子节点
 */
function getCheckState(node: TreeNode, checked: boolean): NodeState {
    const {children, state} = node
    if (children && children.length !== 0 && state) {
        let childCheckedNum: number = state.checkedNum || 0
        if (checked) {
            childCheckedNum += 1
        } else {
            childCheckedNum -= 1
        }
        return {
            ...node.state,
            checkedNum: childCheckedNum,
            checked: childCheckedNum === children.length
        }
    }
    return {...node.state, checkedNum: 1}
}

/**
 * 更新子节点选中状态
 * @param nodes
 * @param selected
 */
function updateChildren(nodes: TreeNode[], selected: boolean): TreeNode[] {
    if (nodes.length === 0) {
        return nodes
    }
    return nodes.map((n) => ({
        ...n,
        children: n.children ? updateChildren(n.children, selected) : [],
        state: {
            ...n.state,
            checked: selected
        }
    }))
}

/**
 * 格式化Tree数据
 * @param nodes
 * @param parents
 */
export function normalizeTreeNodes(nodes: TreeNode[], parents: string[] = []): TreeNode[] {
    return nodes.map(node => {
        const {children} = node
        if (children && children.length > 0) {
            node.children = normalizeTreeNodes(children, parents.concat(node.id))
        }
        node.state = {
            expanded: false,
            checked: false,
            checkedNum: 0,
            parents,
            ...node.state
        }
        return node
    })
}
