import React from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import style from './index.module.scss'

import Icon from './../AccountIcon/index'
import { IconTypeArr } from './../AccountIcon/iconTypes'

export enum paymentType { //1-收入 2-支出
	Income = 1,
	Outcome = 2,
}

export const paymentTypeArr: paymentType[] = [paymentType.Income, paymentType.Outcome]

export interface IProps {
	id: number | string
	category: string //种类
	icon: keyof typeof IconType
	paymentType: paymentType
	moeny: number
	time?: number
	note?: string
	onClick?: (id: number | string) => void
}

const AccountItem: React.FC<IProps> = props => {
	const iconColor = classnames(style.itemCategory, {
		'theme-grean-bgColor': props.paymentType === paymentType.Outcome,
		'theme-yellow-bgColor': props.paymentType === paymentType.Income,
	})
	return (
		<div
			className={style.accountItem}
			onClick={() => {
				props.onClick && typeof props.onClick === 'function' ? props.onClick(props.id) : ''
			}}>
			<div className={iconColor}>
				<Icon name={props.icon} style={{ fontSize: '.36rem' }} />
			</div>
			<div className={style.itemContent + ' nowrap'}>
				<h4>{props.category}</h4>
				{props.note ? <p>{props.note}</p> : null}
			</div>
			<div className={style.itemInfo}>
				{/* <span>{(props.paymentType === 2 ? '-' : '+') + tools.formatMoney(props.moeny)}</span> */}
				<span>{'¥' + tools.formatMoney(props.moeny)}</span>
				{props.time ? <p>{tools.formatTime(props.time)}</p> : null}
			</div>
		</div>
	)
}

AccountItem.propTypes = {
	id: PropType.oneOfType([PropType.string, PropType.number]).isRequired,
	category: PropType.string.isRequired,
	icon: PropType.oneOf(IconTypeArr).isRequired,
	paymentType: PropType.oneOf(paymentTypeArr).isRequired,
	moeny: PropType.number.isRequired,
	time: PropType.number,
	note: PropType.string,
	onClick: PropType.func,
}

export default AccountItem
