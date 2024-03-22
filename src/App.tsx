import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from '@generouted/react-router'
import { App as AntdApp, ConfigProvider } from 'antd'
import AntdStatic from "@/components/AntdStatic";

const Routes = () => <RouterProvider router={createBrowserRouter(routes, { basename:  import.meta.env.BASE_URL })} />
function App() {
    return (
        <ConfigProvider>
            <AntdApp>
                <Routes/>
                <AntdStatic />
            </AntdApp>
        </ConfigProvider>
    )
}

export default App
