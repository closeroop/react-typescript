import React from 'react'
import PropType from 'prop-types'

import Icon from './../AccountIcon/index'
import style from './index.module.scss'

interface Iprops {
	onEnter?: (val: string) => void
	onClear?: () => void
	onDelete?: () => void
	onConfirm?: () => void
	okBtnText?: string
	okFontColor?: string
	okBtnColor?: string
	isShowClearBtn?: boolean
}

enum dutyType {
	Deleted = 'deleted',
	Clear = 'clear',
	Confirm = 'confirm',
}

// interface MouseEvent extends React.MouseEvent {
// 	target: HTMLInputElement & EventTarget
// }

const KeyBoard: React.FC<Iprops> = props => {
	const handleDeleted = () => {
		if (props.onDelete && typeof props.onDelete === 'function') {
			props.onDelete()
		}
	}
	const handleClear = () => {
		if (props.onClear && typeof props.onClear === 'function') {
			props.onClear()
		}
	}
	const handleNumber = (value: string) => {
		if (props.onEnter && typeof props.onEnter === 'function') {
			props.onEnter(value)
		}
	}
	const handleConfirm = () => {
		if (props.onConfirm && typeof props.onConfirm === 'function') {
			props.onConfirm()
		}
	}
	const handleClick = (e: any): void => {
		console.log(e.target.dataset)
		e.stopPropagation()
		if (e.target.dataset && e.target.dataset.duty) {
			switch (e.target.dataset.duty) {
				case dutyType.Clear:
					handleClear()
					break
				case dutyType.Confirm:
					handleConfirm()
					break
				case dutyType.Deleted:
					handleDeleted()
					break
			}
		}
		if (e.target.dataset && e.target.dataset.value) {
			const value = e.target.dataset.value
			handleNumber(value)
		}
	}
	return (
		<div className={style.keyboardContainer}>
			<ul
				className={style.keyboard}
				onClick={e => {
					handleClick(e)
				}}>
				<li data-value='1'>1</li>
				<li data-value='2'>2</li>
				<li data-value='3'>3</li>
				<li className={style.deleted}>
					<div data-duty={dutyType.Deleted} className={style.iconMask}></div>
					<Icon name='goback' style={{ zIndex: 10 }} />
				</li>
				<li data-value='4'>4</li>
				<li data-value='5'>5</li>
				<li data-value='6'>6</li>
				<li data-value='7'>7</li>
				<li data-value='8'>8</li>
				<li data-value='9'>9</li>
				{props.isShowClearBtn ? <li data-duty={dutyType.Clear}>清空</li> : null}
				<li data-value='0' className={!props.isShowClearBtn ? style.noClear : ''}>
					0
				</li>
				<li data-value='.'>.</li>
				<li
					data-duty={dutyType.Confirm}
					style={{ backgroundColor: props.okBtnColor, color: props.okFontColor }}
					className={style.confirm}>
					{props.okBtnText}
				</li>
			</ul>
		</div>
	)
}

KeyBoard.propTypes = {
	onEnter: PropType.func,
	onDelete: PropType.func,
	onClear: PropType.func,
	onConfirm: PropType.func,
	okBtnText: PropType.string,
	okBtnColor: PropType.string,
	okFontColor: PropType.string,
	isShowClearBtn: PropType.bool,
}

KeyBoard.defaultProps = {
	okBtnText: '确定',
	okBtnColor: '#fff',
	isShowClearBtn: true,
}

export default KeyBoard
