import React from 'react'
import { useCount } from '../hooks/useCount'

export default function HomePage() {

    const [count, increment, decrement ] = useCount();

    return (
        <div>
            home page
            <br/>
            count : {count}

            <div>
                <button type="button" onClick={() => increment()}>increment</button>
                <button type="button" onClick={() => decrement()}>decrement</button>
            </div>

        </div>
    )
}
