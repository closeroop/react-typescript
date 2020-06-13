import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import style from './index.module.scss'
import withContent from './../withContext'

import AccountItem from './../../components/AccountItem'

import { IProps as PaymentProps } from './../../components/AccountItem'
import { IAppContext, IAcount, ICategory } from './../../App'

// 为RouteComponentProps传递带有id的match接口，否者使用id会报错

interface IRouteProps {
	id?: string
}

class AccountDetail extends Component<RouteComponentProps<IRouteProps> & IAppContext> {
	queryData: any
	constructor(props: RouteComponentProps & IAppContext) {
		super(props)
		// this.state = {
		// 	id: this.props.match.params.id,
		// }
		this.queryData = tools.parseUrlSearch(props.location.search)
		console.log(this.queryData, 's')
	}
	// 防抖 200ms
	handleModify = tools._debounce(() => {
		this.queryData.type = this.queryData.paymentType
		this.props.history.push('/AddAccount?' + tools.qs(this.queryData))
		console.log('/AddAccount?' + tools.qs(this.queryData))
	}, 200)
	render(): JSX.Element {
		const IconProps: PaymentProps = {
			id: this.queryData.id,
			category: this.queryData.category,
			icon: this.queryData.icon,
			paymentType: +this.queryData.paymentType,
			moeny: this.queryData.moeny,
			time: this.queryData.moeny ? this.queryData.moeny : 0,
			note: this.queryData.note ? this.queryData.note : '',
		}
		return (
			<div className={style.detail}>
				<section className={style.detailList}>
					<AccountItem {...IconProps} time={undefined} note={undefined} />
					<div className={style.listItem + ' ' + style.topBorder}>
						<div className={style.itemLeft}>备注</div>
						<div className={style.itemRight}>{IconProps.note ? IconProps.note : '- -'}</div>
					</div>
					<div className={style.listItem}>
						<div className={style.itemLeft}>时间</div>
						<div className={style.itemRight}>{tools.formatTime(Number(IconProps.time))}</div>
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

export default withContent(AccountDetail)
