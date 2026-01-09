const VALID_CATEGORIES = [
  "Food",
  "Utilities",
  "Shopping",
  "Travel",
  "Rent",
  "Entertainment",
  "Other"
];

const VALID_PAYMENT_MODES = [
  "Cash",
  "UPI",
  "Debit Card",
  "Credit Card",
  "Net Banking",
  "Other"
];

const REQUIRED_HEADERS = [
  "amount",
  "date",
  "category",
  "paymentMode"
];

const validateRow = (row, rowIndex) => {
  const errors = [];

  // Date
  const date = new Date(row.date);
  if (!row.date || isNaN(date.getTime())) {
    errors.push(`Invalid date`);
  }

  // Amount
  const amount = Number(row.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.push(`Invalid amount`);
  }

  // Category
  if (!VALID_CATEGORIES.includes(row.category)) {
    errors.push(`Invalid category`);
  }

  // Payment mode
  if (!VALID_PAYMENT_MODES.includes(row.paymentMode)) {
    errors.push(`Invalid payment mode`);
  }

  // Note
  if (row.note && typeof row.note !== "string") {
    errors.push(`Invalid note`);
  }

  if (errors.length > 0) {
    return {
      valid: false,
      row: rowIndex + 1,
      errors
    };
  }

  return {
    valid: true,
    data: {
      date,
      amount,
      category: row.category,
      paymentMode: row.paymentMode,
      note: row.note || ""
    }
  };
};

const validateCsv = (csvData) => {
  if (!csvData || csvData.length === 0) {
    return { valid: false, message: "CSV file is empty" };
  }

  // Header validation
  const headers = Object.keys(csvData[0]);
  for (const header of REQUIRED_HEADERS) {
    if (!headers.includes(header)) {
      return {
        valid: false,
        message: `Missing required header: ${header}`
      };
    }
  }

  const validRows = [];
  const invalidRows = [];

  csvData.forEach((row, index) => {
    const result = validateRow(row, index);
    if (result.valid) {
      validRows.push(result.data);
    } else {
      invalidRows.push(result);
    }
  });

  return {
    valid: invalidRows.length === 0,
    validRows,
    invalidRows
  };
};

export default validateCsv;
export { validateCsv };
