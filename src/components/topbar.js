import React from 'react';
import PropTypes from 'prop-types';

function TopBar(props) {
  return (
    <div className="container bg-black mx-auto
    border-dashed border-b-2 border-white h-17
    grid content-center">
      <h1 className="text-white text-center
      text-3xl py-1">{props.title}</h1>
    </div>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

TopBar.defaultProps = {
  title: 'BOT',
};

export default TopBar;
