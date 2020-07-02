import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import style from './index.module.scss'
import withContent from './../withContext'

import AccountItem from './../../components/AccountItem'
import Adialog from './../../components/Dialog'
import Icon from './../../components/AccountIcon'

import { IProps as PaymentProps } from './../../components/AccountItem'
import { IAppContext } from './../../App'

// 为RouteComponentProps传递带有id的match接口，否者使用id会报错

interface IRouteProps {
	id?: string
}

interface Istate {
	isShowDialog: boolean
}

class AccountDetail extends Component<RouteComponentProps<IRouteProps> & IAppContext, Istate> {
	queryData: any
	constructor(props: RouteComponentProps<IRouteProps> & IAppContext) {
		super(props)
		this.state = {
			isShowDialog: false,
		}
		this.queryData = tools.parseUrlSearch(props.location.search)
		console.log(this.queryData, 's')
	}
	handleConfirm = () => {
		this.setState({
			isShowDialog: false,
		})
		this.props.actions.delAccountItem(this.queryData.id)
		this.props.history.go(-1)
	}
	handleCancel = () => {
		this.setState({
			isShowDialog: false,
		})
	}
	// 防抖 200ms
	handleDelete = tools._throttle(() => {
		this.setState({
			isShowDialog: true,
		})
	}, 200)
	handleModify = tools._throttle(() => {
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
			time: this.queryData.time,
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
				<section className={style.footerBtn}>
					<button className={style.btnDelete} onClick={this.handleDelete}>
						<Icon name='delete' /> 删除
					</button>
					<button
						className={style.btnConfirm}
						onClick={e => {
							this.handleModify(e)
						}}>
						<Icon name='edit' /> 修改
					</button>
				</section>
				<Adialog
					isOpen={this.state.isShowDialog}
					type='confirm'
					content='确定要删除该记录？'
					cancelBtnConfig={{ callBack: this.handleCancel, text: '取消' }}
					okBtnConfig={{ callBack: this.handleConfirm, text: '确定' }}
				/>
			</div>
		)
	}
}

export default withContent(AccountDetail)
