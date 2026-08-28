import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import './chart.scss';

const Chart = ({ data, aspect, title }) => {
	return (
		<div className='chart'>
			<div className='title'>{title}</div>
			<ResponsiveContainer width='100%' aspect={aspect}>
				<AreaChart
					width={730}
					height={250}
					data={data}
					margin={{ top: 0, right: 15, left: 15, bottom: -5 }}
				>
					<defs>
						<linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
							<stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey='name' stroke='gray' />
					<CartesianGrid strokeDasharray='3 3' className='chart-grid' />
					<Tooltip />
					<Area
						type='monotone'
						dataKey='New Subscribers'
						stroke='#8884d8'
						fillOpacity={1}
						fill='url(#total)'
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
