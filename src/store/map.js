import http from '@/utils/http'
import { PLAN_LIST } from './type'
import { message } from 'antd';
export function mapStateToProps(state){
    return {
        dataSource:state.planList
    }
}
export function mapDispatchToProps(dispatch){
    return {
        getPlanList(){
            http.post('/dsp-advert/campaigns/list',{ 
                "queryType":1,
                "queryContent":"AD-JXS-201612-00104",
                "pageNum":1,
                "pageSize":50,//如果为空 默认是50,大于100 按照100处理
                "statusList":[1,2,3],  //计划状态
                "startTime":12345678,//计划列表中统计数据的起始时间
                "endTime":12345679876543,//默认T-7
              }).then(res=>{
                  if(res.status==0){
                      dispatch({
                          type:PLAN_LIST,
                          payload:res.data.list
                      })
                  }
            })
        },
        deletePlanList(id){
            http.get(`/dsp-advert/campaigns/delete/${id}`).then(res=>{
                if(res.status===0){
                    message.success('删除成功');//模拟删除，并未删除数据
                }
            })
        }
    }
}