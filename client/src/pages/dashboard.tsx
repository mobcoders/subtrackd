import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import DashboardComponent from '../components/DashboardComponent';

export default function Dashboard() {
  // STATES:
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  // RENDER:
  return (
    <div className="col-span-12">
      <Navbar
        setSortCriteria={setSortCriteria}
        setFilterCriteria={setFilterCriteria}
      />
      <DashboardComponent
        sortCriteria={sortCriteria}
        filterCriteria={filterCriteria}
      />
    </div>
  );
}
