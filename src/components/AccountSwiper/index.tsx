import React, { useState, useEffect, memo, useMemo } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'
import Swiper from 'react-id-swiper'

import Icon from './../../components/AccountIcon'
import { ICategory } from './../../App'

import 'swiper/css/swiper.css'
import style from './index.module.scss'

interface Iprops {
	iconArr: ICategory[]
	defaultIconId?: string | number
	onIconClick?: (item: ICategory) => void
	ItemClass?: string
}

const AccountSwiper: React.FC<Iprops> = props => {
	let mimiSwiper: any
	let currentSwiper = 0
	const [currentIconId, setIconId] = useState(props.iconArr[0].id)
	const activeClass = props.ItemClass ? props.ItemClass : style.iconActive
	const swiperParams = {
		pagination: {
			el: '.swiper-pagination',
			clickable: false,
		},
		getSwiper($el: any) {
			mimiSwiper = $el
		},
	}
	const swiperPage = Array(Math.ceil(props.iconArr.length / 10) | 0).fill(0)
	function handleIconClick(iconInfo: ICategory): void {
		if (props.onIconClick && typeof props.onIconClick === 'function') {
			props.onIconClick(iconInfo)
		}
		setIconId(iconInfo.id)
	}
	const currenSwiperFn = useMemo(() => {
		let iconIndex = 0
		props.iconArr.forEach((item, index) => {
			if (item.id === props.defaultIconId) {
				iconIndex = index
			}
		})
		return (iconIndex / 10) | 0
	}, [])
	useEffect(() => {
		if (props.defaultIconId && props.defaultIconId !== currentIconId) {
			setIconId(props.defaultIconId)
		}
		if (currentSwiper !== currenSwiperFn) {
			currentSwiper = currenSwiperFn
			setTimeout(() => {
				mimiSwiper.slideTo(currentSwiper)
			}, 0)
		}
	}, [])
	return (
		<Swiper {...swiperParams}>
			{swiperPage.map((index, key) => (
				<div key={key} className={style.swiperItem}>
					{props.iconArr.slice(key * 10, 10 + key * 10).map(item => (
						<div
							key={item.id}
							className={style.iconItem}
							onClick={() => {
								handleIconClick(item)
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
	defaultIconId: PropType.oneOfType([PropType.string, PropType.number]),
	onIconClick: PropType.func,
	ItemClass: PropType.string,
}

export default memo(AccountSwiper)
