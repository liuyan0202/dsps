
const http = require('http');
const querystring = require('querystring')
const fs = require('fs')
const Mock = require('mockjs') 
/*const _ = require('lodash')
const multer = require('multer') */
/* var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(file)
        let filename = file.originalname.split('.')
        cb(null, filename[0] + '-' + Date.now()+'.'+filename[1])
    }
})
   
var upload = multer({ storage: storage })*/

const jwt = require('jsonwebtoken') 

function queryApi(url,methods,params){
    return new Promise((resolve,reject)=>{
        let data = ''
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
    
        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk
            });
            response.on('end', () => {
                resolve(JSON.stringify(data))
            });
        })
        if(methods.toLowerCase()=='post'){
            request.write(querystring.stringify(params))
        }
        request.end()
    })
}
//var ejs = require('ejs'),people = ['geddy', 'neil', 'alex'];
//token验证
function verifyToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,"dsp",function(err,decoded){
            if(err){
                reject(err)
            }else{
                resolve(decoded)
            }
        })
    })    
}
module.exports = function (app) {
    /* app.engine('html', require('ejs').renderFile);
    app.get('/',(req,res)=>{
        res.send(ejs.render('<ul><%= people.join(", "); %></ul>', {people: people}))
    }) */
    //注册接口
    /* app.post('/user/register', function (req, res) {
        let user = fs.readFileSync('user.json', { encoding: "utf-8" });
        user = JSON.parse(user);
        user.push(req.body);
        fs.writeFile('user.json', JSON.stringify(user), function () {
            res.end(JSON.stringify({
                "success": 1,
                "info": "register success"
            }))
        })
    })*/

    //login api 登录接口
    app.post('/dsp-admin/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname + '/userinfo/userinfo.json', { encoding: "utf-8" });
        user = JSON.parse(user);
        let login = req.body;
        
        let resInfo = {
            data: "login failed",
            msg:'登录信息有误',
            status: 1
      }
        user.forEach(usr => {
            if (usr.username == login.username && usr.password == login.password) {
                resInfo.success = 0;
                resInfo.msg = "登录成功"
                resInfo.data = "login success";
                resInfo.user ={
                    name:usr.username,
                    time:new Date().toLocaleTimeString(),
                    nickName:usr.username
                }
            }
        });

        if (resInfo.success == 0) {
            resInfo.token = jwt.sign(login, "dsp", {
                expiresIn: 60*60
            })
        }

        res.end(JSON.stringify(resInfo))

    }) 
    //home页echarts数据
    app.post('/dsp-report/index',function(req,res){
        let {startTime,endTime,dimLeft,dimRight,count} = req.body;
        let Random = Mock.Random;
        let mockData = Mock.mock({
            "status": 0,
            "data": {
                exposeNum: 10000, //曝光量
                clickNum: 1000, // 点击量
                clickRate: 100,  // 点击率
                clickPrice: 10000, // 点击均价
                cpmPrice: 200000, // 千次展示均价
                consumed: 1000, // 时间段消耗(单位分)
                [`dataY1|${count || 5}`]:[()=>Random.natural(1,99999)],
                dataY2:[1100, 1382, 1325, 1600, 1600]
            }
        })
        res.send(mockData)
    })
    
    app.post('/dsp-advert/campaigns/list',(req,res)=>{//计划列表
        let Random = Mock.Random;
        let data = Mock.mock({
            "data":{
            "list|30":[{
                "key|+1":1,
                "name":"计划",
                "promotionType|1": ['网页','ISO应用','Android应用'], // 推广目的
                "status|1":['投放中','下线-达到日预算','下线-达到账户预算','暂停','删除'],//计划状态 (1:投放中；2:下线-达到日预算；3:下线-达到账户预算； 4:暂停；999:删除)
                "dayBudget|8000-20000": 1, // 计划日预算(单位分)
                "exposeNum|60000-100000":1,//曝光量
                "clickNum|6000-10000":1,//点击量
                "clickRate|6000-12000":1,//点击率
                "clickPrice|1000-5000":1,//点击均价；  单位是分 消费/点击量
                "cpmPrice|1000|3000":1,//千次展示均价；  单位是分 消费/曝光量
                "todaysumed|10000-100000":1,//今日消耗
                "consumed|100000-300000":1, //总消耗
                "modifyTime":()=>Random.date(),
                "createTime":()=>Random.date(),
                "operatorId":1,//操作人Id
                "operatorName":()=>Random.cname() //创建人姓名
            }] ,
            "navigatePages": 8,
            "navigatepageNums": [ 1, 2 ],
            "endRow": 5,
            "firstPage": 1,
            "hasNextPage": true,
            "hasPreviousPage": false,
            "isFirstPage": true,
            "isLastPage": false,
            "lastPage": 2,
            "nextPage": 2,
            "orderBy": null,
            "pageNum": 1,
            "pageSize": 5,
            "pages": 2,
            "prePage": 0,
            "size": 5,
            "startRow": 1,
            "total": 7
             },
            "status":0
            })
            res.json(data)
    })
    app.get('/dsp-advert/campaigns/delete/:id',(req,res)=>{
        console.log('删除第'+req.params+'条数据')
        res.json({
            status:0
        })

    })
    //upload 上传接口
    /* app.post('/dsp-creative/creative/upload',upload.single('file'),function(req,res){
        
        res.send({
            "data": {
                       "size":req.file.size,
                       "value":req.file.path,
                       "key":"2A36B67C6"
                },
            "status":0
          }
        )
    }) */
}

