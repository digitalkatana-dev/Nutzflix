import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import './widget.scss';

const Widget = ({ type, size, newSubs }) => {
	let data;

	// Temp
	const amount = 100;
	const diff = 20;

	switch (type) {
		case 'sub':
			data = {
				title: 'SUBSCRIBERS',
				isMoney: false,
				link: 'See all subs',
				icon: (
					<PersonOutlinedIcon
						className='icon'
						style={{
							color: 'crimson',
							backgroundColor: 'rgba(255, 0, 0, 0.2)',
						}}
					/>
				),
			};
			break;
		case 'order':
			data = {
				title: 'ORDERS',
				isMoney: false,
				link: 'View all orders',
				icon: (
					<ShoppingCartOutlinedIcon
						className='icon'
						style={{
							backgroundColor: 'rgba(218, 165, 32, 0.2)',
							color: 'goldenrod',
						}}
					/>
				),
			};
			break;
		case 'earning':
			data = {
				title: 'EARNINGS',
				isMoney: true,
				link: 'View net earnings',
				icon: (
					<MonetizationOnOutlinedIcon
						className='icon'
						style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
					/>
				),
			};
			break;
		case 'balance':
			data = {
				title: 'BALANCE',
				isMoney: true,
				link: 'See details',
				icon: (
					<AccountBalanceWalletOutlinedIcon
						className='icon'
						style={{
							backgroundColor: 'rgba(128, 0, 128, 0.2)',
							color: 'purple',
						}}
					/>
				),
			};
			break;

		default:
			break;
	}

	if (size === 'lg') {
		return (
			<div className='widget-lg'>
				<div className='title'>New Subscribers</div>
				<ul className='sub-list'>
					{newSubs?.map((sub) => (
						<li className='item' key={sub?._id}>
							<img
								src={sub?.profilePhoto || '/profile_avatar.jpg'}
								alt=''
								className='image'
							/>
							<div className='sub'>
								<span className='username'>{sub?.username}</span>
							</div>
							<button className='display-btn'>
								<VisibilityIcon className='icon' />
								Display
							</button>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<div className='widget'>
			<div className='left'>
				<span className='title'>{data?.title}</span>
				<span className='counter'>
					{data?.isMoney && '$'} {amount}
				</span>
				<span className='link'>{data?.link}</span>
			</div>
			<div className='right'>
				<div className='percentage positive'>
					<KeyboardArrowUpIcon />
					{diff}%
				</div>
				{data?.icon}
			</div>
		</div>
	);
};

export default Widget;
