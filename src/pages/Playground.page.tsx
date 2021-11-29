import React, { useEffect, useRef, useState } from 'react'
import { Layout } from 'antd'
import VirtualizedTree, { TreeNode } from '../components/VirtualizedTree'
import { defaultTreeData } from '../example/VirtualizedTreeExample'

const {Content} = Layout

function PlaygroundPage() {
    const [treeData] = useState<TreeNode[]>(defaultTreeData)

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

    return (
        <Layout>
            <Content>
                <div style={{height: treeHeight, width: 500, margin: '0 auto'}}>
                    <VirtualizedTree ref={treeRef} treeData={treeData} treeHeight={treeHeight}
                                     treeNodeRenderer={treeNodeRenderer}/>
                </div>
            </Content>
        </Layout>
    )
}

export default PlaygroundPage
