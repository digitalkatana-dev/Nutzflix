import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import './widget.scss';

const Widget = ({ type, size, newSubs, list }) => {
  let data;

  const diff = 20;

  switch (type) {
    case 'sub':
      data = {
        title: 'SUBSCRIBERS',
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
    case 'movie':
      data = {
        title: 'MOVIES',
        link: 'View all movies',
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
    case 'series':
      data = {
        title: 'SERIES',
        link: 'View all series',
        icon: (
          <MonetizationOnOutlinedIcon
            className='icon'
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
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
        <span className='counter'>{list?.length || 0}</span>
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
