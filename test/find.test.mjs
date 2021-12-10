function getTree() {
  const treeList = [];
  for (let i = 0; i < 3; i++) {
    treeList.push({
      id: `0-${i}`, children: [{
        id: `0-${i}-0`
      }, {
        id: `0-${i}-1`
      }]
    });
  }
  return treeList;
}

const tree = getTree();

/**
 * 查找node
 * @param pathInfo {number[]}
 * @param tree {object[]}
 * @returns {object} Readonly 返回的node为只读
 */
export function findByPath(pathInfo, tree) {
  if (!pathInfo || !pathInfo.length) {
    return;
  }
  if (pathInfo.length === 1) {
    return tree[pathInfo[0]];
  }
  let pathIndex = 1;
  let treeNodeRef = tree[pathInfo[0]];
  while (pathIndex < pathInfo.length) {
    if (treeNodeRef && treeNodeRef.children) {
      const nextIndex = pathInfo[pathIndex];
      treeNodeRef = treeNodeRef.children[nextIndex];
    }
    pathIndex++;
  }
  return treeNodeRef;
}

const path = [0, 1];

const result = findByPath(path, tree);

console.log('findByPath', result);

console.log(result.id);

console.log(tree[0].children[1]);

