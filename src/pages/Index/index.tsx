import React, { useState } from 'react';
import './style.scss';
import { Button, Space, Avatar, Grid } from 'antd-mobile';
import { EditSOutline, SetOutline } from 'antd-mobile-icons';
import { Link, useNavigate } from 'react-router-dom';
import iconGoal from '@/assets/img/goal.png';
import avatarMale from '@/assets/img/avatar_male.png';
import avatarFamale from '@/assets/img/avatar_famale.png';

const Index: React.FC = () => {
	const navigate = useNavigate();

	const onRecommendationClick = () => {
		navigate('/recommendation');
	};

	return (
		<div id='Index'>
			<header>
				<Grid columns={2}>
					<Grid.Item span={1}>
						<Link to='/profile'>
							<Avatar src={avatarMale} style={{ '--size': '60px' }} />
							<p>Profile</p>
						</Link>
					</Grid.Item>
					<Grid.Item span={1}>
						<Link to='/goal'>
							<Space>
								<Avatar src={iconGoal} style={{ '--size': '32px' }} />
								<span className='my-goal'>My Goal</span>
							</Space>
						</Link>
					</Grid.Item>
				</Grid>
			</header>
			<div className='content'>
				<Button color='primary' fill='outline' onClick={onRecommendationClick} className='btn-recommend'>What should I eat today?</Button>
			</div>
			<footer>
				<Space>
					<Button onClick={() => navigate('/feedback')}>
						<Space>
							<EditSOutline />
							feedback
						</Space>
					</Button>
					<Button onClick={() => navigate('/mode')}>
						<Space>
							<SetOutline />
							mode
						</Space>
					</Button>
				</Space>
			</footer>
		</div >
	);
};

export default Index;
