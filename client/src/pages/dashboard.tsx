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
    <Box
      minH="100vh"
      width="800px"
      marginX="auto"
      border="2px solid"
      borderColor="blue.300"
      borderRadius="xl"
    >
      <Navbar
        setSortCriteria={setSortCriteria}
        setFilterCriteria={setFilterCriteria}
      />
      <DashboardComponent
        sortCriteria={sortCriteria}
        filterCriteria={filterCriteria}
      />
    </Box>
  );
}
