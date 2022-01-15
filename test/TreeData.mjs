export function getTreeLikeData(config = { parent: '0', length: 3, depth: 3 }) {
  const res = [];
  for (let i = 0; i < config.length; i++) {
    const node = {
      id: `${config.parent}-${i}`,
      state: {
        expanded: config.depth > 0,
      },
    };
    if (config.depth > 1) {
      node.children = getTreeLikeData({
        parent: node.id,
        length: config.length,
        depth: config.depth - 1,
      });
    }
    res.push(node);
  }
  return res;
}
