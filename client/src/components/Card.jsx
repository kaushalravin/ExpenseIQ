import "../styles/Card.css";

export default function Card({message, value, percentChange, isCategory}){
    const isNegative = percentChange !== null && percentChange < 0;
    const cardClass = isCategory ? "card category" : "card currency";
    const showRupee = !isCategory && !message.toLowerCase().includes("transaction");
    
    return(
        <div className={cardClass}>
            <h3>{message}</h3>
            {percentChange != null && (
                <h3 className={isNegative ? "negative-change" : "positive-change"}>
                    {percentChange > 0 ? "+" : ""}{percentChange.toFixed(2)}%
                </h3>
            )}
            <h2>{showRupee && "₹"}{value}</h2>
        </div>
    )
}