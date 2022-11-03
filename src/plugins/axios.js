/*
该文件对 axios 封装了token 组件可以随意调用
* */

import axios from "axios"
axios.interceptors.request.use(
    function (config) {
        //拦截成功   默认参数config  为请求头 切记拦截成功之后  必须返回配置 检测是否存在_token
        let token =localStorage.getItem("token");
        if (!config.headers["Authorization"]){
            config.headers["Authorization"] = "Bearer "+token;
        }
        return config;
    },
    function (error) {//拦截失败
        return Promise.reject(error);
    }
);
export default axios;