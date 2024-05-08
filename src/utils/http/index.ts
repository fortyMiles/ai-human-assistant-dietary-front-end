import axios from 'axios';
import { Modal } from 'antd-mobile';

const $http = axios.create({
	baseURL: 'http://107.23.162.117:8080/',
	timeout: 50000,
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
		Modal.alert({
			content: error.message
		});
		return Promise.reject(error);
	}
);

// 返回状态判断(添加响应拦截器)
$http.interceptors.response.use(
	res => Promise.resolve(res.data),
	error => {
		Modal.alert({
			content: error.message
		});
		return Promise.reject(error);
	}
);

export default $http;