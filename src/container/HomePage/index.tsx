import React, { Component } from 'react'
import style from './index.module.scss'
import StatisticsBox from './../../components/StatisticsBox'
class HomePage<T> extends Component<T> {
	constructor(props: Readonly<T>) {
		super(props)
		this.state = {
			name: 'yx',
		}
	}
	render(): JSX.Element {
		return (
			<div className={style.homePage}>
				<StatisticsBox />
			</div>
		)
	}
}

export default HomePage
