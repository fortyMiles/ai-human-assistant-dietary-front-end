import axios from 'axios';
import {
	message
} from 'antd';

const $http = axios.create({
	timeout: 10000,
	responseType: 'json',
	withCredentials: false,
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	}
});

// POST传参序列化(添加请求拦截器)
$http.interceptors.request.use(
	config => {
		if (config.method === 'get') {
			const data = config.data;
			let ret = '';
			for (const it in data) {
				ret +=
					encodeURIComponent(it) +
					'=' +
					encodeURIComponent(data[it]) +
					'&';
			}
			config.data = ret;
		}
		return config;
	},
	error => {
		message.info(error.message);
		return Promise.reject(error);
	}
);

// 返回状态判断(添加响应拦截器)
$http.interceptors.response.use(
	res => Promise.resolve(res.data),
	error => {
		message.info(error.message);
		return Promise.reject(error);
	}
);

export default $http;