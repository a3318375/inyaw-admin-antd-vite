import './App.css'
import { Routes } from '@generouted/react-router'
import { App as AntdApp, ConfigProvider } from 'antd'
import AntdStatic from "@/components/AntdStatic";

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
