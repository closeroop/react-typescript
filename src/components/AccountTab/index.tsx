import React, { useContext, useState, memo, useEffect } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import Icon from './../../components/AccountIcon'
import { IconTypeArr } from './../AccountIcon/iconTypes'

import 'swiper/css/swiper.css'
import style from './index.module.scss'

type ITabContext = {
	current: number
	handleTabItemClick: (id: number) => void
	onChange?: (infos: { value: string | number; label: string }) => void
}

const TabContext = React.createContext<ITabContext>({
	handleTabItemClick: function (id: number) {
		console.log(id)
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
	children?: React.ReactElement[]
}
/**
 * React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，
 * 且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。
 * 所以， current 变化的话 TabItem都会渲染的
 */
export const TabItem: React.FC<ITabItem> = memo(
	props => {
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
		// console.log(pre.id, next.id, 'TabItem', '渲没渲染, memo可能说了不算')
		return pre.id === next.id
	}
)

TabItem.displayName = 'TabItem'

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
	const lineWidth = props.children ? 100 / props.children.length : 0
	const [current, setCurrent] = useState(props.current ? props.current : 0)
	const [lineLeft, setLineLeft] = useState(props.current ? props.current * lineWidth : 0)
	const className = classnames(props.classes ? props.classes : '', style.tabContainer)
	// console.log(current, lineLeft, 'current&lineLeft Tab')
	// 如果你不需要从外部改变 ITab 组件 的 current 状态， useEffect其实是不用添加的， 但是这里我们需要。
	// 考虑到这些 onChange 回调 便不合适 放在 useEffect 里执行了
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
					const childElement = child as React.FunctionComponentElement<ITabItem>
					const { displayName } = childElement.type
					// Filter other elements by displayName
					if (displayName === 'TabItem') {
						return React.cloneElement(child, {
							id: index,
						})
					} else {
						console.error('only render TabItem components!')
					}
				})}
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
	console.log(pre.current, next.current, 'Tab', pre.current === next.current ? '没渲染' : '渲染了')
	// return true if you do not want to render
	return pre.current === next.current
})
