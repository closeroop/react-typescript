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
	moeny: string
	time?: number
	note?: string
	formatMoney?: boolean
	onClick?: (item: IProps) => void
}

const AccountItem: React.FC<IProps> = props => {
	const iconColor = classnames(style.itemCategory, {
		'theme-grean-bgColor': props.paymentType === paymentType.Outcome,
		'theme-yellow-bgColor': props.paymentType === paymentType.Income,
	})
	function handleItemClick() {
		if (props.onClick && typeof props.onClick === 'function') {
			const item: IProps = {
				id: props.id,
				category: props.category,
				icon: props.icon,
				paymentType: props.paymentType,
				moeny: props.moeny,
				time: props.time,
				note: props.note ? props.note : '',
			}
			props.onClick(item)
		}
	}
	return (
		<div className={style.accountItem} onClick={handleItemClick}>
			<div className={iconColor}>
				<Icon name={props.icon} style={{ fontSize: '.36rem' }} />
			</div>
			<div className={style.itemContent + ' nowrap'}>
				<h4>{props.category}</h4>
				{props.note ? <p>{props.note}</p> : null}
			</div>
			<div className={style.itemInfo}>
				{/* <span>{(props.paymentType === 2 ? '-' : '+') + tools.formatMoney(props.moeny)}</span> */}
				<span>{'¥' + (props.formatMoney ? tools.formatMoney(props.moeny) : props.moeny)}</span>
				{props.time ? <p>{tools.formatTime(props.time)}</p> : null}
			</div>
		</div>
	)
}
AccountItem.defaultProps = {
	formatMoney: true,
}

AccountItem.propTypes = {
	id: PropType.oneOfType([PropType.string, PropType.number]).isRequired,
	category: PropType.string.isRequired,
	icon: PropType.oneOf(IconTypeArr).isRequired,
	paymentType: PropType.oneOf(paymentTypeArr).isRequired,
	moeny: PropType.string.isRequired,
	time: PropType.number,
	formatMoney: PropType.bool,
	note: PropType.string,
	onClick: PropType.func,
}

export default AccountItem
