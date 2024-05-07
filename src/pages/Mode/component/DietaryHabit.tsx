import React, { useState, useEffect } from 'react';
import './style.scss';
import { Space, Toast, CheckList } from 'antd-mobile';
import { AntOutline, AddCircleOutline } from 'antd-mobile-icons';
import { Link, useNavigate } from 'react-router-dom';
import $http
	from '../../../utils/http';
const DietaryHabit: React.FC = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState<string[]>([]);

	const onCheckListChange = (values: any) => {
		console.log(values);
		sessionStorage.setItem('dietary_habit', JSON.stringify(values));
		$http.post('/userinfo', { love_foods: values.join(' ') }).then((data: any) => {
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

	useEffect(() => {
		if (sessionStorage.getItem('dietary_habit') !== null) {
			setValue(JSON.parse(sessionStorage.getItem('dietary_habit') || ''));
		}
	}, []);

	return (
		<div id="DietaryHabit">
			<header>choose what you like</header>
			<div>
				<CheckList multiple defaultValue={value} onChange={onCheckListChange}>
					<CheckList.Item value='Amerian'>Amerian</CheckList.Item>
					<CheckList.Item value='Germany'>Germany</CheckList.Item>
					<CheckList.Item value='Italy'>Italan</CheckList.Item>
					<CheckList.Item value='Chinese'>Chinese</CheckList.Item>
					<CheckList.Item value='Maxican'>Maxican</CheckList.Item>
					<CheckList.Item value='Franch'>Franch</CheckList.Item>
					<CheckList.Item value='Korea'>Korea</CheckList.Item>
					<CheckList.Item value='Spicy'>Spicy</CheckList.Item>
					<CheckList.Item value='Pratine'>Protein</CheckList.Item>
				</CheckList>
				{/* <Link to='/add/more' className='add'>
					<Space>
						<AddCircleOutline style={{ fontSize: 32 }} />
						<span>Add</span>
					</Space>
				</Link> */}
			</div>
		</div>
	);
};

export default DietaryHabit;