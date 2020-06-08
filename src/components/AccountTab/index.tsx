import React, { useContext, useState, memo } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import Icon from './../../components/AccountIcon'
import { IconTypeArr } from './../AccountIcon/iconTypes'

import 'swiper/css/swiper.css'
import style from './index.module.scss'

const TabContext = React.createContext({
	handleTabItemClick: function (value: number) {
		console.log(value)
	},
	current: 0,
})

interface ITabItem {
	id?: number
	value: string | number
	label: string
	icon?: keyof typeof IconType
	disable?: boolean
	classes?: string
	style?: React.CSSProperties
	children?: React.ReactNode
}

export const TabItem: React.FC<ITabItem> = memo(props => {
	console.log('emit  TabItem')
	const { handleTabItemClick, current } = useContext(TabContext)
	const className = classnames(props.classes ? props.classes : '', style.tabItem, {
		[style.actived]: props.id === current,
	})
	return (
		<button
			onClick={() => {
				handleTabItemClick(props.id ? props.id : 0)
			}}
			disabled={props.disable}
			className={className}
			style={props.style}>
			{(props.icon ? <Icon name={props.icon} /> : '') + props.label}
		</button>
	)
})

TabItem.defaultProps = {
	label: 'Tab',
	value: '',
	classes: '',
}

TabItem.propTypes = {
	id: PropType.number,
	value: PropType.oneOfType([PropType.string, PropType.number]).isRequired,
	label: PropType.string.isRequired,
	icon: PropType.oneOf(IconTypeArr),
	disable: PropType.bool,
	classes: PropType.string,
	style: PropType.object,
	children: PropType.array,
}

interface ITab {
	onChange?: () => void
	current?: number
	children: React.ReactElement<ITabItem>[]
	classes?: string
	style?: React.CSSProperties
}

const Tab: React.FC<ITab> = props => {
	const lineWidth = props.children ? 100 / props.children.length : 0
	const [current, setCurrent] = useState(props.current ? props.current : 0)
	const [lineLeft, setLineLeft] = useState(props.current ? props.current * lineWidth : 0)
	const className = classnames(props.classes ? props.classes : '', style.tabContainer)
	function handleTabItemClick(id: number) {
		setCurrent(id)
		setLineLeft(id * lineWidth)
	}
	return (
		<div className={className}>
			<TabContext.Provider value={{ current, handleTabItemClick }}>
				{React.Children.map(props.children, (child, index) => {
					return React.cloneElement(child, {
						id: index,
					})
				})}
				{/* {props.children ? props.children : null} */}
			</TabContext.Provider>
			<span style={{ width: lineWidth + '%', left: lineLeft + '%' }} className={style.tabLine}></span>
		</div>
	)
}

Tab.defaultProps = {
	current: 0,
}

Tab.propTypes = {
	onChange: PropType.func,
	current: PropType.number,
	children: PropType.array.isRequired,
	classes: PropType.string,
	style: PropType.object,
}

export default Tab
