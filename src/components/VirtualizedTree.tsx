import React, { HTMLAttributes } from 'react'
import type { RendererProps } from 'react-virtualized-tree'
import VTree from 'react-virtualized-tree'

/**
 * 树UI状态
 */
export interface NodeState {
    /**
     * 展开
     */
    expanded?: boolean;
    /**
     * 选中
     */
    checked?: boolean;
    /**
     * 半选中
     */
    halfChecked?: boolean;
    /**
     * 禁止选择
     */
    disabled?: boolean;
    [key: string]: any;
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
     * 节点自定义数据--UI状态
     */
    state?: NodeState;
    /**
     * 子节点
     */
    children?: TreeNode[];
    [key: string]: any;
}

/**
 * FlattenedNode
 * 带有父节点信息的Node节点
 */
export interface FlattenedNode extends TreeNode {
    /**
     * 父节点深度
     */
    deepness: number;
    /**
     * 父节点id列表
     */
    parents: string[];
}

export type TreeNodeRenderer<T = Record<string, any>> = (node: FlattenedNode & T) => JSX.Element | React.ReactNode;

export type HtmlDivProps = HTMLAttributes<HTMLDivElement>;

export interface TreeProps extends HtmlDivProps {
    /**
     * 树数据
     */
    treeData: TreeNode[];
    /**
     * 树容器的高度
     */
    treeHeight: number;
    /**
     * 树节点自定义渲染
     */
    treeNodeRenderer: TreeNodeRenderer;
}

export interface TreeAction {
}

export default class VirtualizedTree extends React.Component<TreeProps> {

    needTick = false

    handleTreeChange = () => {
    }

    createNodeRenderer = (rest: RendererProps<TreeNode>, renderNode: TreeNodeRenderer) => {
        const {node, measure, style} = rest
        if (this.needTick) {
            this.tick(measure)
            this.needTick = false
        }
        return <div style={style}>{renderNode(node as any)}</div>
    }

    render() {
        const {treeData, treeHeight, treeNodeRenderer, ...rest} = this.props
        return (
            <div {...rest} style={{height: treeHeight}}>
                <VTree nodes={treeData as any} onChange={this.handleTreeChange} nodeMarginLeft={0}>
                    {(rest) => this.createNodeRenderer(rest as any, treeNodeRenderer)}
                </VTree>
            </div>
        )
    }

    tick(fn: () => void) {
        setTimeout(fn, 16)
    }
}
