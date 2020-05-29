import React, { useState, useEffect, useRef } from 'react'
const Demo1: React.FC = () => {
	const [count, setCount] = useState(0)

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	)
}

export default Demo1
