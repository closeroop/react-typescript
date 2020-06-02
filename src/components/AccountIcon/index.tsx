import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { IconType, IconTypeArr, IconSize, IconSizeArr } from './iconTypes'

type IconSizes = keyof typeof IconSize
type IconNames = keyof typeof IconType

interface IProps {
	name: IconNames
	size?: IconSizes
	style?: React.CSSProperties
}
const Icon: React.FC<IProps> = props => {
	const className = classnames([
		'iconfont',
		'icon' + IconType[props.name],
		{
			'icon-big': props.size == IconSize.big,
			'icon-small': props.size == IconSize.small,
		},
	])
	return <i className={className} style={props.style}></i>
}
Icon.propTypes = {
	name: PropTypes.oneOf(IconTypeArr).isRequired,
	size: PropTypes.oneOf(IconSizeArr),
	style: PropTypes.object,
}

Icon.defaultProps = {
	size: 'normal',
	style: {},
	name: 'redpaket',
}
export default Icon
