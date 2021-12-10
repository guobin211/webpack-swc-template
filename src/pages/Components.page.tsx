import { Layout } from 'antd';
import React from 'react';
import { Route } from 'react-router-dom';
import SideNav, { MenuData } from '../common/SideNav';
import DepartmentTreeExample from '../example/DepartmentTreeExample';
import InvitationTreeExample from '../example/InvitationTreeExample';
import VirtualizedListExample from '../example/VirtualizedListExample';
import VirtualizedTreeExample from '../example/VirtualizedTreeExample';

const { Sider, Content } = Layout;

const defaultMenus: MenuData[] = [
  { title: '', path: '/components', element: VirtualizedListExample },
  { title: 'VirtualizedList', path: '/components/virtualized-list', element: VirtualizedListExample },
  { title: 'VirtualizedTree', path: '/components/virtualized-tree', element: VirtualizedTreeExample },
  { title: 'DepartmentTree', path: '/components/department-tree', element: DepartmentTreeExample },
  { title: 'InvitationTree', path: '/components/invitation-tree', element: InvitationTreeExample }
];

const menus = defaultMenus.map(menu => {
  if (menu.title) {
    return menu;
  }
  return null;
}).filter(Boolean) as MenuData[];

function getPage(element: () => JSX.Element) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" width={255}>
        <SideNav menus={menus}/>
      </Sider>
      <Layout>
        <Content>
          {element()}
        </Content>
      </Layout>
    </Layout>
  );
}

function ComponentsPage() {
  return defaultMenus.map((m, index) => (
    <Route key={index} path={m.path} element={getPage(m.element)}/>
  ));
}

export default ComponentsPage;
