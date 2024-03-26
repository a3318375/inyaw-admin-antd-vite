<h1 align="center">Inyaw antd admin</h1>

<div align="center">中后台管理系统通用模板</div>

<p align="center">
  <a href="https://a3318375.github.io/inyaw-admin-antd-vite">在线演示</a>
</p>

### ✨ 特性
- 🔨 使用最新的vite v5.1.4并开启swc，别问我vite5啥新特性啥有点，我一个做后端的。
- 🌈 使用了阿里的 [Ant Design](https://ant.design/index-cn) 和 [pro-components](https://procomponents.ant.design)框架。在所有的中后台框架中，能像 [pro-components](https://procomponents.ant.design) 这么多功能的真的很稀有。
- 💥 使用了[@generouted/react-router](https://github.com/oedotme/generouted)做了约定式路由，由于它基于[react-router v6](https://reactrouter.com/en/main),所以同时也做到了鉴权 
- 👍 使用了[axios](https://www.axios-http.cn/) 用于请求，感觉就是比较轻量级，用起来爽。
- 🌏 使用 [zustand](https://zustand-demo.pmnd.rs/) 作为状态管理，一直不知道这玩意有啥用，感觉localstore啥的也一样啊。
- ☀  使用了[tailwindcss](https://tailwindcss.com/) 框架，但是多半没啥用，因为对于中后台没啥css要写。
- 🖥 使用了[mockjs](https://github.com/vbenjs/vite-plugin-mock)和[apifox](https://apifox.com)模拟数据
- 🛡 使用 **TypeScript** 开发，毕竟我个做后端的，感觉ts更靠谱。

### 📦 快速开始

```sh
pnpm i

pnpm run dev
```

### 💤 设计理念和个人想法

#### 登录
layout类似于公共页面，在layout判断zustand里是否有token，决定是否要登录。
同时axios的相应里，如果相应状态是302（也可以和后端约定），也跳到登录页。

#### 鉴权
登录后获取菜单和权限，这个也可以放到zustand里和token一起做持久化。
可以做一个类似于['code-001','code-002','code-003']这样的东西。
这样的话，跳转页面的判断可以放在layout里判断路由的跳转，按钮也可以获取这样的一个列表去做判断。