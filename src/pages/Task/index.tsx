import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import { Button } from 'antd';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { RedoOutlined, CheckOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import originImage from '@/assets/img/image-00.png';
import originImage2 from '@/assets/img/image2-00.png';
import image01 from '@/assets/img/image-01.png';
import image02 from '@/assets/img/image-02.png';
import image03 from '@/assets/img/image-03.png';
import image04 from '@/assets/img/image-04.png';
import image05 from '@/assets/img/image-05.png';
import image201 from '@/assets/img/image2-01.png';
import image202 from '@/assets/img/image2-02.png';
import image203 from '@/assets/img/image2-03.png';
import image204 from '@/assets/img/image2-04.png';
import image205 from '@/assets/img/image2-05.png';

const Index: React.FC = () => {
	const navigate = useNavigate();
	const [resultList, setResultList] = useState<Array<any>>([]);
	const [canvasArr, setCanvasArr] = useState<Array<any>>([]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [search] = useSearchParams();
	const canvas1 = useRef(null);
	const canvas2 = useRef(null);
	const canvas3 = useRef(null);
	const canvas4 = useRef(null);
	const canvas5 = useRef(null);
	const canvas6 = useRef(null);
	const [canvasElem, setCanvasElem] = useState<any>(null);
	const [context, setContext] = useState<any>(null);
	const [isAllowDraw, setIsAllowDraw] = useState<boolean>(false);
	const [isAllowDrawLine, setIsAllowDrawLine] = useState<boolean>(false);
	const [imageHeight, setImageHeight] = useState<number>(380);
	const [taskId, setTaskId] = useState<string | null>('');
	const params = useParams();


	const randomNum = (m: number, n: number) => {
		const num = Math.floor(Math.random() * (m - n) + n);
		return num;
	};


	useEffect(() => {
		console.log(search.get('taskId'));
		setTaskId(search.get('taskId'));
		setActiveIndex(null);
		if (params.mode === 'create') {
			setActiveIndex(0);
		}
		setCanvasArr([canvas1, canvas2, canvas3, canvas4, canvas5, canvas6]);
		setCanvasContext();
	}, []);

	useEffect(() => {
		setContext(canvasElem === null ? null : canvasElem.getContext('2d'));
	}, [canvasElem]);

	useEffect(() => {
		if (context !== null) {
			context.strokeStyle = 'green';
		}
	}, [context]);

	useEffect(() => {
		if (activeIndex !== null) {
			setCanvasElem(canvasArr[activeIndex].current);
		}
	}, [activeIndex]);

	useEffect(() => {
		setActiveIndex(randomNum(0, 7));
		let imageArr = [];
		if (taskId === null || parseInt(taskId) % 2 === 0) {
			console.log('1');
			imageArr = [image01, image02, image03, image04, image05];
			setImageHeight(248);
		} else {
			console.log('2');
			imageArr = [image201, image202, image203, image204, image205];
			setImageHeight(380);
		}
		setResultList([
			{
				image: imageArr[randomNum(0, 5)],
				alt: '',
				sim: randomNum(90, 100)
			}, {
				image: imageArr[randomNum(0, 5)],
				alt: '',
				sim: randomNum(80, 90)
			}, {
				image: imageArr[randomNum(0, 5)],
				alt: '',
				sim: randomNum(70, 80)
			}, {
				image: imageArr[randomNum(0, 5)],
				alt: '',
				sim: randomNum(60, 70)
			}, {
				image: imageArr[randomNum(0, 5)],
				alt: '',
				sim: randomNum(50, 60)
			}, {
				image: imageArr[randomNum(0, 5)],
				alt: '',
				sim: randomNum(40, 50)
			}
		]);
	}, [taskId]);

	const goTask = (taskMode: string) => {
		const taskId: number = parseInt(search.get('taskId') || '1001');
		setTaskId(taskId + 1 + '');
		navigate(`/task/${taskMode}?taskId=${(taskId + 1)}`);
	};

	const windowToCanvas = (canvas: any, x: number, y: number) => {
		//获取canvas元素距离窗口的一些属性，MDN上有解释
		const rect = canvas.getBoundingClientRect();
		//x和y参数分别传入的是鼠标距离窗口的坐标，然后减去canvas距离窗口左边和顶部的距离。
		return {
			x: x - rect.left * (canvas.width / rect.width),
			y: y - rect.top * (canvas.height / rect.height)
		};
	};

	const setCanvasContext = () => {
		if (activeIndex === null) {
			return;
		}
		if (canvasElem === null) {
			setCanvasElem(canvasArr[activeIndex].current);
		}
		if (context === null) {
			setContext(canvasElem === null ? null : canvasElem.getContext('2d'));
		}
	};

	const onMouseDown = (e: any) => {
		if (isAllowDraw) {
			setCanvasContext();
			console.log(canvasElem);
			const ele = windowToCanvas(canvasElem, e.clientX, e.clientY);
			const { x, y } = ele;
			context.moveTo(x, y);
			setIsAllowDrawLine(true);
		}
	};

	const onMouseMove = (e: any) => {
		if (isAllowDraw) {
			setCanvasContext();
			if (isAllowDrawLine) {
				const ele = windowToCanvas(canvasElem, e.clientX, e.clientY);
				const { x, y } = ele;
				context.lineTo(x, y);
				context.stroke();
			}
		}
	};

	const onMouseUp = () => {
		setIsAllowDraw(false);
		setIsAllowDrawLine(false);
	};

	const onClearCanvasClick = () => {
		// 重新设置宽高清空画布
		setCanvasContext();
		canvasElem.width = 500;
		canvasElem.height = imageHeight;
		context.strokeStyle = 'green';
	};

	const onResultClick = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<div id='Task'>
			<p className='task-id'>Task ID: {taskId}</p>
			<div className='origin-image'>
				<p className='task-title'>Origin Doc : </p>
				<img src={taskId === null ? originImage : (parseInt(taskId) % 2 === 0 ? originImage : originImage2)} alt='Origin Image' />
			</div>
			<div className='result-list'>
				<p className='task-title'>Identification Reult : </p>
				<ul>
					{
						resultList.map((item, index) => (
							<li onClick={() => onResultClick(index)} key={index}>
								<div className='handle-btn'>
									<Button type="primary" style={{ display: activeIndex === index ? 'inline-block' : 'none' }} shape="circle" icon={<EditOutlined />} onClick={() => setIsAllowDraw(true)} />
									<Button shape="circle" style={{ display: activeIndex === index ? 'inline-block' : 'none' }} icon={<RedoOutlined />} onClick={onClearCanvasClick} />
								</div>
								<div className='result-image' style={{ height: imageHeight + 'px' }}>
									<img src={item.image} alt={item.alt} />
									<canvas ref={canvasArr[index]} width="500" height={imageHeight} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}></canvas>
								</div>
								<i className={'icon-right right-' + (activeIndex === index ? 'active' : 'inactive')} />
								<p className='result-content'>Type-c{index + 1}, Sim {item.sim}%</p>
							</li>
						))
					}
				</ul>
			</div>
			<div>
				<Button type='primary' icon={<CheckOutlined />} className='btn-next' onClick={() => goTask('create')}>Accept & Go Next</Button>
				<Button icon={<SaveOutlined />}>Save for Later Edit</Button>
			</div>
		</div>
	);
};

export default Index;