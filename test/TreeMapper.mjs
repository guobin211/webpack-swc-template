/**
 * 平铺树
 * @param tree
 * @param path
 * @returns {*[]}
 */
export function flatten(tree, path = []) {
  let pathList = [];
  let node, currentPath, nextPathList;
  for (let i = 0; i < tree.length; i++) {
    node = tree[i];
    currentPath = path.concat(i);
    if (node.children && node.children.length) {
      nextPathList = this.flatten(node.children, currentPath);
      pathList = pathList.concat(nextPathList);
    } else {
      pathList.push(currentPath);
    }
  }
  return pathList;
}

/**
 * 添加子节点的路径
 * @notice 修改了原数组pathList
 * @param pathList {number[][]}
 * @param pathIndex {number}
 * @param childrenPathList {number[][]}
 */
export function appendChildPath(pathList, pathIndex, childrenPathList) {
  const prev = pathList.splice(0, pathIndex + 1);
  return prev.concat(childrenPathList).concat(pathList);
}

/**
 * 删除子节点的路径
 * @param pathList {number[][]}
 * @param pathIndex {number}
 * @param childLength {number}
 * @return {number[][]}
 */
export function removeChildPath(pathList, pathIndex, childLength) {
  return pathList.splice(pathIndex, childLength);
}


export class TreeMapper {
  constructor(tree) {
    this.tree = tree;
    this.pathList = flatten(tree);
  }

  normalize(tree, treeProps) { }

  /**
   * @param updateNode {FlatNode}
   */
  updateNodeSelection(updateNode) {
    if (updateNode.children && updateNode.children.length) {
      const childPath = flatten(updateNode.children, updateNode.paths);
      this.pathList = appendChildPath(this.pathList, updateNode.index, childPath);
    } else {
      return this.pathList;
    }
  }

  updateNodeExpanded(updateNode) {}
}
