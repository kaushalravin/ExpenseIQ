import ShowData from "./ShowData.jsx";
import PreviewData from "./PreviewData.jsx";
import "../styles/csvPreview.css";

export default function CsvPreview({ csvParsedData, onConfirm, onCancel }){
    return(
        <div className="csv-preview-overlay" onClick={onCancel}>
            <div className="csv-preview-container" onClick={(e) => e.stopPropagation()}>
                <div className="csv-preview-header">
                    <div className="csv-preview-header-content">
                        <div className="csv-preview-icon">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="csv-preview-title">CSV Upload Preview</h2>
                            <p className="csv-preview-subtitle">{csvParsedData.length} expense{csvParsedData.length !== 1 ? 's' : ''} ready to import</p>
                        </div>
                    </div>
                    <button className="csv-preview-close" onClick={onCancel}>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="csv-preview-content">
                    <div className="csv-preview-info">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>Review the data below before confirming the upload</span>
                    </div>
                    <div className="csv-preview-table-wrapper">
                        <PreviewData csvParsedData={csvParsedData}/>
                    </div>
                </div>
                <div className="csv-preview-footer">
                    <button className="csv-btn csv-btn-cancel" onClick={onCancel}>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Cancel
                    </button>
                    <button className="csv-btn csv-btn-confirm" onClick={onConfirm}>
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Confirm Upload
                    </button>
                </div>
            </div>
        </div>
    )
}