import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import Routing from "../Routing";

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
