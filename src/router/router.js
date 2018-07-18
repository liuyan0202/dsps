import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { getCookie } from '@/utils/cookie'
class RouterView extends Component {
    render(){
        let { routes } = this.props
        return (
            <Switch>
                {
                    routes.map((v,index)=>{
                        return (
                            <Route key={index} path={v.path} exact={v.exact||false} render={(routerApi)=>{
                                if(v.path=='/login'||getCookie('token')){
                                    if(v.children){
                                        return <v.component routes={v.children} {...routerApi}></v.component>
                                    } else {
                                        return <v.component {...routerApi}></v.component>
                                    }
                                } else {
                                        return <Redirect to="/login"></Redirect>
                                }
                                
                            }}></Route>
                        )
                    })
                }
            </Switch>
        )
    }
}
export default RouterView