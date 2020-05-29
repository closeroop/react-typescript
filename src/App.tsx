import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './container/HomePage'
import Addaccount from './container/Addaccount'
import AccountDetail from './container/AccountDetail'

const App: React.FC = () => {
	return (
		<Router>
			<Route path='/' exact component={HomePage}></Route>
			<Route path='/Addaccount' exact component={Addaccount}></Route>
			<Route path='/AccountDetail/:id' exact component={AccountDetail}></Route>
		</Router>
	)
}

export default App
