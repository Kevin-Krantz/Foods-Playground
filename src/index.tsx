import configureStore from "./store/configureStore";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";
import { CriiptoVerifyProvider } from "@criipto/verify-react";

const store = configureStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <CriiptoVerifyProvider
    domain="bite-blast-test.criipto.id"
    clientID="urn:my:application:identifier:1689"
    redirectUri="http://localhost:3000"
    sessionStore={window.localStorage}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </CriiptoVerifyProvider>
);
