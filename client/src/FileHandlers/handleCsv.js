import Papa from "papaparse";

function handleCsv(file,setCsvData){
    Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                setCsvData(result.data);
            },
            error: (err) => {
                console.error(err);
            }
        });
}

export {handleCsv};