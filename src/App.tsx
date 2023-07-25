import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router/router";
import store from "src/store/store";
import "./App.css";

function App() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
