import React, { CSSProperties, useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import type { RowInfo } from '../components/VirtualizedList'
import VirtualizedList from '../components/VirtualizedList'

export default function VirtualizedListExample() {
    const list = new Array(20000).fill(0)
    const height = '300px'
    const rowHeight = 30
    const style: CSSProperties = {
        height,
        overflowY: 'auto'
    }

    const rowRenderer = (data: any, row: RowInfo) => {
        return <li style={{height: rowHeight}} key={row.index}>index: {row.index}, data: {data} </li>
    }

    const [count, setCount] = useState(20)

    useEffect(() => {
        const timer = setTimeout(() => {
            const dom = document.querySelector('div.ReactVirtualized__Grid__innerScrollContainer')
            if (dom) {
                setCount(dom.children.length)
            }
        }, 16)
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <Row>
            <Col span={12}>
                <h1>普通列表</h1>
                <h1>数据长度 {list.length}</h1>
                <h1>节点数量 {list.length}</h1>
                <ol style={style}>
                    {list.map((item, index) => rowRenderer(item, {index} as any))}
                </ol>
            </Col>
            <Col span={12}>
                <h1>VirtualList</h1>
                <h1>数据长度 {list.length}</h1>
                <h1>节点数量 {count} = (height / rowHeight) * 2</h1>
                <ol style={style}>
                    <VirtualizedList rows={list} rowHeight={rowHeight} rowRenderer={rowRenderer}/>
                </ol>
            </Col>
        </Row>
    )
}
