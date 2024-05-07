import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from '../pages/Index';
import Profile from '../pages/Profile';
import Goal from '../pages/Goal';
import Recommendation from '../pages/Recommendation';
import Feedback from '../pages/Feedback';
import Mode from '../pages/Mode';
import AddMore from '../pages/Mode/component/AddMore';
import DietaryHabot from '../pages/Mode/component/DietaryHabit';

const MyRouter: React.FC = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' Component={Index} />
			<Route path='/profile' Component={Profile} />
			<Route path='/goal' Component={Goal} />
			<Route path='/recommendation' Component={Recommendation} />
			<Route path='/feedback' Component={Feedback} />
			<Route path='/mode' Component={Mode} />
			<Route path='/add/more' Component={AddMore} />
			<Route path='/dietary/habit' Component={DietaryHabot} />
		</Routes>
	</BrowserRouter>
);


export default MyRouter;