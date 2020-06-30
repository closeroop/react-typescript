import React from 'react'
import ReactDOM from 'react-dom'
import PropType from 'prop-types'

import style from './index.module.scss'

interface IDialog {
	isOpen?: boolean
	title?: string
	content?: string
	type?: 'alert' | 'confirm'
	okBtnConfig?: {
		text?: string
		callBack?: () => void
	}
	cancelBtnConfig?: {
		text?: string
		callBack?: () => void
	}
}

const appRoot = document.getElementById('root')
class Dialog extends React.Component<IDialog> {
	static defaultProps: IDialog
	static propTypes: any
	el: HTMLDivElement
	constructor(props: IDialog) {
		super(props)
		this.el = document.createElement('div')
	}
	componentDidMount(): void {
		if (this.props.isOpen) {
			appRoot!.appendChild(this.el)
		}
	}
	shouldComponentUpdate(nextProps: IDialog): boolean {
		return nextProps.isOpen !== this.props.isOpen
	}
	componentDidUpdate(): void {
		if (!this.props.isOpen) {
			appRoot!.removeChild(this.el)
		} else {
			appRoot!.appendChild(this.el)
		}
	}
	componentWillUnmount(): void {
		if (this.props.isOpen) {
			appRoot!.removeChild(this.el)
		}
	}
	handleOkBtnClick = (): void => {
		if (typeof this.props.okBtnConfig!.callBack === 'function') {
			this.props.okBtnConfig!.callBack()
		}
	}
	render(): JSX.Element {
		const dialog = (
			// <div className={style.dialogBox} style={{ display: this.props.isOpen! ? 'flex' : 'none' }}></div>
			<div className={style.dialogBox}>
				<div className={style.dialogContent}>
					<h3 className={style.title}>{this.props.title}</h3>
					<div className={style.content}>{this.props.content}</div>
					<div className={style.btns}>
						<button
							onClick={this.props.cancelBtnConfig!.callBack}
							style={{
								display: this.props.type === 'alert' ? 'none' : 'block',
								borderRight: '0.02rem solid rgb(234, 234, 234)',
							}}>
							{this.props.cancelBtnConfig!.text}
						</button>
						<button className={style.okBtn} onClick={this.handleOkBtnClick}>
							{this.props.okBtnConfig!.text}
						</button>
					</div>
				</div>
			</div>
		)
		return ReactDOM.createPortal(dialog, this.el)
	}
}

Dialog.defaultProps = {
	isOpen: false,
	title: '提示',
	content: '这是内容',
	type: 'alert',
	okBtnConfig: {
		text: '确定',
		callBack: undefined,
	},
	cancelBtnConfig: {
		text: '取消',
		callBack: undefined,
	},
}

Dialog.propTypes = {
	isOpen: PropType.bool,
	title: PropType.string,
	content: PropType.string,
	type: PropType.oneOf(['alert', 'confirm']),
	okBtnConfig: PropType.shape({
		text: PropType.string,
		callBack: PropType.func,
	}),
	cancelBtnConfig: PropType.shape({
		text: PropType.string,
		callBack: PropType.func,
	}),
}

export default Dialog
