import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import type { FlattenedNode, TreeNode, TreeNodeRenderer } from '../components/VirtualizedTree'
import VirtualizedTree from '../components/VirtualizedTree'
import classnames from 'classnames'

/**
 * 模拟数据
 */
export function getTreeData(path = '0', level = 4, count = 5): TreeNode[] {
    const list: TreeNode[] = []
    for (let i = 0; i < count; i += 1) {
        const key = `${path}-${i}`
        const treeNode: TreeNode = {
            id: key,
            name: `name-${key}`,
            state: {
                expanded: true,
                checked: false,
                disabled: false
            },
            children: []
        }

        if (level > 0) {
            treeNode.children = getTreeData(key, level - 1, count)
        }

        list.push(treeNode)
    }
    return list
}

export const defaultTreeData = getTreeData()

export default function VirtualizedTreeExample() {
    const [treeData, _setTreeData] = useState<TreeNode[]>(defaultTreeData)

    const treeHeight = 300
    const rowHeight = 30
    const [count, setCount] = useState(20)

    useEffect(() => {
        setTimeout(() => {
            const dom = document.querySelector('div.ReactVirtualized__Grid__innerScrollContainer')
            if (dom) {
                setCount(dom.children.length)
            }
        }, 16)
    }, [])

    const handleExpandClick = (node: FlattenedNode) => {
        console.log('handleExpandClick', node)
    }

    const treeNodeRenderer: TreeNodeRenderer = (node) => {
        const pl = 20 * node.deepness
        const {checked, disabled, halfChecked} = node.state || {}
        return (
            <div style={{height: rowHeight, paddingLeft: pl}}>
                <span>
                    <input type="checkbox"
                           onClick={() => handleExpandClick(node)}
                           className={classnames(halfChecked && 'halfChecked')}
                           checked={checked}
                           disabled={disabled}/>
                </span>
                name: {node.name}
            </div>
        )
    }

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
                <VirtualizedTree treeData={treeData} treeHeight={treeHeight} treeNodeRenderer={treeNodeRenderer}/>
            </Col>
        </Row>
    )
}
