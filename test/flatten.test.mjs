/* eslint-disable */
let length = 0;

export function generate(config = { parent: '0', length: 1000, depth: 1 }) {
  const res = [];
  for (let i = 0; i < config.length; i++) {
    length++;
    const node = {
      id: `${config.parent}-${i}`,
      state: {
        expanded: config.depth > 0,
      },
    };
    if (config.depth > 0) {
      node.children = generate({
        parent: node.id,
        length: config.length,
        depth: config.depth - 1,
      });
    }
    res.push(node);
  }
  return res;
}

console.time('generate');
const tree = generate();
console.timeEnd('generate');

/**
 *
 * @param treeNodes {TreeNode[]}
 * @return {*}
 */
function getFlattenIds(treeNodes) {
  return treeNodes.reduce((cur, node) => {
    cur.push([node.id]);
    if (node.children && node.children.length && node.state.expanded) {
      for (const subPath of getFlattenIds(node.children)) {
        cur.push(subPath);
      }
      return cur;
    }
    return cur;
  }, []);
}

console.time('flatten');
const flattenIds = getFlattenIds(tree);
console.timeEnd('flatten');

// console.log('flattenNodes', flattenNodes)

/**
 *
 * @param treeNodes {TreeNode[]}
 * @param parents {string[]}
 * @return {*}
 */
function getFlattenIdPath(treeNodes, parents = []) {
  const res = [];
  treeNodes.forEach((node) => {
    const currentPath = parents.concat(node.id);
    res.push(currentPath);
    if (node.children && node.children.length && node.state.expanded) {
      getFlattenIdPath(node.children, currentPath).forEach((path) => {
        res.push(path);
      });
    }
  });
  return res;
}

console.time('flattenWithFor');
const flattenPath = getFlattenIdPath(tree);
console.timeEnd('flattenWithFor');

// console.log('flatten2', flatten2)

/**
 *
 * @param treeNodes {TreeNode[]}
 * @param pathInfo {{parents: string, paths: string}}
 * @return {{parents: string, paths: string}[]}
 */
function getFlattenInfoNodes(treeNodes, pathInfo = { parents: '', paths: '' }) {
  const flatNodes = [];
  for (let i = 0; i < treeNodes.length; i++) {
    const node = treeNodes[i];
    const current = {
      parents: `${pathInfo.parents}-${node.id}`,
      paths: `${pathInfo.paths}-${i}`,
    };
    flatNodes.push(current);
    if (node.children && node.children.length && node.state.expanded) {
      const subNodes = getFlattenInfoNodes(node.children, current);
      for (let j = 0; j < subNodes.length; j++) {
        flatNodes.push(subNodes[j]);
      }
    }
  }
  return flatNodes;
}

console.time('getFlattenNodes');
const flatInfoNodes = getFlattenInfoNodes(tree);
console.timeEnd('getFlattenNodes');

console.assert(flattenIds.length, flattenPath.length);
console.assert(flattenIds.length, flatInfoNodes.length);
