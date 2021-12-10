/**
 * @type {number[]}
 */
const dataList = new Array(1000)
  .fill('0')
  .reduce((prev, _, index) => {
    prev.push(index);
    return prev;
  }, []);

const pathIndex = 100;
const pathIndexChildren = [-1, -2, -3, -4, -5];

/**
 *
 * @param list {number[]}
 * @param index {number}
 * @returns {*[]}
 * while:  0.152ms
 * for:  0.156ms
 */
function getPrevList(list, index) {
  const resList = [];
  let i = 0;
  for (; i <= index; i++) {
    resList.push(list[i]);
  }
  return resList;
}

/**
 * 添加
 * @returns {*[]}
 * @test splice: 0.12 , for: 0.12
 */
function appendTest() {
  // const prev = getPrevList(dataList, pathIndex);
  // const next = dataList.slice(pathIndex + 1);
  const prev = dataList.splice(0, pathIndex + 1);
  return prev.concat(pathIndexChildren).concat(dataList);
}

console.time('appendTest');
const resList = appendTest();
console.timeEnd('appendTest');
console.assert(resList.length === dataList.length + pathIndexChildren.length, 'appendTest');

/**
 * 删除子节点
 * @returns {number[]}
 */
function removeTest() {
  return dataList.splice(pathIndex, pathIndexChildren.length);
}

console.time('removeTest');
const nextList = removeTest();
console.timeEnd('removeTest');
console.log(nextList.length);
console.log(dataList.length);

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
