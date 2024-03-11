import { Box, Text } from '@chakra-ui/react';

export default function Login() {
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
      <Text fontSize="5xl" fontWeight="bold">
        Log In
      </Text>
    </Box>
  );
}
