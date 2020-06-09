import React, { useContext, useState, memo, useEffect, useRef } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import Icon from './../../components/AccountIcon'
import { IconTypeArr } from './../AccountIcon/iconTypes'

import 'swiper/css/swiper.css'
import style from './index.module.scss'

type ITabContext = {
	handleTabItemClick: (id: number) => void
	current: number
	onChange?: (infos: { value: string | number; label: string }) => void
}

const TabContext = React.createContext<ITabContext>({
	handleTabItemClick: function (id: number) {
		console.log(id)
	},
	current: 0,
	onChange: undefined,
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

export const TabItem: React.FC<ITabItem> = memo(
	props => {
		console.log('emit  TabItem', props.id)
		const { handleTabItemClick, current, onChange } = useContext(TabContext)
		const className = classnames(props.classes ? props.classes : '', style.tabItem, {
			[style.actived]: props.id === current,
		})
		function handleClick() {
			if (current !== props.id && typeof props.id !== 'undefined') {
				handleTabItemClick(props.id)
				if (onChange && typeof onChange === 'function') onChange({ value: props.value, label: props.label })
			}
		}
		return (
			<button onClick={handleClick} disabled={props.disable} className={className} style={props.style}>
				{(props.icon ? <Icon name={props.icon} /> : '') + props.label}
			</button>
		)
	},
	function (pre, next) {
		console.log(pre.id, next.id, 'TabItem', !(pre.id !== next.id) ? '渲染了' : '没渲染')
		return !(pre.id !== next.id)
	}
)

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
	onChange?: (infos: { value: string | number; label: string }) => void
	current?: number
	children: React.ReactElement<ITabItem>[]
	classes?: string
	style?: React.CSSProperties
}

const Tab: React.FC<ITab> = props => {
	console.log('emit  Tab', props.current)
	const lineWidth = props.children ? 100 / props.children.length : 0
	const [current, setCurrent] = useState(props.current ? props.current : 0)
	const [lineLeft, setLineLeft] = useState(props.current ? props.current * lineWidth : 0)
	const className = classnames(props.classes ? props.classes : '', style.tabContainer)
	console.log(current, lineLeft, 'tab')
	useEffect(() => {
		if (typeof props.current !== 'undefined' && props.current !== current) {
			handleTabItemClick(props.current)
		}
	}, [props.current])
	function handleTabItemClick(id: number) {
		setCurrent(id)
		setLineLeft(id * lineWidth)
	}
	return (
		<div className={className}>
			<TabContext.Provider value={{ current, handleTabItemClick, onChange: props.onChange }}>
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

export default memo(Tab, function (pre, next) {
	console.log(pre.current, next.current, 'Tab', pre.current !== next.current ? '渲染了' : '没渲染')
	return pre.current !== next.current
})
