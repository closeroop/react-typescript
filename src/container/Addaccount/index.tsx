import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Swiper from 'react-id-swiper'

import style from './index.module.scss'
import 'swiper/css/swiper.css'

import AccountItem from './../../components/AccountItem'
import AccountSwiper from './../../components/AccountSwiper'
import KeyBoard from './../../components/KeyBoard'
import AccTab, { TabItem } from './../../components/AccountTab'

import ItemList from './../../moke/categories'
import { paymentType as PaymentType } from './../../components/AccountItem/index'

interface IconArr {
	id: string
	name: string
	type: number
	icon: keyof typeof IconType
}

interface Istate {
	paymentType: PaymentType
	moeny: string
	currentCategory: string
	currentIcon: keyof typeof IconType
}

type IstateUnite = {
	income: Istate
	outcome: Istate
	currentSwiper: number
	currentIconId: string
}

const iconArr = ItemList as IconArr[]
let swiperEl: any
class Addaccount extends Component<RouteComponentProps, IstateUnite> {
	incomeCategories: IconArr[] = []
	outcomeCategories: IconArr[] = []
	moneyMaxLength: number
	swiperParams: any
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			income: {
				paymentType: 2,
				moeny: '30',
				currentCategory: '吃饭',
				currentIcon: 'food',
			},
			outcome: {
				paymentType: 2,
				moeny: '18',
				currentCategory: '吃饭',
				currentIcon: 'food',
			},
			currentSwiper: 0,
			currentIconId: '',
		}
		// this.currentSwiper = this.props.match
		this.moneyMaxLength = 9
		this.breakCategory()
		this.swiperParams = {
			containerClass: style.swiperContainer,
			getSwiper($el: any) {
				console.log($el)
				swiperEl = $el
			},
			on: {
				slideChange: () => {
					this.setState({ currentSwiper: swiperEl.activeIndex })
					console.log(swiperEl.activeIndex)
				},
			},
		}
	}
	handleSelected = (id: string): void => {
		const item = iconArr.find(_item => {
			return _item.id === id
		})
		const currentType = this.state.currentSwiper === 1 ? 'income' : 'outcome'
		const newData = JSON.parse(JSON.stringify(this.state[currentType]))
		console.log(item, 'handleSelected')
		if (typeof item !== 'undefined') {
			// eslint-disable-next-line prettier/prettier
			newData.currentIconId = id,
				(newData.currentCategory = item.name),
				(newData.paymentType = item.type),
				(newData.currentIcon = item.icon),
				this.state.currentSwiper === 1 ? this.setState({ income: newData }) : this.setState({ outcome: newData })
		}
	}
	breakCategory = (): void => {
		iconArr.forEach(item => {
			if (item.type === PaymentType.Income) {
				this.incomeCategories.push(item)
			} else {
				this.outcomeCategories.push(item)
			}
		})
	}
	handleEnter = (value: string): void => {
		const currentType = this.state.currentSwiper === 1 ? 'income' : 'outcome'
		let moeny = this.state[currentType].moeny
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
		const newData = JSON.parse(JSON.stringify(this.state[currentType]))
		newData.moeny = moeny
		this.state.currentSwiper === 1 ? this.setState({ income: newData }) : this.setState({ outcome: newData })
	}
	handleDeleted = (clearFlag = false): void => {
		let moeny
		if (this.state.currentSwiper === 1) {
			moeny = this.state.income.moeny
		} else {
			moeny = this.state.outcome.moeny
		}
		const newData = JSON.parse(JSON.stringify(this.state.income))
		if (clearFlag) {
			newData.moeny = '0'
			this.state.currentSwiper === 1 ? this.setState({ income: newData }) : this.setState({ outcome: newData })
			return
		}
		if (moeny !== '') {
			moeny = moeny.substr(0, moeny.length - 1)
			if (moeny === '') {
				newData.moeny = '0'
			} else {
				newData.moeny = moeny
			}
			this.state.currentSwiper === 1 ? this.setState({ income: newData }) : this.setState({ outcome: newData })
		}
	}
	handleConfirm = (): void => {
		this.props.history.go(-2)
	}
	render(): JSX.Element {
		const { currentCategory, currentIcon, moeny, paymentType } = this.state.income
		const { currentIconId } = this.state
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
				<div className={style.header}>
					<AccTab current={this.state.currentSwiper} classes={style.headerTab}>
						<TabItem value={PaymentType.Outcome} label='支出' />
						<TabItem value={PaymentType.Income} label='收入' />
					</AccTab>
				</div>
				<Swiper {...this.swiperParams}>
					<section className={style.addDetail}>
						<div style={{ padding: '0 .12rem' }}>
							<AccountItem {...IconProps} />
						</div>
						<AccountSwiper
							onIconClick={this.handleSelected}
							currentIconId={currentIconId}
							iconArr={this.outcomeCategories}
							ItemClass={style.outcomeActive}
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
					<section className={style.addDetail}>
						<div style={{ padding: '0 .12rem' }}>
							<AccountItem {...IconProps} />
						</div>
						<AccountSwiper
							onIconClick={this.handleSelected}
							currentIconId={currentIconId}
							iconArr={this.incomeCategories}
							ItemClass={style.incomeActive}
						/>
						<div className={style.addFooter}>
							<KeyBoard
								okBtnColor='#ffd31a'
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
				</Swiper>
			</div>
		)
	}
}

export default Addaccount
