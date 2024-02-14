import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from '../pages/Index';
import Task from '../pages/Task';

const MyRouter: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' Component={Index} />
			<Route path='/task/:mode' Component={Task} />
		</Routes>
	</BrowserRouter>
);


export default MyRouter;