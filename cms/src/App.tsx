import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./ErrorBoundary";
import "antd/dist/antd.css";
import "./index.scss";
import LayoutWrapper from "./layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <LayoutWrapper />
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
