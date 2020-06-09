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
import { IconProps } from './../../components/AccountSwiper/index'

type IconArr = IconProps

interface Istate {
	id: number | string
	paymentType: PaymentType
	moeny: string
	category: string
	icon: keyof typeof IconType
}

type IstateUnite = {
	income: Istate
	outcome: Istate
	currentSwiper: number
}

interface IqueryProps {
	type: string // 0-new 1-outcome 2-income
	[index: string]: string
}

const iconArr = ItemList as IconArr[]
let swiperEl: any

// 模拟路由传的参
const routeDate: Istate = {
	id: '0002',
	paymentType: 2,
	moeny: '30',
	category: '吃饭',
	icon: 'food',
}
const currentSwiper = 0
const type = '2'

class Addaccount extends Component<RouteComponentProps, IstateUnite> {
	incomeCategories: IconArr[] = []
	outcomeCategories: IconArr[] = []
	moneyMaxLength: number
	swiperParams: any
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			income: {
				id: '',
				paymentType: 1,
				moeny: '',
				category: '',
				icon: 'food',
			},
			outcome: {
				id: '',
				paymentType: 2,
				moeny: '',
				category: '',
				icon: 'food',
			},
			currentSwiper: 0, // 后期路由判断
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
				},
			},
		}
	}
	componentDidMount(): void {
		this.initPage()
	}
	initPage = (): void => {
		// 0-new 1-income 2-outcome
		let income: Istate = {
			id: this.incomeCategories[0].id,
			paymentType: this.incomeCategories[0].type,
			moeny: '0',
			category: this.incomeCategories[0].name,
			icon: this.incomeCategories[0].icon,
		}
		let outcome: Istate = {
			id: this.outcomeCategories[0].id,
			paymentType: this.outcomeCategories[0].type,
			moeny: '0',
			category: this.outcomeCategories[0].name,
			icon: this.outcomeCategories[0].icon,
		}
		if (Number(type)) {
			if (type === '2') {
				outcome = {
					id: routeDate.id,
					paymentType: routeDate.paymentType,
					moeny: routeDate.moeny,
					category: routeDate.category,
					icon: routeDate.icon,
				}
			} else {
				income = {
					id: routeDate.id,
					paymentType: routeDate.paymentType,
					moeny: routeDate.moeny,
					category: routeDate.category,
					icon: routeDate.icon,
				}
			}
		}
		this.setState({
			income,
			outcome,
		})
	}
	handleSelected = (slectItem: IconProps): void => {
		const currentType = this.state.currentSwiper === 1 ? 'income' : 'outcome'
		const newData: Istate = JSON.parse(JSON.stringify(this.state[currentType]))
		newData.id = slectItem.id
		newData.category = slectItem.name
		newData.paymentType = slectItem.type
		newData.icon = slectItem.icon
		this.state.currentSwiper === 1 ? this.setState({ income: newData }) : this.setState({ outcome: newData })
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
		const newData: Istate = JSON.parse(JSON.stringify(this.state[currentType]))
		newData.moeny = moeny
		this.state.currentSwiper === 1 ? this.setState({ income: newData }) : this.setState({ outcome: newData })
	}
	handleDeleted = (clearFlag = false): void => {
		let moeny
		const currentType = this.state.currentSwiper === 1 ? 'income' : 'outcome'
		if (this.state.currentSwiper === 1) {
			moeny = this.state.income.moeny
		} else {
			moeny = this.state.outcome.moeny
		}
		const newData: Istate = JSON.parse(JSON.stringify(this.state[currentType]))
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
	handleTabChange = (infos: { value: string | number; label: string }): void => {
		console.log(infos)
		if (+infos.value === 1) {
			swiperEl.slideTo(1)
		} else {
			swiperEl.slideTo(0)
		}
	}
	render(): JSX.Element {
		const { income, outcome, currentSwiper } = this.state
		console.log(currentSwiper, 'Addaccount', Date.now())
		return (
			<div className={style.addAccount}>
				<div className={style.header}>
					<AccTab
						current={currentSwiper}
						classes={style.headerTab}
						onChange={(infos: { value: string | number; label: string }) => {
							this.handleTabChange(infos)
						}}>
						<TabItem value={PaymentType.Outcome} label='支出' />
						<TabItem value={PaymentType.Income} label='收入' />
					</AccTab>
				</div>
				<Swiper {...this.swiperParams}>
					<section className={style.addDetail}>
						<div style={{ padding: '0 .12rem', backgroundColor: '#fff' }}>
							<AccountItem {...outcome} formatMoney={false} />
						</div>
						<AccountSwiper
							onIconClick={this.handleSelected}
							currentIconId={outcome.id}
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
						<div style={{ padding: '0 .12rem', backgroundColor: '#fff' }}>
							<AccountItem {...income} formatMoney={false} />
						</div>
						<AccountSwiper
							onIconClick={this.handleSelected}
							currentIconId={income.id}
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
