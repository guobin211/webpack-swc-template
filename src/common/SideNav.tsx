import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { MenuClickEventHandler } from 'rc-menu/lib/interface'

export interface SideNavProps {
    menus: MenuData[]
}

export interface MenuData {
    path: string;
    title: string;
    element: () => JSX.Element;
}

function SideNav(props: SideNavProps) {
    const { menus } = props;
    const navigate = useNavigate();

    const handleClick: MenuClickEventHandler = (info) => {
        const [path] = info.keyPath;
        if (path) {
            navigate(path)
        }
    }

    return (
        <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            {menus.map(menu => (
                <Menu.Item key={menu.path}>
                    {menu.title}
                </Menu.Item>
            ))}
        </Menu>
    )

}

export default SideNav;
