import React from 'react';

type ResetFiltersButtonProps = {
  resetFilters: () => void;
};

const ResetFiltersButton: React.FC<ResetFiltersButtonProps> = ({ resetFilters }) => {
  const buttonStyle: React.CSSProperties = {
    position: 'sticky',
    top: 10,
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    marginLeft: '20px',
    marginBottom: '36px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#e53935',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      style={isHovered ? buttonHoverStyle : buttonStyle}
      onClick={resetFilters}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Reset Filters
    </button>
  );
};

export default ResetFiltersButton;
