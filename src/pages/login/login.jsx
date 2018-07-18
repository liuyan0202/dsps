import React,{ Component } from 'react'
import './login.css'
import { Number } from 'core-js';
import http from '@/utils/http.js'
import { setCookie } from '@/utils/cookie.js'
class Login extends Component{
    constructor(){
        super()
        this.state={
            errorbox:'error-info',//'error-info','dis'
            isborder:false,
            info:'',
            userName:'',
            password:'',
            identifyCode:'',
            num:1531306017242
        }
        this.goLogin = this.goLogin.bind(this)
        this.changeFn = this.changeFn.bind(this)
        this.identifyCode = this.identifyCode.bind(this)
    }
    render(){
        let { errorbox, isborder, info, userName, password, identifyCode, num } = this.state
        return (
            <div className="login">
                <h1 className="title"><b>作业帮</b>.智能营销平台</h1>
                <div className="bot-title">
                    <div className="icon-title-icon">
                        <div className="img-logo">
                        </div>
                        <div className="logn-tit">
                            <p className="title-big">智能营销平台</p>
                            <p className="title-small">网络新生态    智能助力广告营销</p>
                        </div>
                    </div>
                </div>
                <div className={isborder?'login-form formbox':'login-form'}>
                    <h3 className="account-landing">
                        <span>账户登录</span>
                    </h3>
                    <div className={errorbox}>{info}</div>
                    <div className="form-wrap">
                        <input type="text" placeholder="用户名" name="userName" value={userName} onChange={this.changeFn}/>
                        <input type="password" placeholder="密码" name="password" value={password} onChange={this.changeFn}/>
                        <div className="checkBox">
                            <input type="text" placeholder="请输入验证码" name="identifyCode" value={identifyCode} onChange={this.changeFn}/>
                            <span>
                                <img onClick={this.identifyCode} src={`https://e.zuoyebang.com/dsp-admin/captcha.jpg?${num}`} alt=""/>
                            </span>
                        </div>
                    </div>
                    <button className="loginbtn" onClick={this.goLogin}>登录</button>
                    <p className="forget">忘记密码</p>
                    <div className="sign-info">©2018 小船出海教育科技（北京）有限公司 作业帮</div>
                </div>
            </div>
        )
    }
    changeFn(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    identifyCode(){
        this.setState({
            num:--this.state.num
        })
    }
    goLogin(){
        let { userName, password, identifyCode } = this.state
        if(!userName){
            this.setState({
                errorbox:'dis',
                isborder:true,
                info:'请填写用户名'
            })
            return
        }
        if(!password){
            this.setState({
                errorbox:'dis',
                isborder:true,
                info:'请填密码'
            })
            return
        }
        if(!identifyCode){
            this.setState({
                errorbox:'dis',
                isborder:true,
                info:'请填验证码'
            })
            return
        }
        this.setState({
            errorbox:'error-info',
            isborder:false,
            info:''
        })
        http.post('/dsp-admin/user/login',{
            username:userName,
            password:password
        }).then(res=>{
            if(res.success==0){//成功
                setCookie('token',res.token)
                localStorage.setItem('user',res.user.name)
                this.props.history.replace('/index/home')
            } else {
                this.setState({
                    errorbox:'dis',
                    isborder:true,
                    info:res.msg
                })
            }
        })
    }
}
export default Login