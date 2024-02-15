import React, { useState } from 'react';
import './style.scss';
import { Button, Modal, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const Index: React.FC = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [taskId, setTaskId] = useState<string>('');

	const handleOk = () => {
		setIsModalOpen(false);
		navigate(`/task/edit?taskId=${taskId}`);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const goTask = (taskMode: string) => {
		const createTaskId = '1001';
		navigate(`/task/${taskMode}?taskId=${createTaskId}`);
	};
	const onEditClick = () => {
		setIsModalOpen(true);
	};

	return (
		<div id='Index'>
			<div className='index-content'>
				<p className='index-title'>
					Customer Requirement Document Auto Classification System
				</p>
				<p className='index-subtitle'>
					Therer are 1192 Docs need to be processed
				</p>
				<div>
					<Button type='primary' icon={<PlusOutlined />} className='btn-create' onClick={() => goTask('create')}>
						Start a New Task
					</Button>
					<Button className='btn-edit' icon={<EditOutlined />} onClick={onEditClick}>
						Edit Saved Task
					</Button>
				</div>
			</div>
			<Modal title="Doc ID" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<Input placeholder="Please Input Doc ID" value={taskId} allowClear onChange={(e) => setTaskId(e.target.value)} />
			</Modal>
		</div>
	);
};

export default Index;