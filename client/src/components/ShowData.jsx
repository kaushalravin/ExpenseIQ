import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import "../styles/showdata.css"

export default function ShowData({ data, handleDelete, handleUpdate }) {
    return (
        <div className="show-data-container">
            <TableContainer 
                component={Paper}
                sx={{
                    borderRadius: '16px',
                    boxShadow: 'none',
                    border: '1px solid #e5e7eb',
                    overflow: 'hidden'
                }}
            >
                <Table 
                    sx={{ 
                        minWidth: 650,
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
                            <TableCell align="center">Update</TableCell>
                            <TableCell align="center" sx={{ borderTopRightRadius: '16px' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
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
                                <TableCell align="center"> 
                                    <button className="table-btn table-btn-update" onClick={() => { handleUpdate(row) }}>
                                        <svg viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Update
                                    </button>
                                </TableCell>
                                <TableCell align="center">
                                    <button className="table-btn table-btn-delete" onClick={() => { handleDelete(row._id) }}>
                                        <svg viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {data.length === 0 && (
                <div className="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3>No expenses yet</h3>
                    <p>Start tracking your expenses by adding your first entry above</p>
                </div>
            )}
        </div>
    );
}