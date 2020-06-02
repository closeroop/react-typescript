import React from 'react'
import style from './index.module.scss'
import PropType from 'prop-types'

interface IProps {
	todayIncome?: number
	todayOutcome?: number
}

const IncomeHead: React.FC<IProps> = props => {
	return (
		<div className={style.incomeHead}>
			<p>
				今日支出<span>{'¥' + tools.formatMoney(props.todayOutcome)}</span>
			</p>
			<p>
				收入<span>{'¥' + tools.formatMoney(props.todayIncome)}</span>
			</p>
		</div>
	)
}
IncomeHead.defaultProps = {
	todayIncome: 0,
	todayOutcome: 0,
}
IncomeHead.propTypes = {
	todayIncome: PropType.number,
	todayOutcome: PropType.number,
}

export default IncomeHead
