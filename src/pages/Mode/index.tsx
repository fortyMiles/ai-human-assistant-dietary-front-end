import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button, Space, Avatar, Radio } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import iconSetting from '@/assets/img/setting.png';

const Index: React.FC = () => {
	const navigate = useNavigate();
	const [checked1, setChecked1] = useState<boolean>(false);
	const [checked2, setChecked2] = useState<boolean>(false);

	useEffect(() => {
		if (sessionStorage.getItem('based_on_habits') === 'true') {
			setChecked1(true);
		}
		if (sessionStorage.getItem('based_on_function_facts') === 'true') {
			setChecked2(true);
		}
	}, []);

	const onRadio1Click = () => {
		sessionStorage.setItem('based_on_habits', !checked1 + '');
		setChecked1(!checked1);
		if (sessionStorage.getItem('dietary_habit') == null) {
			navigate('/dietary/habit');
		}
	};

	const onRadio2Click = () => {
		sessionStorage.setItem('based_on_function_facts', !checked2 + '');
		setChecked2(!checked2);
	};

	return (
		<div id="Mode">
			<header>
				<Space>
					<Avatar src={iconSetting} style={{ '--size': '32px' }} />
					<span>I need results based on</span>
				</Space>
			</header>
			<div>
				<Space direction='vertical'>
					<Radio value='1' onClick={onRadio1Click} checked={checked1}>My Dietary Habit</Radio>
					<Radio value='2' onClick={onRadio2Click} checked={checked2}>Function Facts</Radio>
				</Space>
			</div>
			<Button className='btn-back' color='primary' fill='outline' onClick={() => navigate('/')}>Back</Button>
		</div>
	);
};

export default Index;