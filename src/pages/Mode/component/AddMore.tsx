import React, { RefObject, useState } from 'react';
import './style.scss';
import { Button, Space, Avatar, Form, Input, DatePicker, Radio } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import iconAdd from '@/assets/img/add.png';

const DietaryHabit: React.FC = () => {
	const navigate = useNavigate();
	const [hasSetProfile, setHasSetProfile] = useState<boolean>(true);

	const onAddClick = () => {

	};

	return (
		<div id="AddMore">
			<header>
				<Space>
					<Avatar src={iconAdd} style={{ '--size': '32px' }} />
					<span>Add More</span>
				</Space>
			</header>
			<p>Please input your dietary habit</p>
			<Input className='habit-input' placeholder='please input' clearable style={{ '--font-size': '20px' }} />
			<footer>
				<Space>
					<Button color='primary' onClick={onAddClick}>Add</Button>
					<Button className='btn-back' color='primary' fill='outline' onClick={() => navigate('/')}>Back</Button>
				</Space>
			</footer>
		</div>
	);
};

export default DietaryHabit;