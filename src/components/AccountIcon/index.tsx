import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { IconType, IconTypeArr, IconSize, IconSizeArr } from './iconTypes'

type IconSizes = keyof typeof IconSize
type IconName = keyof typeof IconType

interface IconConfig {
	name?: IconName
	size?: IconSizes
	style?: React.CSSProperties
}
const Icon: React.FC<IconConfig> = props => {
	const className = classnames([
		'iconfont',
		'icon-' + props.name,
		{
			'icon-big': props.size == IconSize.big,
			'icon-small': props.size == IconSize.small,
		},
	])
	return <i className={className}></i>
}
Icon.propTypes = {
	//size: PropTypes.oneOf(['normal', 'small', 'big']),
	size: PropTypes.oneOf(IconSizeArr as IconSizes[]),
	name: PropTypes.oneOf(IconTypeArr as IconName[]),
	style: PropTypes.object,
}

Icon.defaultProps = {
	size: 'normal',
	style: {},
	name: 'redpaket',
}
export default Icon
