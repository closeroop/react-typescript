import React, { FC } from 'react'
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
	const budget = props.budget
	return (
		<section className={style.statistics}>
			<h3>本月支出</h3>
			<div className={style.statisOutcome}>
				<h2>{props.outcome}</h2>
				<span>
					<Icon name='eyeopen'></Icon>
				</span>
			</div>
			<div className={style.statisIncome}>
				<p>
					本月收入<span>{props.income}</span>
				</p>
				<p>
					预算剩余<span>{props.isSetBudget ? budget : '未设置预算'}</span>
				</p>
			</div>
			<div className={style.statisChart}>查看表分析</div>
		</section>
	)
}
StatisticsBox.defaultProps = {
	income: 0,
	outcome: 0,
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
