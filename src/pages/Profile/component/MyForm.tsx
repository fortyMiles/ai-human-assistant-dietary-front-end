import React, { RefObject, useState } from 'react';
import { Button, Space, Avatar, Form, Input, DatePicker, Radio, Toast } from 'antd-mobile';
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import $http from '../../../utils/http';
import { json } from 'stream/consumers';

interface MyFormProps {
	setHasSetProfile: (b: boolean) => void;
	setProfile: (o: object) => void;
}

const Index: React.FC<MyFormProps> = (props) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const onSubmitClick = () => {
		form.validateFields().then(() => {
			console.log(form.getFieldsValue());
			let birthday = form.getFieldValue('birthday');
			let age = Math.floor((new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365));
			let profile: any = {
				name: form.getFieldValue('name'),
				age: age,
				weight: form.getFieldValue('weight'),
				height: form.getFieldValue('height'),
				gender: form.getFieldValue('gender'),
				allergic: form.getFieldValue('allergic'),
				body_fat: form.getFieldValue('body_fat') + '%',
				hometown: form.getFieldValue('hometown')
			};
			$http.post('/userinfo', profile).then((data: any) => {
				console.log(data);
				profile.user_id = data.user_id;
				sessionStorage.setItem('profile', JSON.stringify(profile));
				props.setHasSetProfile(true);
				props.setProfile(profile);
				Toast.show({
					icon: 'success',
					content: 'Save successfully, back to Index',
				});
				setTimeout(() => {
					navigate('/');
				}, 2000);
			});
		});
	};

	return (
		<div id='Form'>
			<Form
				layout='horizontal'
				requiredMarkStyle='none'
				form={form}
				footer={
					<Button block type='submit' color='primary' size='large' onClick={onSubmitClick}>
						Submit
					</Button>
				}
			>
				<Form.Header>Please set your profile.</Form.Header>
				<Form.Item
					name='name'
					label='Name'
					rules={[{ required: true, message: 'Name is required.' }]}
				>
					<Input onChange={console.log} placeholder='please input' clearable />
				</Form.Item>
				<Form.Item
					name='birthday'
					label='Birthday'
					rules={[{ required: true, message: 'Birthday is required.' }]}
					trigger='onConfirm'
					onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
						datePickerRef.current?.open();
					}}
				>
					<DatePicker>
						{value =>
							value ? dayjs(value).format('YYYY-MM-DD') : 'please choose'
						}
					</DatePicker>
				</Form.Item>
				<Form.Item
					name='gender'
					label='Gender'
					rules={[{ required: true, message: 'Gender is required.' }]}
				>
					<Radio.Group>
						<Space direction='horizontal'>
							<Radio value='male'>male</Radio>
							<Radio value='famale'>famale</Radio>
							<Radio value='unknow'>unknow</Radio>
						</Space>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name='weight'
					label='Weight (kg)'
					rules={[{ required: true, message: 'Weight is required.' }]}
				>
					<Input type='number' onChange={console.log} placeholder='please input' clearable />
				</Form.Item>
				<Form.Item
					name='height'
					label='Height (cm)'
					rules={[{ required: true, message: 'Height is required.' }]}
				>
					<Input type='number' onChange={console.log} placeholder='please input' clearable />
				</Form.Item>
				<Form.Item
					name='allergic'
					label='Allergic History'
					rules={[{ required: true, message: 'Allergic History is required.' }]}
				>
					<Input onChange={console.log} placeholder='please input' clearable />
				</Form.Item>
				<Form.Item
					name='body_fat'
					label='Body Fat (%)'
					rules={[{ required: true, message: 'Body Fat is required.' }]}
				>
					<Input type='number' onChange={console.log} placeholder='please input' clearable />
				</Form.Item>
				<Form.Item
					name='hometown'
					label='Hometown'
					rules={[{ required: true, message: 'Hometown is required.' }]}
				>
					<Input onChange={console.log} placeholder='please input' clearable />
				</Form.Item>
			</Form>
		</div>
	);
};

export default Index;