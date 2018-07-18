import React,{ Component } from 'react'
import './home.css'
import echarts from 'echarts/dist/echarts.min.js'
import { DatePicker } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;
import http from '@/utils/http.js'
class Home extends Component{
    constructor(){
        super()
        this.state={
            int:7,
            exposeNum:'',//曝光量
            clickNum:'',// 点击量
            clickRate:'',// 点击率,
            clickPrice:''// 点击均价
        }
        this.option = {
            xAxis: {
                type: 'category',
                boundaryGap:false,
                data: []
            },
            yAxis: {
                type:'value',
                data:[1100,1200,1300,1400,1500,1600,1700]
            },
            series: [{
                data: [],
                type: 'line'
            }]
        }
        this.onChange = this.onChange.bind(this)
    }
    render(){
        let { int, exposeNum, clickNum, clickRate, clickPrice } = this.state
        return (
            <div className="home">
                <div className="home_top">
                    <div>
                        <span className="iconfont icon-jiage"></span>
                        <p>
                            <i>现金账户</i>
                            <span>￥126,560.00</span>
                        </p>
                    </div>
                    <div>
                        <span className="iconfont icon-jishiben"></span>
                        <p>
                            <i>现金账户</i>
                            <span>￥126,560.00</span>
                        </p>
                    </div>
                </div>
                <div className="home_cont">
                    <div className="home_case">
                        <h3>整体情况</h3>
                        <div className="home_date">
                            <span onClick={()=>{this.pickDate(7)}} className={int===7?'active':''}>近7天</span>
                            <span onClick={()=>{this.pickDate(30)}} className={int===30?'active':''}>近30天</span>
                            <span className="pick_date">
                                <RangePicker onChange={this.onChange} placeholder={['开始日期','结束日期']}/>
                            </span>
                        </div>
                    </div>
                    <div className="home_hits">
                            <span>
                                <i>曝光量（次）</i>
                                <b>{exposeNum}</b>
                            </span>
                            <span>
                                <i>点击量（次）</i>
                                <b>{clickNum}</b>
                            </span>
                            <span>
                                <i>点击率（次）</i>
                                <b>{clickRate}</b>
                            </span>
                            <span>
                                <i>点击均价（￥）</i>
                                <b>{clickPrice}</b>
                            </span>
                    </div>
                    <div className="home_canvas">
                        <div className="canvas_tit">
                            <span>曝光量<i className="iconfont icon-xiangxia"></i></span>
                            <span>点击数<i className="iconfont icon-xiangxia"></i></span>
                        </div>
                        <div id="canvas_main" ref="main" style={{width: '100%',height:'320px'}}></div>
                    </div>
                </div>
            </div>
        )
    }
    pickDate(ind){
        this.setState({
            int:ind
        })
        this.setDate([moment().subtract(ind, 'days').format('YYYY/MM/DD'),moment().format('YYYY/MM/DD')])
    }
    componentDidMount(){
        let {int} = this.state;
        let arr = [];
        for(let i=1;i<=int;i++){
            arr.unshift(moment().subtract(i, 'days').format('YYYY/MM/DD'))//获取之前时间
        }
        const main = this.refs.main;
        var myChart = echarts.init(main);
        this.myChart = myChart;
        // 指定图表的配置项和数据
        let option = this.option;
        this.setDate([moment().subtract(int, 'days').format('YYYY/MM/DD'),moment().format('YYYY/MM/DD')])
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize = function(){
            myChart.resize()//重绘
        }
    }
    onChange(date, dateString){
        //date为数组，选择的结束日期和开始日期
        this.setDate(date)
    }
    setDate(date){//动态选择时间获取数据
        //moment的时差计算
        let days = moment(new Date(date[1])).diff(moment(new Date(date[0])),'days')//天数
        let xarr = [];
        for(let i=0;i<=days;i++){
            xarr.unshift(moment(new Date(date[1])).subtract(i, 'days').format('YYYY/MM/DD'))//获取之前时间
        }
        let option = this.option;
        http.post('/dsp-report/index',{
            count:days+1
        }).then(res=>{
            option.xAxis.data = xarr;//x轴数据
            option.series[0].data = res.data.dataY1;//渲染的折线数据
            this.myChart.setOption(option);
            this.setState({
                exposeNum:res.data.exposeNum,
                clickNum:res.data.clickNum,
                clickRate:res.data.clickRate,
                clickPrice:res.data.clickPrice
            })
        })
    }
}
export default Home