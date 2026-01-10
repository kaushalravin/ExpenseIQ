import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PreviewData({csvParsedData}){
      return (
        <div className="show-data-container">
            <TableContainer 
                component={Paper}
                sx={{
                    borderRadius: '16px',
                    boxShadow: 'none',
                    border: '1px solid #e5e7eb',
                    overflow: 'auto',
                    maxWidth: '100%',
                    maxHeight: '400px',
                    '@media (max-width: 768px)': {
                        borderRadius: '12px',
                        maxHeight: '300px'
                    }
                }}
            >
                <Table 
                    sx={{ 
                        minWidth: 650,
                        '@media (max-width: 768px)': {
                            minWidth: 800
                        },
                        '& .MuiTableCell-root': {
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
                        }
                    }} 
                    aria-label="expense table"
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                background: '#3b82f6',
                                '& .MuiTableCell-head': {
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    letterSpacing: '0.02em',
                                    textTransform: 'uppercase',
                                    borderBottom: 'none',
                                    padding: '1rem'
                                }
                            }}
                        >
                            <TableCell align="right" sx={{ borderTopLeftRadius: '16px' }}>Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Note</TableCell>
                            <TableCell align="right">Payment Mode</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {csvParsedData.map((row, index) => (
                            <TableRow
                                key={row.name || index}
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': {
                                        background: '#f8fafc',
                                        transition: 'all 0.2s ease'
                                    },
                                    '& .MuiTableCell-body': {
                                        fontSize: '0.9375rem',
                                        color: '#334155',
                                        padding: '1rem',
                                        borderBottom: '1px solid #f1f5f9'
                                    }
                                }}
                            >
                                <TableCell 
                                    align="right"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#64748b !important'
                                    }}
                                >
                                    {row.date}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '1rem !important',
                                        color: '#3b82f6 !important'
                                    }}
                                >
                                    ₹{row.amount}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    sx={{
                                        '& span': {
                                            background: '#eff6ff',
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: '#2563eb',
                                            display: 'inline-block'
                                        }
                                    }}
                                >
                                    <span>{row.category}</span>
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    sx={{
                                        fontStyle: row.note ? 'normal' : 'italic',
                                        color: row.note ? '#374151 !important' : '#9ca3af !important'
                                    }}
                                >
                                    {row.note || 'No note'}
                                </TableCell>
                                <TableCell 
                                    align="right"
                                    sx={{
                                        '& span': {
                                            background: '#f8fafc',
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: '#64748b',
                                            display: 'inline-block'
                                        }
                                    }}
                                >
                                    <span>{row.paymentMode}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>)
}