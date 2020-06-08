import React, { useState, useEffect } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'
import Swiper from 'react-id-swiper'

import Icon from './../../components/AccountIcon'

import 'swiper/css/swiper.css'
import style from './index.module.scss'

interface IconProps {
	id: string
	name: string
	type: number
	icon: keyof typeof IconType
}

interface Iprops {
	iconArr: IconProps[]
	currentIconId?: string
	onIconClick?: (id: string) => void
	ItemClass?: string
}

const AccountSwiper: React.FC<Iprops> = props => {
	const [currentIconId, setIconId] = useState(props.currentIconId ? props.currentIconId : props.iconArr[0].id)
	const activeClass = props.ItemClass ? props.ItemClass : style.iconActive
	const swiperParams = {
		pagination: {
			el: '.swiper-pagination',
			clickable: false,
		},
	}
	const swiperPage = Array(Math.ceil(props.iconArr.length / 10) | 0).fill(0)
	function handleIconClick(id: string): void {
		if (props.onIconClick && typeof props.onIconClick === 'function') {
			props.onIconClick(id)
		}
		setIconId(id)
	}
	// useEffect(() => {
	// 	if (typeof props.currentIconId !== 'undefined') {
	// 		setIconId(props.currentIconId)
	// 	}
	// }, [])
	return (
		<Swiper {...swiperParams}>
			{swiperPage.map((index, key) => (
				<div key={key} className={style.swiperItem}>
					{props.iconArr.slice(key * 10, 10 + key * 10).map(item => (
						<div
							key={item.id}
							className={style.iconItem}
							onClick={() => {
								handleIconClick(item.id)
							}}>
							<div
								className={classnames(style.iconBox, {
									[activeClass]: currentIconId === item.id,
								})}>
								<Icon name={item.icon} size='big' />
							</div>
							<p className='nowrap'>{item.name}</p>
						</div>
					))}
				</div>
			))}
		</Swiper>
	)
}

AccountSwiper.propTypes = {
	iconArr: PropType.array.isRequired,
	currentIconId: PropType.string,
	onIconClick: PropType.func,
	ItemClass: PropType.string,
}

export default AccountSwiper
