import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card.jsx";

export default function CardParent() {
    const [cardData, setCardData] = useState({
        currentMonthExpenseTotal: 0,
        previousMonthExpenseTotal: 0,
        currentYearExpenseTotal: 0,
        previousYearExpenseTotal: 0,
        totalExpense: 0,
        highestExpenseYear: 0,
        highestCategory: null
    });

    useEffect(() => {
        async function getData() {
            try {
                const [
                    cmeRes,
                    pmeRes,
                    cyeRes,
                    pyeRes,
                    teRes,
                    hcRes,
                    heyRes
                ] = await Promise.all([
                    axios.get("http://localhost:3000/api/analytics/Expense-month"),
                    axios.get("http://localhost:3000/api/analytics/Expense-month-prev"),
                    axios.get("http://localhost:3000/api/analytics/Expense-year"),
                    axios.get("http://localhost:3000/api/analytics/Expense-year-prev"),
                    axios.get("http://localhost:3000/api/analytics/totalExpense"),
                    axios.get("http://localhost:3000/api/analytics/highest-category-year"),
                    axios.get("http://localhost:3000/api/analytics/highest-expense-year")
                ]);

                setCardData({
                    currentMonthExpenseTotal: cmeRes.data.data.totalThisMonth,
                    previousMonthExpenseTotal: pmeRes.data.data.totalPrevMonth,
                    currentYearExpenseTotal: cyeRes.data.data.totalThisYear.totalAmount,
                    previousYearExpenseTotal: pyeRes.data.data.totalPrevYear.totalAmount,
                    totalExpense: teRes.data.data.total,
                    highestCategory: hcRes.data.data,
                    highestExpenseYear: heyRes.data.data.amount
                });

            } catch (err) {
                console.error("Analytics fetch failed:", err);
            }
        }

        getData();
    }, []);

    return (
        <div>
            <Card message="Current Month Expense" value={cardData.currentMonthExpenseTotal} percentChange={((cardData.currentMonthExpenseTotal/cardData.previousMonthExpenseTotal)*100)-100} />
            {/*<Card message="Previous Month Expense" value={cardData.previousMonthExpenseTotal} />*/}
            <Card message="Current Year Expense" value={cardData.currentYearExpenseTotal} percentChange={((cardData.currentYearExpenseTotal/cardData.previousYearExpenseTotal)*100)-100} />
            {/*<Card message="Previous Year Expense" value={cardData.previousYearExpenseTotal} />*/}
            <Card message="Total Expense" value={cardData.totalExpense} percentChange={null}/>
            <Card message="Highest Expense This Year" value={cardData.highestExpenseYear || 0} percentChange={null}/>
            <Card
                message="Top Category This Year"
                value={cardData.highestCategory?.category || "N/A"}
            />
        </div>
    );
}
