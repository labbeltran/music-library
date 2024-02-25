import loading from './loading-buffering.js'

const Spinner = () => {
    return (
        <div>
            <img src={loading} alt="loading..." />
        </div>
    )
}

export default Spinner