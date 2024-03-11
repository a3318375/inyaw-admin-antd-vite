import { createBrowserRouter } from 'react-router-dom'
import NotFound from '@/pages/notFound.tsx'
import Layout from '@/layout'
export const router = createBrowserRouter([ {
    path: '/',
    Component: Layout,
    children: [],
}, {
    path: '*',
    Component: NotFound,
} ]);

export default router
