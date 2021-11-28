import type { NodeState, TreeNode } from './VirtualizedTree'

export interface LastNodeInfo {
    /**
     * 节点
     */
    nodes: TreeNode[];
    /**
     * 节点id
     */
    ids: string[];
}

/**
 * 获取最后的子节点信息
 * @param node
 * @return LastNodeInfo
 */
export function getLastNode(node: TreeNode): LastNodeInfo {
    const nodes: TreeNode[] = [];
    const ids: string[] = [];
    if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
            const lastNode = getLastNode(child);
            nodes.push(...lastNode.nodes);
            ids.push(...lastNode.ids);
        });
    } else {
        nodes.push(node);
        ids.push(node.id);
    }
    return {
        nodes,
        ids,
    };
}

/**
 * 铺平tree
 * @param tree
 * @param parents
 */
export function flatten(tree: TreeNode, parents: string[] = []): TreeNode[] {
    const res: TreeNode[] = [];
    res.push({
        ...tree,
        parents,
        deepness: parents.length,
    });
    if (tree.children && tree.children.length > 0) {
        tree.children.forEach((child) => {
            res.push(...flatten(child, parents.concat(tree.id)));
        });
    }
    return res;
}

/**
 * 控制展开或折叠
 * @param nodes
 * @param updateNode
 */
export function updateNodeExpanded(nodes: TreeNode[], updateNode: TreeNode) {
    return nodes.map((node) => {
        if (node.id === updateNode.id) {
            const { expanded } = node.state || {};
            return {
                ...node,
                state: {
                    ...node.state,
                    expanded: !expanded,
                },
            };
        }
        if (node.children && node.children.length !== 0) {
            node.children = updateNodeExpanded(node.children, updateNode);
        }
        return node;
    });
}

/**
 * 更新选中状态
 * @param nodes
 * @param updateNode
 * @param deepness
 */
export function updateNodeSelection(
    nodes: TreeNode[],
    updateNode: TreeNode,
    deepness = 0,
): TreeNode[] {
    const { checked } = updateNode.state || {};
    return nodes.map((node) => {
        // 父节点
        if (updateNode.parents[deepness] === node.id) {
            deepness++;
            const parentNode = {
                ...node,
                children: updateNodeSelection(node.children!, updateNode, deepness),
            };
            parentNode.state = getCheckState(parentNode);
            return parentNode;
        }
        // 节点本身
        if (node.id === updateNode.id) {
            return {
                ...node,
                state: {
                    ...node.state,
                    checked: !checked,
                },
                children: node.children ? updateChildren(node.children, !checked) : [],
            };
        }
        // 不相关的节点
        return node;
    });
}

/**
 * 合并选中的node
 * @param tree
 * @param selected
 */
export function mergeTreeState(tree: TreeNode[], selected: string[]): TreeNode[] {
    return tree.map((node) => {
        if (selected.includes(node.id)) {
            node.state = {
                ...node.state,
                checked: true,
            };
            if (node.children && node.children.length > 0) {
                node.children = updateChildren(node.children, true);
            }
        }
        if (node.children && node.children.length > 0) {
            node.children = mergeTreeState(node.children, selected);
            node.state = getCheckState(node);
        }
        return node;
    });
}

function getCheckState(node: TreeNode): NodeState {
    if (node.children && node.children.length !== 0) {
        const status = new Set();
        for (let i = 0; i < node.children.length; i++) {
            const el = node.children[i] as TreeNode;
            const { halfChecked, checked } = el.state || {};
            if (halfChecked) {
                return {
                    ...node.state,
                    checked: false,
                    halfChecked: true,
                };
            } else if (checked) {
                status.add('checked');
            } else {
                status.add('unchecked');
            }
            if (status.size > 1) {
                return {
                    ...node.state,
                    checked: false,
                    halfChecked: true,
                };
            }
        }
        return {
            ...node.state,
            checked: status.has('checked'),
            halfChecked: false,
        };
    }
    return {...node.state};
}

function updateChildren(nodes: TreeNode[], selected: boolean): TreeNode[] {
    return nodes.map((n) => ({
        ...n,
        children: n.children ? updateChildren(n.children, selected) : [],
        state: {
            ...n.state,
            checked: selected,
        },
    }));
}

export function normalizeTreeNodes(nodes: TreeNode[], parents: string[] = []): TreeNode[] {
    return nodes.map(node => {
        const { children } = node;
        if (children && children.length > 0) {
            node.children = normalizeTreeNodes(children, parents.concat(node.id));
        }
        node.state = {
            expanded: false,
            checked: false,
            childCheckedNum: 0,
            parents,
            ...node.state,
        }
        return node;
    })
}
