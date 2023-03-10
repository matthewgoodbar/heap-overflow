import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import questionsReducer from "./question";
import questionCountReducer from "./questionCount";
import answersReducer from "./answer";
import usersReducer from "./user";
import userCountReducer from "./userCount";

const rootReducer = combineReducers({
  session: sessionReducer,
  questions: questionsReducer,
  questionCount: questionCountReducer,
  answers: answersReducer,
  users: usersReducer,
  userCount: userCountReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;