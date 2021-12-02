function testSplice() {
    const arr = [0, 1, 2, 3, 4];
    const index = 4;
    arr.splice(index + 1, 0);
    console.log(arr);
}

testSplice();


function testAppend() {
    const pathInfos = [0,1,5,6,7];
    const childPathInfo = [2,3,4]
    const pathIndex = 1;

    const res = []
    const newLength = pathInfos.length + childPathInfo.length;
    console.log('newLength', newLength);
    const prvIndex = pathIndex + childPathInfo.length - 1;
    for (let i = 0; i < newLength; i++) {
        if (i <= pathIndex) {
            res.push(pathInfos[i]);
        } else if (i <= pathIndex + childPathInfo.length) {
            res.push(childPathInfo[i - childPathInfo.length + 1])
        } else {
            res.push(pathInfos[i - prvIndex]);
        }
    }
    console.log(res);
}

testAppend()
