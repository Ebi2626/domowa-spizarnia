// Action types
const FETCH_LIST = "FETCH_LIST";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const CHECK_SHOPPING_LIST = "CHECK_SHOPPING_LIST";

// Type of actions
const SUPPLY = "SUPPLY";
const SHOP = "SHOP";

const initialState = {
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
};

function stateOfApp(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIST:
      if (isNaN(state)) {
        state = initialState;
      }
      if (action.payload.type) {
        const newState = JSON.parse(localStorage.getItem("state"));
        return Object.assign({}, state, {
          supplies: [...newState.supplies],
          shoppingList: [...newState.shoppingList],
        });
      } else {
        return console.log(
          "Błąd w reducerze podczas fetchowania danych z localStorage"
        );
      }
    case REMOVE_ITEM:
      if (action.payload.type === SUPPLY) {
        const newSupplies = state.supplies.filter(
          (item) => item.name !== action.payload.name
        );
        const newSupplyList = Object.assign({}, state, {
          ...state,
          supplies: [...newSupplies],
          shoppingList: [...state.shoppingList],
        });
        localStorage.setItem("state", JSON.stringify(newSupplyList));
        return newSupplyList;
      } else if (action.payload.type === SHOP) {
        const newShoppingList = state.shoppingList.filter(
          (item) => item.name !== action.payload.name
        );
        const currentShoppingList = Object.assign({}, state, {
          ...state,
          supplies: [...state.supplies],
          shoppingList: [...newShoppingList],
        });
        localStorage.setItem("state", JSON.stringify(currentShoppingList));
        return currentShoppingList;
      } else {
        return console.log("Błąd w reducerze w REMOVE_ITEM.");
      }
    case ADD_ITEM:
      if (action.payload.type === SUPPLY) {
        const supplyWithAdd = Object.assign({}, state, {
          ...state,
          supplies: [...state.supplies, action.payload],
          shoppingList: [...state.shoppingList],
        });
        localStorage.setItem("state", JSON.stringify(supplyWithAdd));
        return supplyWithAdd;
      } else if (action.payload.type === SHOP) {
        const shoppingListWithAdd = Object.assign({}, state, {
          ...state,
          supplies: [...state.supplies],
          shoppingList: [...state.shoppingList, action.payload],
        });
        localStorage.setItem("state", JSON.stringify(shoppingListWithAdd));
        return shoppingListWithAdd;
      } else {
        return console.log("Błąd w reducerze w ADD_ITEM");
      }
    case EDIT_ITEM:
      if (action.payload.type === SUPPLY) {
        const newSupplyItem = action.payload;
        const editedSupplies = state.supplies;
        editedSupplies[action.index] = newSupplyItem;
        const newEditedSupply = Object.assign({}, state, {
          supplies: [...editedSupplies],
          shoppingList: [...state.shoppingList],
        });
        localStorage.setItem("state", JSON.stringify(newEditedSupply));
        return newEditedSupply;
      } else if (action.payload.type === SHOP) {
        const newShoppingItem = action.payload;
        const editedShoppingList = state.supplies;
        editedShoppingList[action.index] = newShoppingItem;
        const newEditedShopping = Object.assign({}, state, {
          supplies: [...state.supplies],
          shoppingList: [...editedShoppingList],
        });
        localStorage.setItem("state", JSON.stringify(newEditedShopping));
        return newEditedShopping;
      } else {
        return console.log(`Błąd w reducerze podczas EDIT_ITEM`);
      }
    case CHECK_SHOPPING_LIST:
      const checkedList = Object.assign({}, state, {
        supplies: [...state.supplies],
        shoppingList: [...state.shoppingList, ...action.payload],
      });
      localStorage.setItem("state", JSON.stringify(checkedList));
      return checkedList;
    default:
      return state;
  }
}

export default stateOfApp;
