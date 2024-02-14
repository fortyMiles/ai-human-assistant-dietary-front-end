import axios from 'axios';
import {
	message
} from 'antd';

const $ajax = axios.create({
	timeout: 10000,
	responseType: 'json',
	withCredentials: false,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	}
});

// POST传参序列化(添加请求拦截器)
$ajax.interceptors.request.use(
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
$ajax.interceptors.response.use(
	res => {
		if (res.data.code === 200) {
			return Promise.resolve(res.data.data);
		} else {
			message.info(res.data.msg);
			return Promise.resolve(res.data);
		}
	},
	error => {
		message.info(error.message);
		return Promise.reject(error);
	}
);

export default $ajax;