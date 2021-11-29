import React from 'react'

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
     * 子节点选中的数量
     */
    checkedNum?: number;
    /**
     * 禁止选中
     * 添加`disable`类名
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
 * FlatNode
 * 带有父节点信息的Node节点
 */
export interface FlatNode extends TreeNode {
    /**
     * 父节点深度
     */
    deepness: number;
    /**
     * 父节点id列表
     */
    parents: string[];
}

export type TreeNodeRenderer<T = Record<string, any>> = (node: FlatNode & T) => JSX.Element | React.ReactNode;

export interface TreeProps {
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
    /**
     * 样式名后缀
     */
    className?: string;
}

export interface TreeRef {
    /**
     * 添加子节点
     * @param node
     * @param children
     */
    appendChild(node: TreeNode, children: TreeNode[]): Promise<number>;

    /**
     * 删除节点
     * @param id
     */
    removeNode(id: string): TreeNode | undefined;
}

interface TreeState {
    nodes: FlatNode[]
}

export default class VirtualizedTree extends React.PureComponent<TreeProps, TreeState> implements TreeRef {

    static getDerivedStateFromProps(nextProps: TreeProps, prevState: TreeState) {
        console.log('getDerivedStateFromProps', nextProps, prevState)
        return null
    }

    constructor(props: TreeProps) {
        super(props)
        this.state = {
            nodes: []
        }
    }

    removeNode = (id: string) => {
        console.log(id)
        return undefined
    }

    appendChild = (node: TreeNode, children: TreeNode[]) => {
        console.log(node, children)
        return Promise.resolve(0)
    }

    render() {
        const {treeData, treeHeight, treeNodeRenderer, ...rest} = this.props
        return (
            <div {...rest} style={{height: treeHeight}}>
                VirtualizedTree
            </div>
        )
    }

    componentDidMount() {
        console.log('componentDidMount')
    }
}
