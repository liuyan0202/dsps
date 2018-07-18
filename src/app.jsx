import React,{ Component } from 'react'
import { BrowserRouter} from "react-router-dom"
import '@/assets/css/app.css'
import config from '@/router/config'
import RouterView from '@/router/router'
class App extends Component{
    constructor(){
        super()
        this.state={
            collapsed:false,
            isbg:true
        }
        this.changBg = this.changBg.bind(this)
    }
    render(){
        return (
            <BrowserRouter>
                <RouterView routes={config.routes}></RouterView>
            </BrowserRouter>
        )
    }
    changBg(){
        this.setState({
            isbg:!this.state.isbg
        })
    }
}
export default App