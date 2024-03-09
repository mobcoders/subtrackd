import { ChakraProvider } from "@chakra-ui/react";
import { server } from "../mocks/server";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";
import Dashboard from "./Dashboard";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

const renderComponent = () => {
  return render(
    <ChakraProvider>
      <Dashboard sortCriteria="alphabetical" filterCriteria="all" />
    </ChakraProvider>,
  );
};

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("Dashboard", () => {
  it("fetches the subscriptions and renders them", async () => {
    const response = await fetch("https://keepa.fly.dev/subscriptions");

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(await response.json()).toEqual([
      {
        _id: "65eb1db8887f8d91fc701711",
        name: "Netflix",
        cost: 12,
        billingDate: "2024-03-08T12:42:35.587Z",
        status: true,
        billingCycle: "Monthly",
        __v: 0,
      },
      {
        _id: "65eb1db8887f8d91fc701712",
        name: "Spotify",
        cost: 5,
        billingDate: "2024-03-08T12:42:35.587Z",
        status: true,
        billingCycle: "Monthly",
        __v: 0,
      },
      {
        _id: "65eb1db8887f8d91fc701713",
        name: "Disney",
        cost: 7,
        billingDate: "2024-03-08T12:42:35.587Z",
        status: true,
        billingCycle: "Monthly",
        __v: 0,
      },
    ]);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Netflix")).toBeInTheDocument();
      expect(screen.getByText("Spotify")).toBeInTheDocument();
      expect(screen.getByText("Disney")).toBeInTheDocument();
    });
  });

  it("Displays the average price.", async () => {
    // 8

    const response = await fetch("https://keepa.fly.dev/subscriptions");

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(await response.json()).toEqual([
      {
        _id: "65eb1db8887f8d91fc701711",
        name: "Netflix",
        cost: 12,
        billingDate: "2024-03-08T12:42:35.587Z",
        status: true,
        billingCycle: "Monthly",
        __v: 0,
      },
      {
        _id: "65eb1db8887f8d91fc701712",
        name: "Spotify",
        cost: 5,
        billingDate: "2024-03-08T12:42:35.587Z",
        status: true,
        billingCycle: "Monthly",
        __v: 0,
      },
      {
        _id: "65eb1db8887f8d91fc701713",
        name: "Disney",
        cost: 7,
        billingDate: "2024-03-08T12:42:35.587Z",
        status: true,
        billingCycle: "Monthly",
        __v: 0,
      },
    ]);

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("$8.00")).toBeInTheDocument();
    });
  });
});

// // Dashboard.test.jsx
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { ChakraProvider } from "@chakra-ui/react";
// import Dashboard from "./Dashboard";
// import apiService from "../services/apiService";
// import "@testing-library/jest-dom";
// import { afterAll, afterEach, beforeAll } from "vitest";
// import { setupServer } from "msw/node";
// import { HttpResponse, http } from "msw";
// import { sub } from "date-fns";

// const server = setupServer(...requestHandlers);

// // Start server before all tests
// beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// //  Close server after all tests
// afterAll(() => server.close());

// // Reset handlers after each test `important for test isolation`
// afterEach(() => server.resetHandlers());

// const renderComponent = () => {
//   return render(
//     <ChakraProvider>
//       <Dashboard sortCriteria="alphabetical" filterCriteria="all" />
//     </ChakraProvider>,
//   );
// };

// describe("Dashboard", () => {
//   afterEach(() => {
//     vi.resetAllMocks();
//   });

//   test("renders subscription list", async () => {
//     apiService.fetchSubscriptions.mockResolvedValueOnce(mockSubscriptions);
//     renderComponent();

//     await waitFor(() => {
//       expect(screen.getByText("Netflix")).toBeInTheDocument();
//       expect(screen.getByText("Spotify")).toBeInTheDocument();
//     });
//   });

//   test('opens AddEditSubscriptionForm when "Add Subscription" button is clicked', async () => {
//     apiService.fetchSubscriptions.mockResolvedValueOnce(mockSubscriptions);
//     renderComponent();

//     const addSubscriptionButton = screen.getByRole("button", {
//       name: "Add Subscription",
//     });
//     fireEvent.click(addSubscriptionButton);

//     await waitFor(() => {
//       expect(screen.getByLabelText("Name")).toBeInTheDocument();
//     });
//   });

//   test("applies sorting and filtering correctly", async () => {
//     apiService.fetchSubscriptions.mockResolvedValueOnce(mockSubscriptions);
//     const { rerender } = renderComponent();

//     await waitFor(() => {
//       expect(screen.getByText("Netflix")).toBeInTheDocument();
//       expect(screen.getByText("Spotify")).toBeInTheDocument();
//     });

//     // Filter active subscriptions
//     rerender(
//       <ChakraProvider>
//         <Dashboard sortCriteria="alphabetical" filterCriteria="active" />
//       </ChakraProvider>,
//     );

//     await waitFor(() => {
//       expect(screen.getByText("Netflix")).toBeInTheDocument();
//       expect(screen.queryByText("Spotify")).not.toBeInTheDocument();
//     });

//     // Sort by cost (most expensive)
//     rerender(
//       <ChakraProvider>
//         <Dashboard sortCriteria="mostExpensive" filterCriteria="all" />
//       </ChakraProvider>,
//     );

//     await waitFor(() => {
//       const subscriptionItems = screen.getAllByRole("listitem");
//       expect(subscriptionItems[0]).toHaveTextContent("Netflix");
//     });
//   });

//   test("displays the average expenses", async () => {
//     apiService.fetchSubscriptions.mockResolvedValueOnce(mockSubscriptions);
//     renderComponent();

//     await waitFor(() => {
//       expect(screen.getByText("$9.99")).toBeInTheDocument();
//     });
//   });
// });
