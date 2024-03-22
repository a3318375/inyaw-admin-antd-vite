import { Outlet } from "react-router-dom";
import { ProConfigProvider } from "@ant-design/pro-components";

export default function AuthLayout() {
    return (
        <ProConfigProvider dark>
            <Outlet/>
        </ProConfigProvider>
    )
}