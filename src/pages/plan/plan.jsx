import React,{ Component } from 'react'
import './plan.css'
import { Menu, Dropdown, Button, Icon, DatePicker, Table, Modal } from 'antd';
import { connect } from 'react-redux'
import {mapStateToProps,mapDispatchToProps} from '@/store/map.js'
class Plan extends Component{
    constructor(){
        super()
        this.state={
            username:'伊利王兆辉',
            visible: false,
            dataItem:''
        }
        this.onChange = this.onChange.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    render(){
        let that = this
        const columns = [{
            title: '计划ID',
            dataIndex: 'key',
            width:60
          }, {
            title: '计划名称',
            dataIndex: 'name',
            width:60
          }, {
            title: '投放目的',
            dataIndex: 'promotionType',
            width:60
          }, {
            title: '日预算（元）',
            dataIndex: 'dayBudget',
            width:80
          }, {
            title: '今日消耗（元）',
            dataIndex: 'todaysumed',
            width:80
          },{
            title: '总消耗（元）',
            dataIndex: 'consumed',
            width:80
          },{
            title: '曝光量',
            dataIndex: 'exposeNum',
            width:60
          },{
            title: '点击量',
            dataIndex: 'clickNum',
            width:60
          },{
            title: '点击率',
            dataIndex: 'clickRate',
            width:60
          },{
            title: '状态',
            dataIndex: 'status',
            width:120
          },{
            title: 'delete',
            width:60,
            render: (text, record) =>{
                function del(){
                    that.setState({
                        visible:true,
                        dataItem:record
                    })
                }
               return (<span style={{cursor:'pointer'}} onClick={()=>{del(record)}}>x</span>)
            }
        }
        ];
        let { username, data } = this.state
        return (
            <div className="plan">
                <Modal
                    title="delete"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    您确定删除吗？
                </Modal>
                <div className="userinfo">
                    <div className="userphoto">
                        <img src=""  title="我是头像"/>
                    </div>
                    <div className="userbox">
                        <div className="usermsg">
                            <h3>{username}</h3>
                            <span className="plan-icon"><i className="iconfont icon-jiage"></i><b>￥125666</b>充值<i className="iconfont jishiben icon-jishiben"></i><b>￥560.00</b></span>
                        </div>
                        <div className="plan-tab">
                            <span className="active"><i className="iconfont icon-jiage"></i>广告计划</span>
                            <span><i className="iconfont icon-jiage"></i>广告单元</span>
                            <span><i className="iconfont icon-jiage"></i>广告创意</span>
                        </div>
                    </div>
                </div>
                <div className="plan-cont">
                    <div className="plan-menu">
                        <div className="plan-pick">
                            <Dropdown overlay={<Menu>
                                    <Menu.Item>name one</Menu.Item>
                                    <Menu.Item>name two</Menu.Item>
                                    <Menu.Item>name three</Menu.Item>
                                </Menu>}>
                                <a className="ant-dropdown-link" href="#">
                                计划名称 <Icon type="down" />
                                </a>
                            </Dropdown>
                            <input type="text" className="plan-one" placeholder="请输入关键字查询"/>
                        </div>
                        <div className="plan-goal">
                            推广目的
                            <Dropdown overlay={<Menu>
                                    <Menu.Item key="1">1st menu item</Menu.Item>
                                    <Menu.Item key="2">2nd menu item</Menu.Item>
                                    <Menu.Item key="3">3rd item</Menu.Item>
                                </Menu>}>
                                <Button style={{ marginLeft: 8 }}>
                                    请选择 <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </div>
                        <div className="plan-status">
                            状态
                            <Dropdown overlay={<Menu>
                                    <Menu.Item key="1">1st menu item</Menu.Item>
                                    <Menu.Item key="2">2nd menu item</Menu.Item>
                                    <Menu.Item key="3">3rd item</Menu.Item>
                                </Menu>}>
                                <Button style={{ marginLeft: 8 }}>
                                    请选择 <Icon type="down" />
                                </Button>
                            </Dropdown>
                        </div>
                        <button className="plan-search">查询</button>
                    </div>
                    <div className="plan-box">
                        <div className="plan-new">+新建计划</div>
                        <Dropdown overlay={<Menu>
                                    <Menu.Item key="1">1st menu item</Menu.Item>
                                    <Menu.Item key="2">2nd menu item</Menu.Item>
                                    <Menu.Item key="3">3rd item</Menu.Item>
                                </Menu>}>
                            <Button style={{ marginLeft: 8 }}>
                                批量修改 <Icon type="down" />
                            </Button>
                        </Dropdown>
                        <div className="positionbox">
                            <DatePicker onChange={this.onChange} placeholder="请选择订单日期" />
                        </div>
                    </div>
                    <div className="plan-table">
                        <Table columns={columns} dataSource={this.props.dataSource} scroll={{ x: '130%', y: 300 }}/>
                    </div>
                </div>
            </div>
        )
    }
    onChange(date, dateString) {
        console.log(date, dateString);
    }
    handleOk(){
        this.setState({
            visible:false
        })
        let id = this.state.dataItem.key
        this.props.deletePlanList(id)
    }
    handleCancel(){
        this.setState({
            visible:false
        })
    }
    componentDidMount(){
        this.props.getPlanList()
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Plan)