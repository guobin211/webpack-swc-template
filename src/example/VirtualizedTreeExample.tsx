import { Col, Row } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { TreeLikeData, TreeNode } from '../components/TreeData';
import VirtualizedTree from '../components/VirtualizedTree';

export interface TreeConfig {
  path: string,
  level: number,
  length: number,
  checked: boolean,
  expanded: boolean,
  disabled: boolean,
}

const CONFIG = {
  path: '0',
  level: 3,
  length: 3,
  checked: false,
  expanded: true,
  disabled: false
};

/**
 * 模拟数据
 */
export function getTreeData(config?: Partial<TreeConfig>): TreeLikeData[] {
  const { path, level, length, checked, expanded, disabled } = Object.assign({}, CONFIG, config);
  const list: TreeLikeData[] = [];
  for (let i = 0; i < length; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: TreeLikeData = {
      id: key,
      name: `name-${key}`,
      state: {
        checked,
        disabled,
        expanded: level === 0 ? false : expanded
      }
    };
    if (level > 0) {
      treeNode.children = getTreeData({ ...config, level: level - 1, path: key });
    }
    list.push(treeNode);
  }
  return list;
}

export const defaultTreeLikeData = getTreeData();

export default function VirtualizedTreeExample() {
  const [treeData] = useState<TreeNode[]>(defaultTreeLikeData);

  const treeHeight = 300;
  const rowHeight = 30;
  const [count, setCount] = useState(20);

  useEffect(() => {
    setTimeout(() => {
      const dom = document.querySelector('div.ReactVirtualized__Grid__innerScrollContainer');
      if (dom) {
        setCount(dom.children.length);
      }
    }, 16);
  }, []);

  const handleExpandClick = (node: TreeNode) => {
    console.log(node);
  };

  const handleCheckedClick = (node: TreeNode) => {
    console.log(node);
  };

  const renderNodeContent = (node: any) => {
    const pl = 20 * node.deepness;
    const { checked, disabled, halfChecked } = node.state || {};
    return (
      <div style={{ height: rowHeight, paddingLeft: pl }}>
                <span>
                    <input type="checkbox"
                           onClick={() => handleCheckedClick(node)}
                           onChange={() => {
                           }}
                           className={classnames(halfChecked && 'halfChecked')}
                           checked={checked}
                           disabled={disabled}/>
                </span>
        <span onClick={() => handleExpandClick(node)}>
                  name: {node.name}
                </span>
      </div>
    );
  };

  return (
    <Row>
      <Col span={12}>
        <h1>普通树</h1>
        <h1>数据长度 {treeData.length}</h1>
        Tree
      </Col>
      <Col span={12}>
        <h1>VirtualTree</h1>
        <h1>数据长度 {treeData.length}</h1>
        <h1>节点数量 {count} = (height / rowHeight) * 2</h1>
        <VirtualizedTree treeData={treeData} treeHeight={treeHeight} renderNodeContent={renderNodeContent}/>
      </Col>
    </Row>
  );
}
