import React from 'react';
import BreweryTable from './features/brewery/ui/BreweryTable/BreweryTable';


const App: React.FC = () => {
  return (
    <div>
      <h1 style={{width: '100%', textAlign: 'center'}}>Brewery List</h1>
      <BreweryTable />
    </div>
  );
};

export default App;
