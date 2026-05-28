import React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { transactionRows } from '../../../../util/data';
import './transactionTable.scss';

const TransactionTable = () => {
	return (
		<TableContainer component={Paper} className='transaction-table'>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell className='table-cell'>Tracking ID</TableCell>
						<TableCell className='table-cell'>Product</TableCell>
						<TableCell className='table-cell'>Customer</TableCell>
						<TableCell className='table-cell'>Date</TableCell>
						<TableCell className='table-cell'>Amount</TableCell>
						<TableCell className='table-cell'>Payment Method</TableCell>
						<TableCell className='table-cell'>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{transactionRows?.map((row) => (
						<TableRow key={row.id}>
							<TableCell className='table-cell'>{row.id}</TableCell>
							<TableCell className='table-cell'>
								<div className='cell-wrapper'>
									<img src={row.img} alt='' className='image' />
									{row.product}
								</div>
							</TableCell>
							<TableCell className='table-cell'>{row.customer}</TableCell>
							<TableCell className='table-cell'>{row.date}</TableCell>
							<TableCell className='table-cell'>{row.amount}</TableCell>
							<TableCell className='table-cell'>{row.method}</TableCell>
							<TableCell className='table-cell'>
								<span className={`status ${row.status}`}>{row.status}</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TransactionTable;
