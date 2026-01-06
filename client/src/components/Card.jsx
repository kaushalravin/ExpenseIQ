export default function Card({message,value,percentChange}){
    return(
        <div className="card">
            <h3>{message}</h3>
            {percentChange!=null && <h3>{percentChange.toFixed(2)}%</h3>}
            <h2>{value}</h2>
        </div>
    )
}