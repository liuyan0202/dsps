import React,{ Component, Fragment } from 'react'
import { Link} from "react-router-dom"
import { Menu, Icon } from 'antd'
import RouterView from '@/router/router'
const SubMenu = Menu.SubMenu;

class Index extends Component{
    constructor(){
        super()
        this.state={
            collapsed:false,
            isbg:true,
            user:'',
            zoom:false
        }
        this.changBg = this.changBg.bind(this)
        this.iszoom = this.iszoom.bind(this)
    }
    render(){
        let { user, zoom } = this.state
        return (
            <Fragment>
                <div className="bot">
                    <div className={zoom?'aside reaside':'aside'}>
                        <div className="head_left">智能投放系统</div>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                            >
                            <Menu.Item key="1">
                                <Link to="/index/home">
                                    <Icon type="appstore-o" />
                                    <span>首页概览</span>
                                </Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span><Icon type="printer" /><span>广告管理</span></span>}>
                                <Menu.Item key="5"><Link to="/index/plan">广告计划</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/index/menu">广告单元</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/index/idea">广告创意</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="2">
                                <Icon type="pie-chart" />
                                <span>数据中心</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="tool" />
                                <span>工具箱</span>
                            </Menu.Item>

                        </Menu>
                    </div>
                    <div className="content">
                        <div className="head_right">
                            <div className="left_top">
                                <span onClick={this.iszoom} className="iconfont icon-shouqicaidan"></span>
                            </div>
                            <div className="right_top">
                                <span className={this.state.isbg?'iconfont jiage icon-jiage':'iconfont icon-jiage'} onClick={this.changBg}></span>
                                <span className="iconfont icon-warning"></span>
                                <div className="app_user">
                                    <b>{user}</b>
                                    <i>账户ID：34345</i>
                                    <em className="iconfont app_xia icon-xiangxia"></em>
                                </div>
                            </div>
                        </div>
                        <RouterView routes={this.props.routes}></RouterView>
                    </div>
                </div>
            </Fragment>
        )
    }
    changBg(){
        this.setState({
            isbg:!this.state.isbg
        })
    }
    iszoom(){
        this.setState({
            zoom:!this.state.zoom
        })
        console.log(1)
    }
    componentDidMount(){
        let username = localStorage.getItem('user')
        this.setState({
            user:username
        })
    }
}
export default Index