import { Outlet, useNavigate } from "react-router-dom";
import { useTokenStore } from "@/hook/useTokenStore.tsx";
import { isPublicPath } from '@/router/publicPath';
export const Layout = () => {
    const navigate = useNavigate();
    const token = useTokenStore.getState().token
    if(!isPublicPath && !token){
        navigate('/login')
    }
    return (
        <Outlet />
    );
}