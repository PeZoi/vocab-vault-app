import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { MENU_HOME } from 'utils';
import { Header } from './Header';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   return (
      <Layout className="min-h-[100vh] relative">
         <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: colorBgContainer }}>
            <div
               className="sticky top-0"
               style={{
                  zIndex: 10,
               }}
            >
               <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: '16px',
                     width: '100%',
                     height: 64,
                  }}
               />
               <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={[pathname]}
                  items={MENU_HOME}
                  onClick={({ key }) => {
                     navigate(key);
                  }}
               />
            </div>
         </Sider>
         <Layout className='relative'>
            <Header />

            <Content
               style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
               }}
            >
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};
