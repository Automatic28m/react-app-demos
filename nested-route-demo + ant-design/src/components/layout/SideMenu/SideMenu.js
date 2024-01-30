import React, { useState } from 'react';
import { Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MenuList } from './MenuList';
import Sider from 'antd/es/layout/Sider';
import css from './Sidemenu.module.css'
import appLogo from '../../../asset/react.png';
import appFullLogo from '../../../asset/React-Symbol.png';
// import SideMenu from '../../SideMenu/SideMenu';

const SideMenu = () => {
    const navigate = useNavigate();

    const [isSideMenuCollapsed, setMenuCollapsed] = useState(false);

    const onClick = ({ key }) => {
        // console.log('click ', e.key);
        navigate(key);
    };
    return (
        <Sider
            width={300}
            collapsedWidth={100}
            collapsible
            collapsed={isSideMenuCollapsed}
            onCollapse={(value) => setMenuCollapsed(value)}
            className={css.sider}
            trigger={
                <div className={css.trigger}>
                    {isSideMenuCollapsed ? (
                        <MenuFoldOutlined />
                    ) : (
                        <MenuUnfoldOutlined className={css.triggerMenuOutlined} />
                    )}
                </div>
            }
        >
            {isSideMenuCollapsed ? (
                <div className={css.logobg}>
                    <img className={css.logo} src={appLogo} alt="logo" />
                </div>
            ) : (
                <div className={css.logobg}>
                    <img className={css.logo} src={appFullLogo} alt="logo" />
                </div>
            )}
            <Menu
                className={css.siderMenu}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                // theme="dark"
                // inlineCollapsed={collapsed}
                onClick={onClick}
                items={MenuList}
            />
        </Sider >
    );
};

export default SideMenu;