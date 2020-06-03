import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Swiper from 'react-id-swiper'

import style from './index.module.scss'
import 'swiper/swiper.scss'

import AccountItem from './../../components/AccountItem'
import AccountSwiper from './../../components/AccountSwiper'

import ItemList from './../../moke/categories'
import { paymentType } from './../../components/AccountItem/index'

interface IconArr {
	id: string
	name: string
	type: number
	icon: keyof typeof IconType
}

interface Istate {
	currentIconId: string
	paymentType: paymentType
	moeny: number
	currentCategory: string
	currentIcon: keyof typeof IconType
}

const iconArr = ItemList as IconArr[]

class Addaccount extends Component<RouteComponentProps, Istate> {
	public incomeCategories: IconArr[] = []
	public outcomeCategories: IconArr[] = []
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			currentIconId: '0002',
			paymentType: 2,
			moeny: 0,
			currentCategory: '吃饭',
			currentIcon: 'food',
		}
		this.breakCategory()
	}
	handleSelected = (id: string): void => {
		const item = iconArr.find(_item => {
			return _item.id === id
		})
		if (typeof item !== 'undefined') {
			this.setState({
				currentIconId: id,
				currentCategory: item.name,
				paymentType: item.type,
				currentIcon: item.icon,
			})
		}
	}
	breakCategory = (): void => {
		iconArr.forEach(item => {
			if (item.type === paymentType.Income) {
				this.incomeCategories.push(item)
			} else {
				this.outcomeCategories.push(item)
			}
		})
	}
	render(): JSX.Element {
		const { currentCategory, currentIcon, currentIconId, moeny, paymentType } = this.state
		const IconProps = {
			icon: currentIcon,
			id: currentIconId,
			category: currentCategory,
			moeny: moeny,
			paymentType: paymentType,
		}
		return (
			<div className={style.addAccount}>
				<section className={style.addDetail}>
					<AccountItem {...IconProps} />
					<AccountSwiper
						onIconClick={this.handleSelected}
						currentIconId={this.state.currentIconId}
						iconArr={this.outcomeCategories}
					/>
				</section>
			</div>
		)
	}
}

export default Addaccount
