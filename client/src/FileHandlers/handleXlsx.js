import * as XLSX from "xlsx";

const normalizeExcelRow = (row) => {
  if (typeof row.date === "number") {
    row.date = XLSX.SSF.format("yyyy-mm-dd", row.date);
  }
  return row;
};

const handleXlsx = (file,setCsvData) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Use first sheet only (fast + simple)
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(worksheet, {
        defval: "" // empty cells -> ""
      });

      const normalised=json.map((row)=>normalizeExcelRow(row));
      setCsvData(normalised);

      resolve(json);
      
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

};


export {handleXlsx,normalizeExcelRow};