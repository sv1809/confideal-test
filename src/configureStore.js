import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";

import reducers from "./reducers";
import rateUpdater from "./middlewares/rateUpdater";

const isProd = process.env.NODE_ENV === "production";

const configureStore = preloadedState => {
    const middleware = isProd ? applyMiddleware(thunk, rateUpdater) : compose(
        applyMiddleware(
            thunk,
            rateUpdater,
            createLogger()
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    const store = createStore(
        reducers,
        preloadedState,
        middleware,
    );
    return store;
};

export default configureStore;