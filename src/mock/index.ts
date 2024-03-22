import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/api/post',
        method: 'post',
        timeout: 2000,
        response: {
            code: 0,
            data: {
                name: 'vben',
            },
        },
    },
    {
        url: '/api/login',
        method: 'post',
        response: {
            code: 1,
            data: 'TOKEN114514',
        },
    },
    {
        url: '/api/getUserInfo',
        method: 'get',
        response: {
            code: 1,
            data: {
                name: 'Serati Ma',
                avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                email: 'antdesign@alipay.com',
            },
        },
    },
    {
        url: '/api/text',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody = ''
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
    {
        url: '/api/getMenuList',
        method: 'get',
        response: {
            code: 1,
            data: [
                {
                    path: '/',
                    name: '欢迎',
                    routes: [
                        {
                            path: '/welcome',
                            name: 'one',
                            routes: [
                                {
                                    path: '/welcome/welcome',
                                    name: 'two',
                                    exact: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: '/demo',
                    name: '例子',
                },
            ]
        },
    },
] as MockMethod[]
