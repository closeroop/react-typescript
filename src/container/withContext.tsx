/* eslint-disable react/display-name */
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AppContext } from './../App'

export default (Component: any) => {
	return (props: RouteComponentProps) => (
		<AppContext.Consumer>
			{({ accountTable, actions }) => <Component {...props} accountTable={accountTable} actions={actions} />}
		</AppContext.Consumer>
	)
}
