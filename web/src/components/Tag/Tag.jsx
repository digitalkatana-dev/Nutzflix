import React from 'react';
import './tag.scss';

const Tag = ({ className, tag }) => {
  return <p className={className}>{tag}</p>;
};

export default Tag;
