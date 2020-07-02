import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './container/HomePage'
import Addaccount from './container/Addaccount'
import AccountDetail from './container/AccountDetail'

import { betterData } from './moke/paymentList'
import categories from './moke/categories'

export interface IAcount {
	id: number | string
	moeny: string
	cid: number | string
	time?: number
	note?: string
}

export interface ICategory {
	id: string | number
	name: string
	type: paymentType
	icon: keyof typeof IconType
}

export interface IAppContext {
	accountTable: {
		accountList: IAcount[]
		category: ICategory[]
	}
	actions: {
		addAccountItem: (item: IAcount) => void
		delAccountItem: (id: number | string) => void
		updateAccountItem: (item: IAcount) => void
	}
}

export const AppContext = React.createContext<IAppContext>({
	accountTable: {
		accountList: [],
		category: [],
	},
	actions: {
		addAccountItem: (): void => {
			return
		},
		delAccountItem: (): void => {
			return
		},
		updateAccountItem: (): void => {
			return
		},
	},
})

const App: React.FC = () => {
	const [state, setState] = useState({
		accountList: betterData as IAcount[],
		category: categories as ICategory[],
	})
	const actions = {
		addAccountItem: (item: IAcount): void => {
			const list = state.accountList.concat([])
			list.unshift(item)
			setState({
				accountList: list,
				category: state.category,
			})
		},
		delAccountItem: (id: number | string): void => {
			const list = state.accountList.filter(item => String(item.id) !== String(id))
			setState({
				accountList: list,
				category: state.category,
			})
		},
		updateAccountItem: (item: IAcount): void => {
			if (+item.moeny === 0) {
				console.log('宁搁这白嫖呢，弟弟！')
				return
			}
			const list = JSON.parse(JSON.stringify(state.accountList))
			let index = 0
			list.forEach((_item: IAcount, _index: number) => {
				if (_item.id === item.id) {
					index = _index
				}
			})
			list[index] = item
			setState({
				accountList: list,
				category: state.category,
			})
		},
	}
	return (
		<AppContext.Provider
			value={{
				accountTable: state,
				actions,
			}}>
			<Router>
				<Route path='/' exact component={HomePage}></Route>
				<Route path='/AddAccount' exact component={Addaccount}></Route>
				<Route path='/AccountDetail/:id' exact component={AccountDetail}></Route>
			</Router>
		</AppContext.Provider>
	)
}

export default App
