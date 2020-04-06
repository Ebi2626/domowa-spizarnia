// Action types for edit supply list
const FETCH_LIST = "FETCH_LIST";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const CHECK_SHOPPING_LIST = "CHECK_SHOPPING_LIST";

// Kind of actions
const SUPPLY = "SUPPLY";
const SHOP = "SHOP";

// Action creators
export function addItem(payload) {
  return {
    type: ADD_ITEM,
    payload: {
      type: payload.type,
      ...payload,
    },
  };
}

export function removeItem(payload) {
  return {
    type: REMOVE_ITEM,
    payload: {
      type: payload.type,
      name: payload.name,
    },
  };
}

export function editItem(index, payload) {
  console.log("Index edytowanego elementu to: " + index);
  return {
    type: EDIT_ITEM,
    index,
    payload: {
      type: payload.type,
      ...payload,
    },
  };
}
// export function fetchList(payload) {
//   const supplies = [{ name: "", value: 0, unit: "", minVal: 0 }];
//   const shoppingList = [{ name: "", value: 0, unit: "", minVal: 0 }];
//   return {
//         type: FETCH_LIST,
//         payload: {
//           type: payload.type,
//           supplies: [...supplies],
//           shoppingList: [...shoppingList],
//         },
//       };
// }
export function fetchList(payload) {
  let supplies;
  let shoppingList;
  if (
    localStorage.getItem("state") === undefined ||
    localStorage.getItem("state") === null ||
    localStorage.getItem("state") === "null"
  ) {
    supplies = [{ name: "", unit: " szt.", val: 0, minVal: 0 }];
    shoppingList = [{ name: "", unit: " szt.", val: 0, minVal: 0 }];
    let initialStorageObject = JSON.stringify({ supplies, shoppingList });
    localStorage.setItem("state", initialStorageObject);
    console.log("Pusty storage" + localStorage.getItem("state"));
  } else {
    if (JSON.parse(localStorage.getItem("state")).supplies !== null) {
      supplies = [...JSON.parse(localStorage.getItem("state")).supplies];
    } else {
      supplies = [{ name: "", unit: " szt.", val: 0, minVal: 0 }];
    }
    if (JSON.parse(localStorage.getItem("state")).shoppingList !== null) {
      shoppingList = [
        ...JSON.parse(localStorage.getItem("state")).shoppingList,
      ];
    } else {
      shoppingList = [{ name: "", unit: " szt.", val: 0, minVal: 0 }];
    }
  }
  return {
    type: FETCH_LIST,
    payload: {
      type: payload.type,
      supplies: [...supplies],
      shoppingList: [...shoppingList],
    },
  };
}

export function checkShoppingList(payload) {
  return {
    type: CHECK_SHOPPING_LIST,
    payload: [...payload],
  };
}
