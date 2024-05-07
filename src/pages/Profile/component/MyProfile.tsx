import React, { RefObject, useState } from 'react';
import { Button, Space, Avatar, Form, Input, DatePicker, Radio } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import avatarMale from '@/assets/img/avatar_male.png';
import avatarFamale from '@/assets/img/avatar_famale.png';

interface MyProfileProps {
	profile: any
}
const MyProfile: React.FC<MyProfileProps> = (props) => {
	const navigate = useNavigate();

	return (
		<div id='MyProfile'>
			<header>
				<Space>
					<Avatar src={avatarMale} style={{ '--size': '48px' }} />
					<p>{props.profile.name}</p>
				</Space>
			</header>
			<div className='profile-list'>
				<p>
					<span className='item-label'>Age:</span>
					<span>{props.profile.age}</span>
				</p>
				<p>
					<span className='item-label'>Gender:</span>
					<span>{props.profile.gender}</span>
				</p>
				<p>
					<span className='item-label'>Weight:</span>
					<span>{props.profile.weight?props.profile.weight+'kg':'unknow'}</span>
				</p>
				<p>
					<span className='item-label'>height:</span>
					<span>{props.profile.height?props.profile.height+'cm':'unknow'}</span>
				</p>
				<p>
					<span className='item-label'>Allergic History:</span>
					<span>{props.profile.allergic}</span>
				</p>
				<p>
					<span className='item-label'>Body Fat :</span>
					<span>{props.profile.body_fat}</span>
				</p>
				<p>
					<span className='item-label'>Hometown:</span>
					<span>{props.profile.hometown}</span>
				</p>
			</div>
		</div>
	);
};

export default MyProfile;