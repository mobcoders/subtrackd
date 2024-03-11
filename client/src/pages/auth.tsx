import { Box, Text } from '@chakra-ui/react';

function Auth() {
  // RENDER:
  return (
    <>
      <Box
        minH="100vh"
        width="800px"
        marginX="auto"
        border="2px solid"
        borderColor="blue.300"
        borderRadius="xl"
      >
        <Text fontSize="5xl" fontWeight="bold">
          Log In
        </Text>
      </Box>
    </>
  );
}

export default Auth;
