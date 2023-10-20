import { store } from "./store";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId:
    "ASV8HlaHJPq1yTZ3LK52yBk9SWwNXImtL4Q5_E_s56XiwzH2WD3jjWdLr91j5VrQ4vP2s47LIRUbz2Mm",
  currency: "USD",
  intent: "capture",
};

interface Props {
  children: React.ReactNode;
}

export default function CustomProvider({ children }: Props) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Provider store={store}>{children}</Provider>
    </PayPalScriptProvider>
  );
}
