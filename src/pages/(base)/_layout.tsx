import { useMemo, useState } from 'react';
import { useLocation, useMatches, useNavigate, useOutlet } from 'react-router-dom';
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
import { useTokenStore } from "@/hook/useTokenStore";
import { isPublicPath } from "@/router/publicPath";
import { useMenuOneStore, useMenuStore } from "@/hook/useMenuStore.tsx";

export interface KeepAliveTab {
    title: string;
    routePath: string;
    key: string;
    pathname: string;
    icon?: any;
    children: any;
}

export default function BaseLayout() {
    const [ tabs, setTabs ] = useState<KeepAliveTab[]>([]);
    const [ activeKey, setActiveKey ] = useState('');
    const [ routeList, setRouteList ] = useState<string[]>([]);
    const navigate = useNavigate()
    const onTabsChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };
    const menuStore = useMenuStore()
    const menuOneStore = useMenuOneStore()

    const matches = useMatches();
    const children = useOutlet();
    const { pathname } = useLocation();
    if(activeKey === '') {
        setActiveKey(pathname);
    }
    if(!routeList.includes(pathname)){
        setRouteList([ ...routeList, pathname ]);
        const lastRoute = matches.at(-1);
        const lastRouteName = lastRoute?.pathname !== '/' && lastRoute?.pathname.endsWith("/") ? lastRoute.pathname.substring(0,lastRoute.pathname.length -1): lastRoute?.pathname
        console.log(222, lastRouteName)
        if(lastRouteName?.startsWith('/article/blog/')){
        //if(lastRouteName?.includes('/add')){
            const existKeepAliveTab = tabs.find(o => o.routePath === pathname);
            // 如果不存在则需要插入
            if (!existKeepAliveTab) {
                setTabs([ ...tabs, {
                    title: lastRouteName?.includes('/add')?'新增':'编辑',
                    key: new Date().getTime().toString(),
                    routePath: pathname,
                    pathname,
                    children,
                } ]);
                setActiveKey(pathname);
            }
        }else{
            const menuObj = menuOneStore.menu.find(o => o.path === lastRouteName);
            const existKeepAliveTab = tabs.find(o => o.routePath === menuObj?.path);
            // 如果不存在则需要插入
            if (!existKeepAliveTab && menuObj) {
                setTabs([ ...tabs, {
                    title: menuObj.name || '',
                    key: new Date().getTime().toString(),
                    routePath: menuObj?.path || '/',
                    pathname,
                    children,
                } ]);
                setActiveKey(pathname);
            }
        }

        const menuObj = menuOneStore.menu.find(o => o.path === lastRouteName);
        const existKeepAliveTab = tabs.find(o => o.routePath === menuObj?.path);
        // 如果不存在则需要插入
        if (!existKeepAliveTab && menuObj) {
            setTabs([ ...tabs, {
                title: menuObj.name || '',
                key: new Date().getTime().toString(),
                routePath: menuObj?.path || '/',
                pathname,
                children,
            } ]);
        }
    }

    const tabItems = useMemo(() => {
        return tabs.map(tab => ({
            label: (
                <>
                    {tab.title}
                </>
            ),
            key: tab.routePath,
            children: (
                <div className='px-[16px]'>
                    {tab.children}
                </div>
            ),
            closable: tabs.length > 1, // 剩最后一个就不能删除了
        }))
    }, [ tabs ]);

    const token = useTokenStore.getState().token
    if (!isPublicPath() && !token) {
        navigate('/login')
    }

    const [ settings, setSetting ] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: false,
    });

    const [ layoutPathName, setLayoutPathName ] = useState('/list/sub-page/sub-sub-page1');
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
                                return menuStore.menu;
                            },
                        }}
                        location={{
                            pathname: layoutPathName,
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
                                    onTabsChange(item.path || '/welcome')
                                    setLayoutPathName(item.path || '/welcome')
                                    navigate(item.path || '/welcome')
                                }}
                            >
                                {dom}
                            </div>
                        )}
                        {...settings}
                    >
                        <PageContainer
                            tabList={tabItems}
                            tabProps={{
                                type: 'editable-card',
                                hideAdd: true,
                                onEdit: (e, action) => console.log(e, action),
                            }}
                            token={{
                                paddingBlockPageContainerContent: 0,
                            }}
                            onTabChange={onTabsChange}
                            tabActiveKey={activeKey}
                        >
                        </PageContainer>

                        <SettingDrawer
                            pathname={layoutPathName}
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
