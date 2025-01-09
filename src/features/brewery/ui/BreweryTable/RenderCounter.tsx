import React, { useEffect, useRef } from 'react';

const RenderCounter: React.FC = () => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return <p>Render Count: {renderCount.current}</p>;
};


export default RenderCounter;