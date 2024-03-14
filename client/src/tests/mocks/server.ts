import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';

// Mock server to intercept API requests:
const server = setupServer(...handlers);

export { server };
