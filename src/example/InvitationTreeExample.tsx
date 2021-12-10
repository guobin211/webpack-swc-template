import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

export default function InvitationTreeExample() {
  const list = new Array(1000).fill(0);

  const [count, setCount] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cell = document.querySelector('div.ReactVirtualized__Grid__innerScrollContainer');
      if (cell) {
        setCount(cell.children.length);
      }
    }, 16);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Row>
      <Col span={12}>
        <h1>普通列表</h1>
        <h1>数据长度 {list.length}</h1>
        <h1>节点数量 {list.length}</h1>
        InvitationTreeExample
      </Col>
      <Col span={12}>
        <h1>VirtualList</h1>
        <h1>数据长度 {list.length}</h1>
        <h1>节点数量 {count} = (height / rowHeight) * 2</h1>
        InvitationTreeExample
      </Col>
    </Row>
  );
}
