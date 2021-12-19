module.exports = {
    title: 'gang\'s blog',
    description: '我的个人网站',
    // permalink: "/:year/:month/:day/:slug", // 使用全局配置来向所有页面应用永久链接
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    port: 8086,
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 右侧导航栏配置，默认指向目录下的 README.md 文件
            { text: '主页', link: '/' },
            { text: '指南', link: '/guide/' },
            // { text: '生活', link: '/node/'},
            { text: '温故',
                items: [
                    { text: '前端', link: '/node/' },
                    {text: '算法题库', link: '/algorithm/'},
                    // { text: '英语', link: '/study/english/english01' },
                    // { text: '数学', link: '/study/math/math01' },
                ]
            }
        ],
        // sidebar: 'auto', // 侧边栏配置
        sidebar: {
            '/': [
                {
                    title: '浏览器相关',
                    collapsable: true,
                    children: [
                        { title: 'url到 UI 渲染过程', path: '/browser/浏览器API/01.url到 UI 渲染过程' },
                        { title: '浏览器API', path: '/browser/浏览器API/设备振动，屏幕强度，横竖屏，电池' },
                        { title: '性能查看与监控', path: '/browser/浏览器API/DOM 性能API' },
                        // { title: '第三节', path: '/browser/API/english03' },
                    ]
                },
                {
                    title: 'node',
                    collapsable: true,
                    children: [
                        { title: '介绍', path: '/node/' },
                        { title: '内置模块', path: '/node/02.内置模块' },
                        { title: '常用第三方模块', path: '/node/03.第三方模块' },
                    ]
                },
                {
                    title: 'babel 系列',
                    collapsable: true,
                    children: [
                        { title: 'babel 系列', path: '/babel/1.使用方式' },

                    ]
                },
                {
                    title: 'webpack',
                    collapsable: true,
                    children: [
                        { title: 'webpack 3时代', path: '/webpack/01.url到 UI 渲染过程' },

                    ]
                },
                {
                    title: '记不住的 js',
                    collapsable: true,
                    children: [
                        { title: '01.记不住的js', path: '/javascript/01.记不住的js' },
                        { title: '02.记不住的js之二', path: '/javascript/02.记不住的js之二' },
                        { title: '02.记不住的js之三', path: '/javascript/02.记不住的js之三' },
                    ]
                },
                {
                    title: 'git 系列',
                    collapsable: true,
                    children: [
                        { title: '01.基础与常见命令', path: '/git/01.基础与常见命令' },
                        // { title: 'stash 与 rebase', path: '/git/stash与rebase' },
                        // { title: 'git 公钥', path: '/git/' },
                    ]
                },


            ],
            // '/browser/': [
            //     {
            //         title: '浏览器相关',
            //         collapsable: true,
            //         children: [
            //             { title: 'url到 UI 渲染过程', path: '/' },
            //             { title: '浏览器API', path: '/browser/浏览器API/设备振动，屏幕强度，横竖屏，电池' },
            //             { title: '性能查看与监控', path: '/browser/浏览器API/DOM 性能API' },
            //             { title: '第三节', path: '/browser/浏览器API/english03' },
            //         ]
            //     }
            // ],
            '/study/math/': [
                {
                    title: '数学',
                    collapsable: false,
                    children: [
                        { title: '第一节', path: '/study/math/math01' },
                        { title: '第二节', path: '/study/math/math02' },
                        { title: '第三节', path: '/study/math/math03' },
                    ]
                }
            ],
        },
        sidebarDepth: 3, // 侧边栏显示3级
    }
};