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

	const handleExit = () => {
		// Clearing the session storage or any other sign of user data
		sessionStorage.clear();
		// Optionally, you could reset local state if necessary
		setHasSetProfile(false);
		setProfile({});
		// Redirecting the user to the root/homepage or a specific login page
		navigate('/');
	};

	return (
		<div id='Profile'>
			{
				hasSetProfile ? <MyProfile profile={profile} /> : <MyForm setHasSetProfile={setHasSetProfile} setProfile={setProfile} />
			}
			<Button className='btn-back' color='primary' fill='outline' onClick={() => navigate('/')}>Back</Button>
			<div className="exit-button-container">
				<Button className='btn-exit' color='danger' fill='outline' onClick={handleExit}>Exit</Button>
			</div>
		</div>
	);
};

export default Index;