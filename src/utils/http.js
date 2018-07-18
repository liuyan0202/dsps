import { getCookie } from '@/utils/cookie.js'
let queryString = {
    //将 {foo:'bar',baz:'qux',corge:''} 转成 'foo=bar$baz=qux&corge='
    stringify(obj){
        let str = ''
        for(let i in obj){
            str += i+'='+obj[i]+'&'
        }
        return str.slice(0,-1)
    },
    parse(str){//'foo=bar$&baz=qux&corge='转成{foo:'bar',baz:'qux',corge:''}
        let newstr = str.split("&");
        let o = {}
        for(let i=0;i<newstr.length;i++){
            let t = newstr[i].split('=');
            o[t[0]]=t[1]
        }
        return o
    }
}
let domin = 'http://localhost:9000';
export default {
    get(url,params){
        let strurl = queryString.stringify(params);
        if(url.indexOf('?')>-1){
            url=url+'&'+strurl
        } else {
            url=url+'?'+strurl
        }
        return new Promise((resolve,reject)=>{
            fetch(domin+url,{
                headers:{
                    'Content-Type':"application/json;charset=utf-8"
                }
            })
            .then(body=>body.json())
            .then(res=>{
                resolve(res)
            })
        })
    },
    post(url,params){
        return new Promise((resolve,reject)=>{
            fetch(domin+url,{
                method:'post',
                headers:{
                    'Content-Type':"application/json;charset=utf-8",
                    'Authrization':getCookie('token')
                },
                body:JSON.stringify(params)
            })
            .then(body=>body.json())
            .then(res=>{
                resolve(res)
            })
        })
    }
}