import * as XLSX from "xlsx";

const exportFilteredExpenses = (data) => {
    if (!data || data.length === 0) {
        return null;
    }

    // Optional: format data for Excel
    const formattedData = data.map((item) => ({
        Date: typeof item.date === "string" ? item.date.split("T")[0] : item.date,
        Amount: item.amount,
        Category: item.category,
        Note: item.note || "",
        PaymentMode: item.paymentMode || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Expenses");

    // Convert workbook to binary array
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    // Create Blob
    const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    // Create downloadable URL
    const url = URL.createObjectURL(blob);

    return url; // 👈 THIS is the download link
};

export default exportFilteredExpenses;
