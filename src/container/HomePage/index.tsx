import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import style from './index.module.scss'
import withContent from './../withContext'
// 组件
import StatisticsBox from './../../components/StatisticsBox'
import IncomeHead from './../../components/IncomeHead'
import AccountItem from './../../components/AccountItem'
import Icon from './../../components/AccountIcon'
// Interface
import { IProps as PaymentProps } from './../../components/AccountItem'
import { paymentType } from './../../components/AccountItem/index'
import { IProps as ItemIProps } from './../../components/AccountItem/index'
import { IAppContext, IAcount, ICategory } from './../../App'

type IHomeProps = RouteComponentProps & IAppContext

class HomePage extends Component<IHomeProps> {
	public state: {
		accountData: IAcount[]
		categories: any[]
	}
	constructor(props: IHomeProps) {
		super(props)
		this.state = {
			accountData: props.accountTable.accountList,
			categories: tools.flatternArr(props.accountTable.category, 'id'),
		}
		console.log(tools.flatternArr(props.accountTable.category, 'id'))
	}
	handleItemClick = (item: ItemIProps): void => {
		const icon = this.props.accountTable.category.find(_item => _item.icon == item.icon)
		this.props.history.push(`/AccountDetail/${item.id}?` + tools.qs(Object.assign(item, { cid: icon?.id })))
	}
	addAccount = (): void => {
		this.props.history.push(`/AddAccount?type=0`)
	}
	render(): JSX.Element {
		let todayIncome = 0,
			todayOutcome = 0
		const itemWithCate = this.state.accountData.map(item => {
			const _item = item as any
			const { categories } = this.state
			_item.category = categories[item.cid as any].name
			_item.icon = categories[item.cid as any].icon
			_item.paymentType = categories[item.cid as any].type
			if (_item.paymentType === paymentType.Income) {
				todayIncome += +item.moeny
			} else {
				todayOutcome += +item.moeny
			}
			return _item
		})
		console.log(itemWithCate)
		//
		return (
			<div className={style.homePage}>
				<StatisticsBox />
				<div className={style.paymentList}>
					<IncomeHead todayIncome={todayIncome} todayOutcome={todayOutcome} />
					<ul className={style.paymentContent}>
						{itemWithCate.map(item => (
							<li key={item.id}>
								<AccountItem {...item} onClick={this.handleItemClick} />
							</li>
						))}
					</ul>
				</div>
				<div className={style.btnGroup}>
					<div className={style.addBtn} onClick={this.addAccount}>
						<Icon name='edit' />
						记一笔
					</div>
					<div className={style.menuBtn}>
						<Icon name='menu' />
					</div>
				</div>
			</div>
		)
	}
}

export default withContent(HomePage)
