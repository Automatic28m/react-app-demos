import React from "react";
import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';

function AppLayout() {
    const loadingIcon = <LoadingOutlined style={{ fontSize: 60, color: '#FFF' }} />

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            console.log(isLoading);
        }, 2000);
    }, [isLoading]);
    return (
        <>
            <Outlet />
            <Modal
                closable={false}
                centered
                open={isLoading}
                keyboard={false}
                footer={null}
                width={null}
                modalRender={() => <Spin spinning indicator={loadingIcon} />}
                transitionName=""
                maskTransitionName=""
                zIndex={isLoading ? 1000 : -1}
            />
        </>
    )
};

export default AppLayout;