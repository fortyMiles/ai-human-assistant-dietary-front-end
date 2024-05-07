import React, { useState, useEffect } from 'react';
import './style.scss';
import { Tabs, List, Rate, Popup, Toast, Button, Space, Avatar, Dialog } from 'antd-mobile';
import { UnorderedListOutline } from 'antd-mobile-icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { useNavigate } from 'react-router-dom';
import iconFeedback from '@/assets/img/feedback.png';
import $http from '../../utils/http';

// 创建可排序的列表项
const SortableItem = SortableElement<any>(({ index, value }: any) => {
	console.log(index, value);
	return (
		<List.Item>
			<div className='list-item'>
				<div>
					<span>No {value.rank}</span>
					<p className='list-content'>{value.content}</p>
					<p>...</p>
				</div>
				<UnorderedListOutline />
			</div>
		</List.Item>
	);
}
);

// 创建可排序的列表容器
const SortableList = SortableContainer<any>(({ items }: any) => {
	return (
		<ul>
			{
				items.map((item: any, index: number) =>
					<SortableItem key={`item-${index}`} index={index} value={item} />
				)
			}
		</ul>
	);
});

const SortableComponent: React.FC = () => {
	const navigate = useNavigate();
	const [items, setItems] = useState([]);
	const [popVisible, setPopVisible] = useState(false);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		let userId = JSON.parse(sessionStorage.getItem('profile') || '').user_id;
		$http.get(`/recommendation/user/${userId}/`).then((data: any) => {
			console.log(data);
			setItems(data);
		});
	}, []);

	const onSortEnd = ({ oldIndex, newIndex }: any) => {
		setItems(arrayMoveImmutable(items, oldIndex, newIndex));
		let itemsCopy = [...arrayMoveImmutable(items, oldIndex, newIndex)];
		itemsCopy.map((item: any, index) => {
			item.rank = index + 1;
		});
		$http.post('/update_recommendations/rank/', itemsCopy).then((data: any) => {
			console.log(data);
			Toast.show({
				icon: 'success',
				content: 'Save successfully',
			});
		});
	};

	const onListItemClick = (e: any, item: any) => {
		Dialog.show({
			content: item.content,
			closeOnMaskClick: true,
			actions: [
				{
					key: 'okay',
					text: 'okay',
				}],
			onAction: (action: any, index: number) => {
				console.log(action);
				Dialog.clear();
			}
		});
	};

	const onRateChange = (value: number) => {
		console.log(value);
		Toast.show(value.toString());
		let itemsCopy: any = [...items];
		itemsCopy[current].rate = value;
		$http.post('/update_recommendations/rate/', itemsCopy).then((data: any) => {
			console.log(data);
			setItems(itemsCopy);
			Toast.show({
				icon: 'success',
				content: 'Save successfully',
			});
		});
	};

	return (
		<div id='Feedback'>
			<header>
				<Space>
					<Avatar src={iconFeedback} style={{ '--size': '32px' }} />
					<span>Feedback by</span>
				</Space>
			</header>
			<Tabs>
				<Tabs.Tab title='Numeric' key='numeric'>
					<List header='sort by rank'>
						{
							items.map((item: any, index) =>
								<List.Item key={`item-${index}`} className='list-item'>
									{/* <span>No {item.rank}</span> */}
									<p className='list-content' onClick={(e) => onListItemClick(e, item)}>{item.content}</p>
									<p>...</p>
									<div onClick={() => { setPopVisible(true); setCurrent(index); }}>
										<Rate readOnly value={item.rate} />
									</div>
								</List.Item>
							)
						}
					</List>
					<Popup
						visible={popVisible}
						onMaskClick={() => setPopVisible(false)}
						onClose={() => setPopVisible(false)}
						bodyStyle={{ height: '40vh', padding: 20 }}
					>
						<p style={{ fontSize: 20, marginBottom: 12 }}>Please choose the rate.</p>
						<Rate onChange={onRateChange} defaultValue={0} allowHalf />
					</Popup>
				</Tabs.Tab>
				<Tabs.Tab title='Rank' key='rank'>
					<List header='drag to sort'>
						<DndProvider backend={HTML5Backend}>
							<SortableList items={items} onSortEnd={onSortEnd} />
						</DndProvider>
					</List>
				</Tabs.Tab>
			</Tabs>
			<Button className='btn-back' color='primary' fill='outline' onClick={() => navigate('/')}>Back</Button>
		</div>
	);
};

export default SortableComponent;