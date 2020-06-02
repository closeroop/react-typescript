import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import style from './index.module.scss'
import AccountItem from './../../components/AccountItem'

import { IProps as PaymentProps } from './../../components/AccountItem'

const testData: PaymentProps = {
	id: 1590824611383,
	category: '话费',
	icon: 'phone',
	paymentType: 2,
	moeny: 30,
}
const testData2 = {
	id: 1590824611383,
	category: '话费',
	icon: 'phone',
	paymentType: 2,
	time: 1590824611383,
	moeny: 30,
}
// 为RouteComponentProps传递带有id的match接口，否者使用id会报错
interface IRouteProps {
	id?: string
}

class HomePage extends Component<RouteComponentProps<IRouteProps>> {
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			id: this.props.match.params.id,
		}
	}
	// 防抖 200ms
	handleModify = tools._debounce((e: MouseEvent) => {
		this.props.history.push('/AddAccount')
		console.log(e.target)
	}, 200)
	render(): JSX.Element {
		return (
			<div className={style.detail}>
				<section className={style.detailList}>
					<AccountItem {...testData} />
					<div className={style.listItem + ' ' + style.topBorder}>
						<div className={style.itemLeft}>备注</div>
						<div className={style.itemRight}>- -</div>
					</div>
					<div className={style.listItem}>
						<div className={style.itemLeft}>时间</div>
						<div className={style.itemRight}>{tools.formatTime(testData2.time)}</div>
					</div>
				</section>
				<button
					className={style.footerBtn}
					onClick={e => {
						this.handleModify(e)
					}}>
					修改
				</button>
			</div>
		)
	}
}

export default HomePage
