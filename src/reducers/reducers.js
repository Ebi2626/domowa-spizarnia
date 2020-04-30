// Action types
const FETCH_LIST = "FETCH_LIST";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const CHECK_SHOPPING_LIST = "CHECK_SHOPPING_LIST";
const CHANGE_TEMPLATE = "CHANGE_TEMPLATE";
const ADD_PERIOD = "ADD_PERIOD";
const FETCH_PERIOD = "FETCH_PERIOD";
const INITIAL_FETCH = "INITIAL_FETCH";

// Types of payloads
const SUPPLY = "SUPPLY";
const SHOP = "SHOP";

// Theme
const LIGHT = "LIGHT";

const initialState = {
  // Basic structure of data using in the app
  supplies: [
    {
      name: "",
      unit: "",
      minVal: 0,
      val: 0,
    },
  ],
  shoppingList: [
    {
      name: "",
      unit: "",
      minVal: 0,
      val: 0,
    },
  ],
  periodList: [
    {
      name: "",
      period: "",
      date: "",
    },
  ],
  theme: LIGHT,
};

function stateOfApp(state = initialState, action) {
  switch (action.type) {
    case INITIAL_FETCH:
      const initialStateFetched = action.payload;
      return Object.assign({}, state, {
        ...initialStateFetched,
      });
    case FETCH_LIST:
      if (isNaN(state)) {
        state = initialState;
      }
      if (!action.payload.type) {
        // If action won't have payload.type then add empty state
        const newState = {
          ...state,
          supplies: [{ name: "", value: 0, unit: "", minVal: 0 }],
          shoppingList: [{ name: "", value: 0, unit: "", minVal: 0 }],
          theme: LIGHT,
        };
        return Object.assign({}, state, {
          ...state,
          supplies: [...newState.supplies],
          shoppingList: [...newState.shoppingList],
          theme: newState.theme,
        });
      } else {
        // Otherways add payload to the rest of the state
        return Object.assign({}, state, {
          ...state,
          supplies: [...action.payload.supplies],
          shoppingList: [...action.payload.shoppingList],
          theme: action.payload.theme,
          periodList: [...action.payload.periodList],
        });
      }
    case REMOVE_ITEM:
      if (action.payload.type === SUPPLY) {
        // Removing item through the filter function
        const newSupplies = state.supplies.filter(
          (item) => item.name !== action.payload.name
        );
        // Create new state with updated supply list
        const newSupplyList = Object.assign({}, state, {
          ...state,
          supplies: [...newSupplies],
          shoppingList: [...state.shoppingList],
        });
        // Save new state in local storage and send data forward
        localStorage.setItem("state", JSON.stringify(newSupplyList));
        return newSupplyList;
      } else if (action.payload.type === SHOP) {
        // Removing item through the filter function
        const newShoppingList = state.shoppingList.filter(
          (item) => item.name !== action.payload.name
        );
        // Create new state with updated supply list
        const currentShoppingList = Object.assign({}, state, {
          ...state,
          supplies: [...state.supplies],
          shoppingList: [...newShoppingList],
        });
        // Save new state in local storage and send data forward
        localStorage.setItem("state", JSON.stringify(currentShoppingList));
        return currentShoppingList;
      } else {
        // Display log with error when occurs unpredicted error
        return console.log(
          "ERROR: There is no type of payload in REMOVE_ITEM."
        );
      }
    case ADD_ITEM:
      if (action.payload.type === SUPPLY) {
        // Create new state with new item in supplies
        const supplyWithAdd = Object.assign({}, state, {
          ...state,
          supplies: [...state.supplies, action.payload],
          shoppingList: [...state.shoppingList],
        });
        // Save this state in local storage and send data forward
        localStorage.setItem("state", JSON.stringify(supplyWithAdd));
        return supplyWithAdd;
      } else if (action.payload.type === SHOP) {
        // Create new state with new item in shoppingList
        const shoppingListWithAdd = Object.assign({}, state, {
          ...state,
          supplies: [...state.supplies],
          shoppingList: [...state.shoppingList, action.payload],
        });
        // Save this state in local storage and send data forward
        localStorage.setItem("state", JSON.stringify(shoppingListWithAdd));
        return shoppingListWithAdd;
      } else {
        // Display log with error when occurs unpredicted error
        return console.log("ERROR: There is no type of payload in ADD_ITEM.");
      }
    case EDIT_ITEM:
      if (action.payload.type === SUPPLY) {
        // Create const with new data
        const newSupplyItem = action.payload;
        // Copy the supplies from current state
        const editedSupplies = state.supplies;
        // Change editing item in previous state into the new one
        editedSupplies[action.index] = newSupplyItem;
        // Create new state with upadated item
        const newEditedSupply = Object.assign({}, state, {
          ...state,
          supplies: [...editedSupplies],
          shoppingList: [...state.shoppingList],
        });
        // Save this state in local storage and send data forward
        localStorage.setItem("state", JSON.stringify(newEditedSupply));
        return newEditedSupply;
      } else if (action.payload.type === SHOP) {
        // Create const with new data
        const newShoppingItem = action.payload;
        // Copy the supplies from current state
        const editedShoppingList = state.shoppingList;
        // Change editing item in previous state into the new one
        editedShoppingList[action.index] = newShoppingItem;
        // Create new state with upadated item
        const newEditedShopping = Object.assign({}, state, {
          ...state,
          supplies: [...state.supplies],
          shoppingList: [...editedShoppingList],
        });
        // Save this state in local storage and send data forward
        localStorage.setItem("state", JSON.stringify(newEditedShopping));
        return newEditedShopping;
      } else {
        // Display log with error when occurs unpredicted error
        return console.log(`ERROR: There is no type of payload in EDIT_ITEM.`);
      }
    case CHECK_SHOPPING_LIST:
      // Create new state with new shopping list
      const checkedList = Object.assign({}, state, {
        ...state,
        supplies: [...state.supplies],
        shoppingList: [...state.shoppingList, ...action.payload],
      });
      // Save this state in local storage and send data forward
      localStorage.setItem("state", JSON.stringify(checkedList));
      return checkedList;
    case CHANGE_TEMPLATE:
      const changedTemplate = Object.assign({}, state, {
        ...state,
        theme: action.payload,
      });
      localStorage.setItem("state", JSON.stringify(changedTemplate));
      return changedTemplate;
    case ADD_PERIOD:
      const withNewPeriod = Object.assign({}, state, {
        ...state,
        periodList: [...state.periodList, action.payload],
      });
      localStorage.setItem("state", JSON.stringify(withNewPeriod));
      return withNewPeriod;
    case FETCH_PERIOD:
      let oldPeriods;
      if (state.periodList.length > 1) {
        oldPeriods = state.periodList.filter((el) => el.name !== "");
      } else {
        oldPeriods = [{ name: "", period: "", data: new Date() }];
      }
      const withPeriod = Object.assign({}, state, {
        ...state,
        periodList: [
          ...oldPeriods,
          ...action.payload.filter((el) => el.name !== ""),
        ],
      });
      localStorage.setItem("state", JSON.stringify(withPeriod));
      return withPeriod;
    default:
      return state;
  }
}

export default stateOfApp;
