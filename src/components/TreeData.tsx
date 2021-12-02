import type { PathInfo } from './TreeCache';

export interface TreeLikeData {
    id: string;
    children?: TreeLikeData[];
    [key: string]: any;
}

/**
 * 树UI状态
 */
export interface TreeNodeState {
    /**
     * 子节点选中的数量
     */
    checkedNum?: number;
    /**
     * 展开
     */
    expanded?: boolean;
    /**
     * 选中
     */
    checked?: boolean;
    /**
     * 是否半选中
     */
    halfChecked?: boolean;
    /**
     * 禁止选中
     * 添加`disable`类名
     */
    disabled?: boolean;
}

/**
 * 树节点数据
 */
export interface TreeNode {
    /**
     * 节点ID
     */
    id: string;
    /**
     * 树UI状态
     */
    state?: TreeNodeState;
    /**
     * 子节点
     */
    children?: TreeNode[];

    [key: string]: any;
}

export interface FlatNode extends TreeNode {
    children?: FlatNode[];
    state: TreeNodeState;
    /**
     * 快速访问index
     */
    paths: PathInfo;
    /**
     * 虚拟列表index
     */
    index: number;
    /**
     * 树深度
     */
    depth: number;
}
