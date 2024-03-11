import { Suspense, useContext, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import { RouterContext } from '@/router/routerContext.ts';
import { Loading } from '@/pages/loading';
import type { ProSettings } from '@ant-design/pro-components';
import {
    getMenuData,
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
import MenuCard from '@/layout/components/MenuCard'
import SearchInput from '@/layout/components/SearchInput'


export default function Layout() {
    const { menus } = useContext(RouterContext);
    // 获取匹配到的路由
    const matches = useMatches();
    console.log(1111, matches)

    // 匹配的路由返回的是个数组，默认最后一个就是当前路由。
    // if (matches.length && !menus.some(menu => matches[matches.length - 1].pathname === menu.route)) {
    //     return (
    //         <div>403</div>
    //     )
    // }

    const { menuData } = getMenuData(menus);

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
        // <div style={{display: 'flex', gap: 20}}>
        //     <ul>
        //         {menus.map(menu => (
        //             <li key={menu.route}><Link to={menu.route}>{menu.name}</Link></li>
        //         ))}
        //     </ul>
        //     <Suspense fallback={<Loading/>}>
        //         <Outlet/>
        //     </Suspense>
        // </div>
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
                        route={{
                            routes: menuData
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
                        headerTitleRender={(logo, title, _) => {
                            const defaultDom = (
                                <a>
                                    {logo}
                                    {title}
                                </a>
                            );
                            if (typeof window === 'undefined') return defaultDom;
                            if (document.body.clientWidth < 1400) {
                                return defaultDom;
                            }
                            if (_.isMobile) return defaultDom;
                            return (
                                <>
                                    {defaultDom}
                                    <MenuCard/>
                                </>
                            );
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
                                    setPathname(item.path || '/welcome');
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
