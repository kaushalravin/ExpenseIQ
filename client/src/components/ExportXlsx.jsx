export default function ExportXlsx({
    link,
    fileName = "filtered_expenses.xlsx",
    onAfterDownload
}) {
    if (!link) return null;

    const handleClick = () => {
        if (typeof link === "string" && link.startsWith("blob:")) {
            // Give the browser a moment to start the download before revoking.
            setTimeout(() => {
                URL.revokeObjectURL(link);
                if (typeof onAfterDownload === "function") onAfterDownload();
            }, 1000);
        }
    };

    return (
        <div className="download-link-container">
            <a 
                href={link} 
                download={fileName} 
                onClick={handleClick}
                className="download-link"
            >
                <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                Download Excel File
                <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </a>
        </div>
    );
}
