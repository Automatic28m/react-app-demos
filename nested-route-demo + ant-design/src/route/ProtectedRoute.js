import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/layout/SideMenu/SideMenu";
import Appbar from "../components/layout/Appbar";

const { Content, Footer } = Layout;

function ProtectedRoute() {
    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
            <SideMenu />
            <Layout style={{
                marginLeft: 300,
                // background: 'lightGray',
            }}>
                <Appbar />
                <Content style={{ padding: 24, paddingTop: 88 }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', fontWeight: '300' }}>
                    © 2022 ทดสอบ (v.1.0.3)
                </Footer>
            </Layout>
        </Layout>
    )
}

export default ProtectedRoute;