import { Layout, Space, Typography, Dropdown, Badge } from "antd";
import css from './Appbar.module.css';
import {
    DownCircleOutlined,
    NotificationOutlined,
} from '@ant-design/icons'

const { Text } = Typography;

function Appbar() {
    return (
        <Layout className={css.appbar} style={{ paddingRight: 300 }}>
            <div className={css.breadcrumbContainer}>
                <Text strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, modi!</Text>
            </div>
            <Space direction="vertical" className={css.name}>
                <Text strong>นายพัลลภ บุญเหลือ</Text>
                <Text strong className={css.position}>DIV01</Text>
            </Space>
            <Dropdown trigger={['click']}>
                <Badge>
                    <NotificationOutlined className={css.notiIcon} />
                </Badge>
            </Dropdown>
            <Dropdown>
                <DownCircleOutlined className={[css.notiIcon, css.moreIcon]} />
            </Dropdown>
        </Layout>
    )
}

export default Appbar;