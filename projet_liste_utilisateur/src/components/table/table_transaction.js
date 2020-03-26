import React, { Component } from 'react';

// Import Material UI //
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Import Material UI Icons //
import EuroIcon from '@material-ui/icons/Euro';

export default class tableTransaction extends Component {
    render() {
        return (
            <Paper>
                <h2 id="InfoTransaction">Transactions</h2>
                <TableContainer component={Paper}>
                    <Table className="table_Transaction" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Montant</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Lieux</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.transactions.map(row => (
                                <TableRow key={row.idT}>
                                    <TableCell align="right">{row.montantT}<EuroIcon fontSize="small" /></TableCell>
                                    <TableCell align="right">{row.dateT}</TableCell>
                                    <TableCell align="right">{row.lieuxT}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
}