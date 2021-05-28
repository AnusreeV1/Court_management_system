import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, combineReducers } from "redux";
import Navigation from "./Navigation";
import Reducer from "./redux/Reducer";

const rootReducer = combineReducers({
  Reducer: Reducer,
});

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
