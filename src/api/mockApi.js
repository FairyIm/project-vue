import axios from 'axios';
// 引入进度条(start：进度条开始；done:结束)
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios,只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    baseURL: '/mock', //基础路径，发请求时路径中会出现api
    timeout: 5000 //请求超时时间
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start();
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data; //成功回调函数
},(error)=>{
    return Promise.reject(new Error('faile'));
})

// 对外暴露
export default requests;