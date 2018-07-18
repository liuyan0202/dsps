import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'//react的代码拆分，按需加载，方法一
import MyLoadable from '@/myLoadable/myloadable'//自己封装的Loadable，做代码拆分，方法二
import Loading from '@/components/loading'//loading组件
//import Home from '@/pages/home/home'
//import Plan from '@/pages/plan/plan'
//import Menu from '@/pages/menu/menu'
//import Idea from '@/pages/idea/idea'
import Login from '@/pages/login/login'
import Index from '@/pages/index/index'

let router = {
    routes:[
        {
            path:'/',
            exact:true,
            component:()=><Redirect from="/" to="/index/home" />
        },
        {
            path:'/login',
            exact:true,
            component:Login
        },
        {
            path:'/index',
            component:Index,
            children:[
                {
                    path:'/index/home',
                    component:MyLoadable('home'),//自己封装的loadable按需加载
                },
                {
                    path:'/index/plan',
                    component:Loadable({//react-loadable代码拆分
                        loader: () => import('./../pages/plan/plan'),
                        loading: Loading
                    })
                },
                {
                    path:'/index/menu',
                    component:Loadable({
                        loader: () => import('./../pages/menu/menu'),
                        loading: Loading
                    })
                },
                {
                    path:'/index/idea',
                    component:Loadable({
                        loader: () => import('./../pages/idea/idea'),
                        loading: Loading
                    })
                }
            ]
        }
    ]
}
export default router