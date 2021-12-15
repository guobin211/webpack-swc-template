import { getTreeLikeData } from './TreeData.mjs';
import { TreeMapper } from './TreeMapper.mjs';

// @Test length 100000 TreeMapper: 51.531ms
const tree = getTreeLikeData({ parent: '0', length: 10, depth: 5 });

console.time('TreeMapper');
const treeMapper = new TreeMapper(tree);
console.timeEnd('TreeMapper');
console.log('length', treeMapper.pathList.length);
