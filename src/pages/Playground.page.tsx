import React, { useEffect, useRef, useState } from 'react'
import { Layout } from 'antd'
import VirtualizedTree from '../components/VirtualizedTree'
import { getTreeData } from '../example/VirtualizedTreeExample'
import type { TreeLikeData, TreeNode } from '../components/TreeData';

const {Content} = Layout
console.time('getTreeData')
const tree = getTreeData({expanded: true, level: 2, length: 10});
console.timeEnd('getTreeData')

function PlaygroundPage() {
    const [treeData] = useState<TreeNode[]>(tree)

    const treeHeight = 300
    const treeRef = useRef(null)

    const treeNodeRenderer = () => {
        return (
            <span>treeNodeRenderer</span>
        )
    }

    useEffect(() => {
        console.time('treeRef')
        if (treeRef.current) {
            console.log(treeRef.current)
            console.timeEnd('treeRef')
        }
    }, [treeRef.current])

    const isLazyNode = () => {
        return true;
    }

    const loadData = () => {
        return new Promise<TreeLikeData[]>(resolve => {
            setTimeout(() => {
                resolve(getTreeData({path: '0-0-0', expanded: false, level: 0, length: 2}))
            }, 1000)
        })
    }

    const renderNodeContent = (flatNode: any) => {
      return (
          <span>{flatNode.node.id}</span>
      )
    }

    return (
        <Layout>
            <Content>
                <div style={{height: treeHeight, width: 500, margin: '0 auto'}}>
                    <VirtualizedTree ref={treeRef}
                                     treeData={treeData}
                                     treeHeight={treeHeight}
                                     isLazyNode={isLazyNode}
                                     loadData={loadData}
                                     showNodeLoading={true}
                                     renderNodeContent={renderNodeContent}/>
                </div>
            </Content>
        </Layout>
    )
}

export default PlaygroundPage
