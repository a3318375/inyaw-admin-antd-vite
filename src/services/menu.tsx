// 模拟获取管理员菜单

export const getAdminMenus: () => Promise<string[]> = () => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve([
                '/page1',
                '/page2',
                '/page3',
            ]);
        }, 1000);
    });
};

// 模拟获取普通菜单
export const getUserMenus = () => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve([
                {
                    name: 'page1',
                    route: '/page1',
                    filePath: '/page1/index.tsx',
                },
            ]);
        }, 1000);
    });
};