import { findByPath } from './find.test.mjs';

function getTree() {
  const treeList = [];
  for (let i = 0; i < 3; i++) {
    treeList.push({
      id: `0-${i}`,
      children: [
        {
          id: `0-${i}-0`,
        },
      ],
    });
  }
  return treeList;
}

const tree = getTree();

const firstChild = tree[0];

console.log('firstChild', firstChild);
// case 1
console.time('Reflect.set');
Reflect.set(firstChild, 'children', firstChild.children.concat({ id: '0-0-1' }));
console.timeEnd('Reflect.set');

// case 2
// console.time('firstChild.children');
// firstChild.children = [...firstChild.children, { id: '0-0-1' }]
// console.timeEnd('firstChild.children');
// console.log('firstChild', firstChild);

console.log('tree', tree);

/**
 * 更新node的State状态
 * @param tree
 * @param path
 * @param state
 */
function updateTreeNodeState(tree, path, state) {
  const node = findByPath(path, tree);
  if (node) {
    Reflect.set(node, 'state', state);
  }
}

console.time('updateTreeNodeState');
updateTreeNodeState(tree, [0, 0], { expended: true });
console.timeEnd('updateTreeNodeState');

console.log('updateTreeNodeState', tree[0].children);
