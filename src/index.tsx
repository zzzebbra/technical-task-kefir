import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMockAdapter from "./api/useMockAdapter";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

const RootApp = (): JSX.Element => {
  useMockAdapter();
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
