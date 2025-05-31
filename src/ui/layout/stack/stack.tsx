import './stack.scss'

export function Stack({ children }) {
    return (
        <div className="stack-divs__base">
            { children.map((c, i) => (
                <div key={i} className='stack-divs__layer'>
                    {c}
                </div>
            )) }
        </div>
    )
}
