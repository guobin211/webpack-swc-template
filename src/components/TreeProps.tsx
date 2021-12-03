import type { FlatNode, TreeLikeData, TreeNode } from './TreeData';
import type React from 'react';
import type { CustomNodeRenderer, TreeRenderer } from './TreeRenderer';
import type { PathInfo } from './TreeCache';

export type AnyElement = React.ReactNode | JSX.Element;

export type OnSelect = (node: TreeNode) => void;

export type OnExpand = (node: TreeNode) => void;

export type IsLazyNode = (node: TreeNode) => boolean;

export type LoadData = (node: FlatNode) => Promise<TreeNode[]>

export type LoadingElement<T = undefined> = (node: T) => AnyElement;

export interface TreeProps {
    /**
     * 树数据
     */
    treeData: TreeLikeData[];
    /**
     * 树节点内容区域自定义渲染
     */
    renderNodeContent: CustomNodeRenderer;
    /**
     * 树容器的高度
     */
    treeHeight?: number;
    /**
     * 树节点高度
     */
    nodeHeight?: number;
    /**
     * 是否展示树的Loading效果
     */
    showTreeLoading?: boolean;
    /**
     * 是否展示节点的Loading效果
     */
    showNodeLoading?: boolean;
    /**
     * 树的Loading效果
     */
    treeLoading?: LoadingElement;
    /**
     * 节点的Loading效果
     */
    nodeLoading?: LoadingElement<TreeNode>;
    /**
     * 节点滚动的Loading效果
     */
    scrollLoading?: LoadingElement;
    /**
     * 点击选中节点
     */
    onSelect?: OnSelect;
    /**
     * 点击折叠按钮
     */
    onExpand?: OnExpand;
    /**
     * 判断是否是lazyLoad节点
     */
    isLazyNode?: IsLazyNode;
    /**
     * 获取lazyLoad的子节点数据
     */
    loadData?: LoadData;
    /**
     * 默认展开所有父节点
     */
    defaultExpandAll?: boolean;
    /**
     * 默认展开的节点
     */
    defaultExpandKeys?: string[];
    /**
     * 默认选中的节点
     */
    defaultSelectedKeys?: string[];
    /**
     * 样式名后缀
     */
    className?: string;
}

export interface TreeRef extends TreeRenderer {
    /**
     * 点击展开
     * @param updateNode
     */
    handleExpandClick(updateNode: FlatNode): void;

    /**
     * 点击选中
     * @param updateNode
     */
    handleSelectClick(updateNode: FlatNode): void;
}

export interface TreeState {
    isLoading: boolean;
    pathInfoList: PathInfo[];
    selectedNodes: TreeNode[];

    selectedKeys: string[];
    checkedKeys: string[];
    halfCheckedKeys: string[];
    loadedKeys: string[];
    loadingKeys: string[];
    expandedKeys: string[];

    treeData: TreeNode[];
    flattenNodes: FlatNode[];

    prevProps: TreeProps;
}

