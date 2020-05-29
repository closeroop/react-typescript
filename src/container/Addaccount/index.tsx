import React, { Component } from 'react'

class HomePage<T> extends Component<T> {
	constructor(props: Readonly<T>) {
		super(props)
		this.state = {
			name: 'yx',
		}
	}
	render(): JSX.Element {
		return <div>3</div>
	}
}

export default HomePage
