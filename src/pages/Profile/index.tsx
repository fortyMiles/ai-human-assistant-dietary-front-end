import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import MyForm from './component/MyForm';
import MyProfile from './component/MyProfile';

const Index: React.FC = () => {
	const navigate = useNavigate();
	const [hasSetProfile, setHasSetProfile] = useState<boolean>(false);
	const [profile, setProfile] = useState<object>({});

	useEffect(() => {
		if (sessionStorage.getItem('profile') !== null) {
			setHasSetProfile(true);
			let profile = JSON.parse(sessionStorage.getItem('profile') || '');
			setProfile(profile);
		}
	}, []);

	return (
		<div id='Profile'>
			{
				hasSetProfile ? <MyProfile profile={profile} /> : <MyForm setHasSetProfile={setHasSetProfile} setProfile={setProfile} />
			}
			<Button className='btn-back' color='primary' fill='outline' onClick={() => navigate('/')}>Back</Button>
		</div>
	);
};

export default Index;