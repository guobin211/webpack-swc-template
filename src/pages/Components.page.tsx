import React from 'react'
import { Layout } from 'antd'
import SideNav, { MenuData } from '../common/SideNav'
import { Route } from 'react-router-dom'
import VirtualizedListExample from '../example/VirtualizedListExample'
import VirtualizedTreeExample from '../example/VirtualizedTreeExample'
import DepartmentTreeExample from '../example/DepartmentTreeExample'
import InvitationTreeExample from '../example/InvitationTreeExample'

const {Sider, Content} = Layout

const defaultMenus: MenuData[] = [
    {title: 'VirtualizedList', path: '/components/virtualized-list', element: VirtualizedListExample},
    {title: 'VirtualizedTree', path: '/components/virtualized-tree', element: VirtualizedTreeExample},
    {title: 'DepartmentTree', path: '/components/department-tree', element: DepartmentTreeExample},
    {title: 'InvitationTree', path: '/components/invitation-tree', element: InvitationTreeExample}
]

function getPage(element: () => JSX.Element) {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider theme="light" width={255}>
                <SideNav menus={defaultMenus}/>
            </Sider>
            <Layout>
                <Content>
                    {element()}
                </Content>
            </Layout>
        </Layout>
    )
}

function ComponentsPage() {
    return defaultMenus.map((m, index) => (
        <Route key={index} path={m.path} element={getPage(m.element)}/>
    ))
}

export default ComponentsPage
