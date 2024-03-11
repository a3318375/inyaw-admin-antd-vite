import { RouterProvider } from 'react-router-dom'
import './App.css'
import { getAdminMenus } from "@/services/menu.tsx"
import { lazy, useEffect, useState } from 'react'
import router from "@/router";
import { RouterContext } from '@/router/routerContext';
import { RouterType } from "@/types";


const modules = import.meta.glob('./pages/*/index.tsx');
const components = Object.keys(modules).reduce<Record<string, any>>((prev, cur) => {
    prev[cur.replace('./pages', '')] = modules[cur];
    return prev;
}, {}) as any;

function App() {
    const [ menus, setMenus ] = useState<RouterType[]>([]);

    useEffect(() => {
        getAdminMenus().then((adminMenus: RouterType[]) => {
            setMenus(adminMenus);

            // 获取菜单后动态添加路由
            router.routes[0].children = adminMenus.map((menu: RouterType) => ({
                path: menu.path,
                Component: lazy(components[menu.filePath]),
                id: menu.filePath
            }));
        })
    }, []);



    return (
        <RouterContext.Provider value={{ menus }}>
            <RouterProvider router={router}/>
        </RouterContext.Provider>
    )
}

export default App
