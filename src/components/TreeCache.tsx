/* eslint-disable no-param-reassign,@typescript-eslint/prefer-optional-chain,no-plusplus */
import type { FlatNode, TreeLikeData, TreeNode, TreeNodeState } from './TreeData';
import type { TreeProps } from './TreeProps';

export type ParentsInfo = string[];
export type PathInfo = number[];

export interface FlattenedTreeNode {
  parents: ParentsInfo[];
  paths: PathInfo[];
}

export class TreeCache {
  // TODO 带状态格式tree
  public static createFormTreeProps(props: TreeProps): TreeCache {
    console.log(props);
    return new TreeCache();
  }

  pathInfos: PathInfo[] = [];

  treeNodes: TreeNode[] = [];

  constructor(tree: TreeLikeData[] = []) {
    this.pathInfos = getFlattenedTreePaths(tree);
    this.treeNodes = tree;
  }

  /**
   * 更新node的checked状态
   * @param updateNode 新的node
   *
   * 1. 更新updateNode的children
   * 2. 查找替换updateNode
   * 3. 更新父节点的checkedNum + checked
   */
  updateNodeSelection(updateNode: FlatNode) {
    this.treeNodes = updateNodeSelection(this.treeNodes, updateNode, 0);
  }

  /**
   * 更新node的expended状态
   * @param updateNode {FlatNode}
   * @param pathIndex {number} the index 0f pathInfos
   *
   * ```text
   * 1. open
   *
   * updateNodeState;
   * [...prev, pathIndex, ...next] = pathInfo
   * pathInfos = [prev + pathIndex + updateNode.node.children + next]
   *
   * 2. close
   *
   * updateNodeState;
   * [...prev, pathIndex, ...next] = pathInfo
   * next = next - updateNode.node.children.length
   * pathInfos = [prev + next]
   *
   * ```
   */
  updateNodeExpanded(updateNode: FlatNode, pathIndex: number): PathInfo[] {
    this.replaceTreeNode(updateNode);
    const { children, paths, state } = updateNode;
    if (children) {
      const childPathInfo = getFlattenedTreePaths(children, paths);
      if (state.expanded) {
        const pathInfo: PathInfo[] = [];
        for (let i = 0; i <= pathIndex; i++) {
          pathInfo.push(this.pathInfos[i]);
        }
        pathInfo.push(...childPathInfo);
        for (let i = pathIndex + 1; i < this.pathInfos.length; i++) {
          pathInfo.push(this.pathInfos[i]);
        }
        this.pathInfos = pathInfo;
      } else {
        this.pathInfos.splice(pathIndex + 1, childPathInfo.length);
      }
    }
    return this.pathInfos;
  }

  /**
   * 替换treeNodes中的数据
   * @param updateNode
   */
  replaceTreeNode(updateNode: FlatNode) {
    const { paths } = updateNode;
    let index: any;
    if (paths.length === 1) {
      index = paths[0] as any;
      this.treeNodes[index] = updateNode;
    } else if (paths.length > 1) {
      let nodeRef = this.treeNodes[paths[0] as any];
      for (let i = 1; i < paths.length; i++) {
        index = paths[i] as any;
        if (nodeRef) {
          if (i === paths.length - 1) {
            // @ts-ignore
            nodeRef.children[index] = updateNode;
            return;
          }
          // @ts-ignore
          nodeRef = nodeRef.children[index];
        } else {
          return;
        }
      }
    }
  }

  /**
   * 根据列表index查找FlatNode
   * @param index
   * @unsafe 可能会数组移除，FlatNode为undefined
   *
   * 1. 查找pathInfo
   * 2. 查找TreeNode
   * 3. 合并TreeNode，index，depth，pathInfo
   */
  getNodeByPathIndex(index: number): FlatNode {
    const paths = this.getPathInfo(index);
    let flatNode: TreeNode | null = null;
    if (!paths) {
      return flatNode as any;
    }
    let nodes = this.treeNodes;
    for (let i = 0; i < paths.length; i++) {
      const key = paths[i] as any;
      const node = nodes[key];
      if (node) {
        flatNode = node;
        if (i === paths.length - 1) {
          return {
            ...flatNode,
            paths,
            index,
            state: {
              ...flatNode.state,
            },
            depth: paths.length - 1,
          } as any;
        }
        if (node.children) {
          nodes = node.children;
        }
      }
    }
    return flatNode as any;
  }

  /**
   * 根据列表index查找pathInfo
   * @param index
   * @unsafe 可能会数组移除
   */
  getPathInfo(index: number): PathInfo {
    if (index < 0 || index > this.pathInfos.length) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    return this.pathInfos[index];
  }

  destroy() {
    // TODO
    this.treeNodes = [];
    this.pathInfos = [];
  }
}

/**
 * 获取最后的子节点
 * @param node
 */
export function getLastNode(node: TreeNode): TreeNode[] {
  const res: TreeNode[] = [];
  if (node.children && node.children.length > 0) {
    node.children.reduce((prev, curr) => {
      return prev.concat(getLastNode(curr));
    }, res);
  } else {
    res.push(node as any);
  }
  return res;
}

/**
 * 格式化Tree数据
 * @param tree
 * @param parents
 */
export function normalizeTreeNodes<T extends TreeLikeData>(tree: T[], parents: string[] = []): Array<TreeNode & T> {
  return tree.map(node => {
    const { children, state } = node;
    const treeNode: TreeNode & T = {
      ...node,
      state: {
        parents,
        depth: parents.length - 1,
        disabled: false,
        expanded: false,
        checked: false,
        checkedNum: 0,
        ...state,
      },
    };
    if (children && children.length > 0) {
      node.children = normalizeTreeNodes(children, parents.concat(node.id));
    }
    return treeNode;
  });
}

/**
 * 是否展开
 * @param node
 */
export function isNodeExpanded<T extends TreeLikeData>(node: T): boolean {
  return node.state && node.state.expanded;
}

/**
 * children非空
 * @param node
 */
export function nodeHasChildren<T extends TreeLikeData>(node: T): boolean {
  return !!(node.children && node.children.length);
}

/**
 * 获取parents的id路径和Array的index路径
 * @param tree
 * @param parents
 * @param path
 */
export function getFlattenedTreePathsAndParent(
  tree: TreeLikeData[],
  parents: ParentsInfo = [],
  path: PathInfo = [],
): FlattenedTreeNode {
  const res: FlattenedTreeNode = {
    parents: [],
    paths: [],
  };
  tree.forEach((node, index) => {
    if (nodeHasChildren(node) && isNodeExpanded(node)) {
      res.parents.push(parents.concat(node.id));
      res.paths.push(path.concat(index));
      const subTree = getFlattenedTreePathsAndParent(node.children!, parents.concat(node.id), path.concat(index));
      subTree.parents.forEach(p => {
        res.parents.push(p);
      });
      subTree.paths.forEach(p => {
        res.paths.push(p);
      });
    } else {
      res.parents.push(parents.concat(node.id));
      res.paths.push(path.concat(index));
    }
  });
  return res;
}

/**
 * 更新children的state属性
 * @param node
 * @param state
 */
export function updateChildrenNodeState<T extends TreeNode>(node: T, state: Partial<TreeNodeState>): T {
  if (node.children && node.children.length) {
    return {
      ...node,
      state: {
        ...node.state,
        ...state,
        checkedNum: state.checked ? node.children.length : 0,
      },
      children: node.children.map(child => updateChildrenNodeState(child, state)),
    };
  }
  return {
    ...node,
    state: {
      ...node.state,
      ...state,
    },
  };
}

/**
 * 获取pathInfo
 * @param tree
 * @param pathInfo
 */
export function getFlattenedTreePaths(tree: TreeLikeData[], pathInfo: PathInfo = []): PathInfo[] {
  const paths: PathInfo[] = [];
  tree.forEach((node, index) => {
    if (nodeHasChildren(node) && isNodeExpanded(node)) {
      paths.push(pathInfo.concat(index));
      const nextPathInfo = getFlattenedTreePaths(node.children!, pathInfo.concat(index));
      nextPathInfo.forEach(p => {
        paths.push(p);
      });
    } else {
      paths.push(pathInfo.concat(index));
    }
  });
  return paths;
}

// 更新选中态
function updateNodeSelection(nodes: TreeNode[], updateNode: FlatNode, depth: number): TreeNode[] {
  return nodes.map((node, index) => {
    // 节点本身
    if (node.id === updateNode.id) {
      return {
        ...node,
        state: {
          ...updateNode.state,
          checkedNum: updateNode.state.checked ? node.children?.length : 0,
        },
        children: node.children ? updateChildren(node.children, updateNode.state.checked) : [],
      };
    }
    // 同级别其他节点
    if (depth === updateNode.paths.length - 1) {
      return node;
    }
    // 父节点
    if (updateNode.paths[depth] === index) {
      depth++;
      const parentNode = {
        ...node,
        children: updateNodeSelection(node.children!, updateNode, depth),
      };
      parentNode.state = getCheckState(parentNode);
      return parentNode;
    }
    // 不相关的节点
    return node;
  });
}

function getCheckState(node: TreeNode) {
  if (node.children && node.children.length > 0) {
    let checkedNum = 0;
    let halfChecked = 0;
    for (const nodeElement of node.children) {
      if (nodeElement.state?.checked) {
        checkedNum++;
      } else if (nodeElement.state?.halfChecked) {
        halfChecked++;
      }
    }
    return {
      ...node.state,
      checkedNum,
      checked: checkedNum === node.children.length,
      halfChecked: halfChecked > 0,
    };
  }
  return node.state;
}

function updateChildren(nodes: TreeNode[], selected?: boolean): TreeNode[] {
  return nodes.map(n => ({
    ...n,
    children: n.children ? updateChildren(n.children, selected) : [],
    state: {
      ...n.state,
      checked: selected,
      checkedNum: selected ? n.children?.length : 0,
    },
  }));
}
