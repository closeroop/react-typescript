import React, { FC, useState } from 'react'
import propTypes from 'prop-types'

import style from './index.module.scss'
import Icon from './../AccountIcon/index'

interface countProps {
	income?: number
	outcome?: number
	isSetBudget?: boolean //预算
	budget?: number
}

const StatisticsBox: FC<countProps> = props => {
	const [showMoney, setShowState] = useState(true)
	return (
		<section className={style.statistics}>
			<h3>本月支出</h3>
			<div className={style.statisOutcome}>
				<h2>{showMoney ? '¥' + tools.formatMoney(props.outcome) : '****'}</h2>
				<span
					onClick={() => {
						setShowState(!showMoney)
					}}>
					{showMoney ? (
						<Icon name='eyeopen' style={{ fontSize: '.42rem' }} />
					) : (
						<Icon name='eyeclose' style={{ fontSize: '.42rem' }} />
					)}
				</span>
			</div>
			<div className={style.statisIncome}>
				<p>
					本月收入<span>{showMoney ? '¥' + tools.formatMoney(props.income) : '****'}</span>
				</p>
				<p>
					预算剩余
					<span>{showMoney ? (props.isSetBudget ? '¥' + tools.formatMoney(props.budget) : '未设置预算') : '****'}</span>
				</p>
			</div>
			<div className={style.statisChart}>
				<Icon name='brokenline' style={{ verticalAlign: '-0.02rem', marginRight: '0.08rem' }} />
				查看表分析
			</div>
		</section>
	)
}
StatisticsBox.defaultProps = {
	income: 50,
	outcome: 1220,
	isSetBudget: false,
	budget: 0,
}

StatisticsBox.propTypes = {
	income: propTypes.number,
	outcome: propTypes.number,
	isSetBudget: propTypes.bool,
	budget: propTypes.number,
}

export default StatisticsBox
