const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAME_ORDERED = "ICECREAME_ORDERED";
const ICECREAME_RESTOCKED = "ICECREAME_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}
function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}
function orderIceCreame(qty = 1) {
  return {
    type: ICECREAME_ORDERED,
    payload: qty,
  };
}
function restockIceCreame(qty = 1) {
  return {
    type: ICECREAME_RESTOCKED,
    payload: qty,
  };
}

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreames: 20,
// };
const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreameState = {
  numOfIceCreames: 20,
};

const cakeReducer = function (state = initialCakeState, action) {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};
const iceCreameReducer = function (state = initialIceCreameState, action) {
  switch (action.type) {
    case ICECREAME_ORDERED:
      return {
        ...state,
        numOfIceCreames: state.numOfIceCreames - 1,
      };
    case ICECREAME_RESTOCKED:
      return {
        ...state,
        numOfIceCreames: state.numOfIceCreames + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCreame: iceCreameReducer,
  });

const store = createStore(rootReducer,applyMiddleware(logger));
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>{}
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCreame, restockIceCreame },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCreame();
actions.orderIceCreame();
actions.restockIceCreame(2);

unsubscribe();