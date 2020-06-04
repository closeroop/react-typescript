import React, { FC, useState } from 'react'
import propTypes from 'prop-types'

import style from './index.module.scss'
import Icon from './../AccountIcon/index'

interface IStatisticsProps {
	income?: number
	outcome?: number
	isSetBudget?: boolean //预算
	budget?: number
}

const StatisticsBox: FC<IStatisticsProps> = props => {
	const [showMoney, setShowState] = useState(true)
	return (
		<section className={style.statistics}>
			<h3>本月支出</h3>
			<div className={style.statisOutcome}>
				<h2>{showMoney ? '¥' + tools.formatMoney(props.outcome) : '****'}</h2>
				{/* tools 是全局声明对象，实体对象在util文件里编写完成并在项目初始化时注入到了全局window下， */}
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
