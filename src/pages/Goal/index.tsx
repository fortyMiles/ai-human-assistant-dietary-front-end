import React, { RefObject, useState, useEffect } from 'react';
import './style.scss';
import { Button, Space, Avatar, Form, Input, DatePicker, Radio } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import iconGoal from '@/assets/img/goal.png';
import $http from '../../utils/http';

const Index: React.FC = () => {
	const navigate = useNavigate();

	const onValueChange = (value: any) => {
		console.log(value);
		$http.post('/userinfo', { goal: value }).then(data => {
			console.log(data);
		});
	};


	return (
		<div id="Goal">
			<header>
				<Space>
					<Avatar src={iconGoal} style={{ '--size': '32px' }} />
					<span>My Goal is</span>
				</Space>
			</header>
			<div>
				<Radio.Group onChange={value => onValueChange(value)}>
					<Space direction='vertical'>
						<Radio value='Gain Muscle'>Gain Muscle</Radio>
						<Radio value='Fat Loss'>Fat Loss</Radio>
						<Radio value='Sleep Well'>Sleep Well</Radio>
						<Radio value='Clear Mind'>Clear Mind</Radio>
					</Space>
				</Radio.Group>
			</div>
			<Button className='btn-back' color='primary' fill='outline' onClick={() => navigate('/')}>Back</Button>
		</div>
	);
};

export default Index;