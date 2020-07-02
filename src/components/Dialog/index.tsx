import React from 'react'
import ReactDOM from 'react-dom'
import PropType from 'prop-types'

import style from './index.module.scss'

interface IDialog {
	isOpen?: boolean
	title?: string
	content?: string
	type?: 'alert' | 'confirm' | 'textarea'
	okBtnConfig?: {
		text?: string
		callBack?: (value?: string) => void
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
	textarea: React.RefObject<HTMLTextAreaElement>
	constructor(props: IDialog) {
		super(props)
		this.el = document.createElement('div')
		this.textarea = React.createRef()
	}
	componentDidMount(): void {
		if (this.props.isOpen) {
			appRoot!.appendChild(this.el)
			if (this.props.type === 'textarea') {
				this.textarea.current!.focus()
			}
		}
	}
	shouldComponentUpdate(nextProps: IDialog): boolean {
		return nextProps.isOpen !== this.props.isOpen || nextProps.content !== this.props.content
	}
	componentDidUpdate(): void {
		if (!this.props.isOpen) {
			if (appRoot!.contains(this.el)) {
				appRoot!.removeChild(this.el)
			}
		} else {
			appRoot!.appendChild(this.el)
			if (this.props.type === 'textarea') {
				this.textarea.current!.value = this.props.content!
				this.textarea.current!.focus()
			}
		}
	}
	componentWillUnmount(): void {
		if (this.props.isOpen) {
			appRoot!.removeChild(this.el)
		}
	}
	handleTextAreaClick = (): void => {
		const value = this.textarea.current!.value || ''
		if (typeof this.props.okBtnConfig!.callBack === 'function') {
			this.props.okBtnConfig!.callBack(value)
		}
	}
	handleOkBtnClick = (): void => {
		if (typeof this.props.okBtnConfig!.callBack === 'function') {
			this.props.okBtnConfig!.callBack()
		}
	}
	handleCancelBtnClick = (): void => {
		if (typeof this.props.cancelBtnConfig!.callBack === 'function') {
			this.props.cancelBtnConfig!.callBack()
		}
	}
	render(): JSX.Element {
		const dialog = (
			<div className={style.dialogBox}>
				<div className={style.dialogContent}>
					<h3 className={style.title}>{this.props.title}</h3>
					<div className={style.content}>{this.props.content}</div>
					<div className={style.btns}>
						<button
							onClick={this.handleCancelBtnClick}
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
		const textarea = (
			<div className={style.dialogBox}>
				<div className={style.textareaContent}>
					<h3 className={style.title}>{this.props.title}</h3>
					<textarea
						className={style.content}
						maxLength={30}
						defaultValue={this.props.content}
						placeholder='输入备注（30字）'
						autoFocus
						ref={this.textarea}></textarea>
					<div className={style.btns}>
						<button onClick={this.handleCancelBtnClick}>{this.props.cancelBtnConfig!.text}</button>
						<button className={style.okBtn} onClick={this.handleTextAreaClick}>
							{this.props.okBtnConfig!.text}
						</button>
					</div>
				</div>
			</div>
		)
		const componemnt = this.props.type === 'textarea' ? textarea : dialog
		return ReactDOM.createPortal(componemnt, this.el)
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
	type: PropType.oneOf(['alert', 'confirm', 'textarea']),
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
