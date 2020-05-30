import React, { Component } from 'react'
import style from './index.module.scss'

import StatisticsBox from './../../components/StatisticsBox'
import IncomeHead from './../../components/IncomeHead'
import AccountItem from './../../components/AccountItem'
import Icon from './../../components/AccountIcon'

import { IProps as PaymentProps } from './../../components/AccountItem'

// 测试数据
import paymentData from './../../moke/paymentList'

console.log(paymentData)

class HomePage<T> extends Component<T> {
	constructor(props: Readonly<T>) {
		super(props)
		this.state = {}
	}
	render(): JSX.Element {
		const _paymentData = paymentData as PaymentProps[]
		let todayIncome = 0,
			todayOutcome = 0
		_paymentData.forEach(item => {
			if (item.paymentType === 1) {
				todayIncome += item.moeny
			} else {
				todayOutcome += item.moeny
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
								<AccountItem {...item} />
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
