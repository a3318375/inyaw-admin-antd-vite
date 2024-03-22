import { Suspense, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loading } from '@/pages/loading';
import type { ProSettings } from '@ant-design/pro-components';
import {
    PageContainer,
    ProConfigProvider,
    ProLayout,
    SettingDrawer,
} from '@ant-design/pro-components';
import {
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    QuestionCircleFilled,
} from '@ant-design/icons';
import { ConfigProvider, Dropdown } from "antd";
import SearchInput from '@/components/layout/SearchInput'
import http from "@/services/axios.ts";
import { useTokenStore } from "@/hook/useTokenStore";
import { isPublicPath } from "@/router/publicPath";

export default function BaseLayout() {
    const navigate = useNavigate()
    const token = useTokenStore.getState().token
    console.log(2222, token, !isPublicPath())
    if(!isPublicPath() && !token){
        navigate('/login')
    }

    const [ settings, setSetting ] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: false,
    });

    const [ pathname, setPathname ] = useState('/list/sub-page/sub-sub-page1');
    if (typeof document === 'undefined') {
        return <div/>;
    }
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <ProConfigProvider hashed={false}>
                <ConfigProvider
                    getTargetContainer={() => {
                        return document.getElementById('test-pro-layout') || document.body;
                    }}
                >
                    <ProLayout
                        prefixCls="my-prefix"
                        bgLayoutImgList={[
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                left: 85,
                                bottom: 100,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                                bottom: -68,
                                right: -45,
                                height: '303px',
                            },
                            {
                                src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                                bottom: 0,
                                left: 0,
                                width: '331px',
                            },
                        ]}
                        menu={{
                            request: async () => {
                                return await http.get('/api/getMenuList')
                            },
                        }}
                        location={{
                            pathname,
                        }}
                        token={{
                            header: {
                                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                            },
                        }}
                        siderMenuType="group"
                        avatarProps={{
                            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                            size: 'small',
                            title: '七妮妮',
                            render: (_props, dom) => {
                                return (
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'logout',
                                                    icon: <LogoutOutlined/>,
                                                    label: '退出登录',
                                                },
                                            ],
                                        }}
                                    >
                                        {dom}
                                    </Dropdown>
                                );
                            },
                        }}
                        actionsRender={(props) => {
                            if (props.isMobile) return [];
                            if (typeof window === 'undefined') return [];
                            return [
                                props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                                    <SearchInput/>
                                ) : undefined,
                                <InfoCircleFilled key="InfoCircleFilled"/>,
                                <QuestionCircleFilled key="QuestionCircleFilled"/>,
                                <GithubFilled key="GithubFilled"/>,
                            ];
                        }}
                        menuFooterRender={(props) => {
                            if (props?.collapsed) return undefined;
                            return (
                                <div
                                    style={{
                                        textAlign: 'center',
                                        paddingBlockStart: 12,
                                    }}
                                >
                                    <div>© 2021 Made with love</div>
                                    <div>by Ant Design</div>
                                </div>
                            );
                        }}
                        onMenuHeaderClick={(e) => console.log(e)}
                        menuItemRender={(item, dom) => (
                            <div
                                onClick={() => {
                                    console.log(333, item)
                                    setPathname(item.path || '/welcome')
                                    navigate(item.path || '/welcome')
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        {...settings}
                    >
                        <PageContainer
                            tabList={[
                                {
                                    tab: '基本信息',
                                    key: 'base',
                                    closable: false,
                                },
                                {
                                    tab: '详细信息',
                                    key: 'info',
                                },
                            ]}
                            tabProps={{
                                type: 'editable-card',
                                hideAdd: true,
                                onEdit: (e, action) => console.log(e, action),
                            }}
                            token={{
                                paddingBlockPageContainerContent: 0,
                            }}
                        >
                            <Suspense fallback={<Loading/>}>
                                <Outlet/>
                            </Suspense>
                        </PageContainer>

                        <SettingDrawer
                            pathname={pathname}
                            enableDarkTheme
                            getContainer={(e: any) => {
                                if (typeof window === 'undefined') return e;
                                return document.getElementById('test-pro-layout');
                            }}
                            settings={settings}
                            onSettingChange={(changeSetting) => {
                                setSetting(changeSetting);
                            }}
                            disableUrlParams={false}
                        />
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </div>
    )
}
