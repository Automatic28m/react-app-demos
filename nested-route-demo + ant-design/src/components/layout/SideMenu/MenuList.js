import { HomeFilled, LoginOutlined, MailFilled, PhoneFilled, NotificationFilled } from '@ant-design/icons';
import { routePath } from '../../../constant/route';
import Report from '../../../features/Report';


const MenuList = [
    {
        label: 'login',
        icon: <LoginOutlined />,
        key: routePath.login
    },
    {
        type: 'divider',
    },
    {
        label: 'Home',
        icon: <HomeFilled />,
        key: routePath.home,
        children: [
            {
                label: 'Home',
                icon: <HomeFilled />,
                key: routePath.home,
            },
        ],
    },
    {
        label: 'Contact',
        icon: <PhoneFilled />,
        key: routePath.contact
    },
    {
        label: 'Inbox',
        icon: <MailFilled />,
        key: routePath.inbox
    },
    {
        label: 'Report',
        icon: <NotificationFilled />,
        key: routePath.report
    },
]

export { MenuList };