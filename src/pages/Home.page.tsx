import React from 'react'
import { useCount } from '../hooks/useCount'
import { Button } from 'antd'

export default function HomePage() {

    const [count, increment, decrement ] = useCount();

    return (
        <div>
            <h1>HomePage</h1>
            <br/>
            count : {count}
            <div>
                <Button type="default" onClick={() => increment()}>increment</Button>
                <Button type="primary" onClick={() => decrement()}>decrement</Button>
            </div>

        </div>
    )
}
