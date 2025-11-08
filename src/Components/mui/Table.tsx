import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import MuiTable from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableCaption from '@mui/material/Typography';

export const Table = (props: React.ComponentProps<typeof MuiTable>) => (
  <TableContainer>
    <MuiTable {...props} />
  </TableContainer>
);

export { TableHead, TableBody, TableRow, TableCell, TableFooter, TableCaption };

export default Table;
