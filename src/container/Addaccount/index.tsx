import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Swiper from 'react-id-swiper'

import style from './index.module.scss'
import 'swiper/swiper.scss'

import AccountItem from './../../components/AccountItem'
import AccountSwiper from './../../components/AccountSwiper'
import KeyBoard from './../../components/KeyBoard'

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
	moeny: string
	currentCategory: string
	currentIcon: keyof typeof IconType
}

const iconArr = ItemList as IconArr[]

class Addaccount extends Component<RouteComponentProps, Istate> {
	public incomeCategories: IconArr[] = []
	public outcomeCategories: IconArr[] = []
	public moneyMaxLength: number
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			currentIconId: '0002',
			paymentType: 2,
			moeny: '30',
			currentCategory: '吃饭',
			currentIcon: 'food',
		}
		this.moneyMaxLength = 9
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
	handleEnter = (value: string): void => {
		let { moeny } = this.state
		if (moeny.length === 0 && value === '.') {
			console.log('你不能输入一个点先')
			return
		}
		const Dot = moeny.match(/\.\d*/)
		// 控制小数点个数，以及小数点后位数（2）
		if (Dot && (value === '.' || Dot[0].length === 3)) {
			console.log('最多输入两位小数')
			return
		}
		if (moeny.length < this.moneyMaxLength) {
			if (moeny === '0') {
				moeny = value
			} else {
				moeny += value
			}
		}
		this.setState({ moeny })
	}
	handleDeleted = (clearFlag = false): void => {
		let { moeny } = this.state
		if (clearFlag) {
			this.setState({ moeny: '0' })
			return
		}
		if (moeny !== '') {
			moeny = moeny.substr(0, moeny.length - 1)
			if (moeny === '') {
				this.setState({ moeny: '0' })
			} else {
				this.setState({ moeny })
			}
		}
	}
	handleConfirm = (): void => {
		this.props.history.go(-2)
	}
	render(): JSX.Element {
		const { currentCategory, currentIcon, currentIconId, moeny, paymentType } = this.state
		const IconProps = {
			icon: currentIcon,
			id: currentIconId,
			category: currentCategory,
			moeny: moeny,
			paymentType: paymentType,
			formatMoney: false,
		}
		return (
			<div className={style.addAccount}>
				<section className={style.addDetail}>
					<div style={{ padding: '0 .12rem' }}>
						<AccountItem {...IconProps} />
					</div>
					<AccountSwiper
						onIconClick={this.handleSelected}
						currentIconId={this.state.currentIconId}
						iconArr={this.outcomeCategories}
					/>
					<div className={style.addFooter}>
						<KeyBoard
							okBtnColor='#07C160'
							okFontColor='#fff'
							onEnter={val => {
								this.handleEnter(val)
							}}
							onDelete={this.handleDeleted}
							onClear={() => {
								this.handleDeleted(true)
							}}
							onConfirm={this.handleConfirm}
						/>
					</div>
				</section>
			</div>
		)
	}
}

export default Addaccount
