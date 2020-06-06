import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import style from './index.module.scss'
// 组件
import StatisticsBox from './../../components/StatisticsBox'
import IncomeHead from './../../components/IncomeHead'
import AccountItem from './../../components/AccountItem'
import Icon from './../../components/AccountIcon'
// Interface
import { IProps as PaymentProps } from './../../components/AccountItem'
import { paymentType } from './../../components/AccountItem/index'

// 测试数据
import paymentData from './../../moke/paymentList'

console.log(paymentData)

class HomePage extends Component<RouteComponentProps> {
	public state: {
		name: string
	}
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			name: '',
		}
	}
	handleItemClick = (id: number | string): void => {
		this.props.history.push(`/AccountDetail/${id}`)
	}
	render(): JSX.Element {
		const _paymentData = paymentData as PaymentProps[]
		let todayIncome = 0,
			todayOutcome = 0
		_paymentData.forEach(item => {
			if (item.paymentType === paymentType.Income) {
				todayIncome += +item.moeny
			} else {
				todayOutcome += +item.moeny
			}
		})
		return (
			<div className={style.homePage}>
				<StatisticsBox />
				<div className={style.paymentList}>
					<IncomeHead todayIncome={todayIncome} todayOutcome={todayOutcome} />
					<ul className={style.paymentContent}>
						{_paymentData.map(item => (
							<li key={item.id}>
								<AccountItem {...item} onClick={this.handleItemClick} />
							</li>
						))}
					</ul>
				</div>
				<div className={style.btnGroup}>
					<div className={style.addBtn}>
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

export default HomePage
