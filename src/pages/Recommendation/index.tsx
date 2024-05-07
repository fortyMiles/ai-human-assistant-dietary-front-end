import React, { useState, useEffect } from 'react';
import './style.scss';
import { Button, Space, Result, Toast, DotLoading } from 'antd-mobile';
import { SmileOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import $http from '../../utils/http';

const Index: React.FC = () => {
	const navigate = useNavigate();
	const [description, setdescription] = useState('');
	const [loading, setLoading] = useState(true);
	const [recommendationId, setRecommendationId] = useState('');

	useEffect(() => {
		getRecommend();
	}, []);

	const getRecommend = () => {
		$http.post('/recommendation/', {
			user_id: JSON.parse(sessionStorage.getItem('profile') || '').user_id,
			based_on_habits: sessionStorage.getItem('based_on_habits') === 'true' || false,
			based_on_function_facts: sessionStorage.getItem('based_on_function_facts') === 'true' || false
		}).then((data: any) => {
			console.log(data);
			setLoading(false);
			setdescription(data.content);
			setRecommendationId(data.recommendation_id);
		});
	};

	const onRegenerateClick = () => {
		setdescription('');
		setLoading(true);
		getRecommend();
	};

	const onOkClick = () => {
		$http.put('/recommendation/save/', {
			recommendation_id: recommendationId
		}).then(data => {
			console.log(data);
			Toast.show({
				icon: 'success',
				content: 'Save successfully, back to Index',
			});
			setTimeout(() => {
				navigate('/');
			}, 2000);

		});
	};

	return (
		<div id='Recommend'>
			<div className='loading' style={{ display: loading ? 'block' : 'none' }}>
				<DotLoading color='primary' />
				<span>loading</span>
			</div>
			<Result
				icon={<SmileOutline />}
				status='success'
				title='Well done'
				description={description}
				style={{ display: description !== '' ? 'block' : 'none' }}
			/>
			<footer style={{ display: description !== '' ? 'block' : 'none' }}>
				<Space>
					<Button color='primary' onClick={onRegenerateClick}>Regenerate</Button>
					<Button onClick={onOkClick}>OK</Button>
				</Space>
			</footer>
		</div>
	);
};

export default Index;