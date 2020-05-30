import React from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import style from './index.module.scss'
import tool from '../../util/tool'

import Icon from './../AccountIcon/index'

export interface IProps {
	id: number | string
	category: string //种类
	icon: string
	paymentType: paymentType //1-收入 2-支出
	time: number
	moeny: number
	note?: string
}

const AccountItem: React.FC<IProps> = props => {
	const iconColor = classnames(style.itemCategory, {
		'theme-grean-bgColor': props.paymentType === 2,
		'theme-yellow-bgColor': props.paymentType === 1,
	})
	return (
		<div className={style.accountItem}>
			<div className={iconColor}>
				<Icon name={props.icon as keyof typeof IconType} style={{ fontSize: '.36rem' }} />
			</div>
			<div className={style.itemContent + ' nowrap'}>
				<h4>{props.category}</h4>
				{props.note ? <p>{props.note}</p> : null}
			</div>
			<div className={style.itemInfo}>
				<span>{(props.paymentType === 2 ? '-' : '+') + tool.formatMoney(props.moeny)}</span>
				<p>{tool.farmatTime(props.time)}</p>
			</div>
		</div>
	)
}

AccountItem.propTypes = {
	id: PropType.oneOfType([PropType.string, PropType.number]).isRequired,
	category: PropType.string.isRequired,
	icon: PropType.string.isRequired,
	paymentType: PropType.oneOf([1, 2] as paymentType[]).isRequired,
	time: PropType.number.isRequired,
	moeny: PropType.number.isRequired,
	note: PropType.string,
}

export default AccountItem
