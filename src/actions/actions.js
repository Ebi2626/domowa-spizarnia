// Action types for edit supply list
const FETCH_LIST = "FETCH_LIST";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const CHECK_SHOPPING_LIST = "CHECK_SHOPPING_LIST";
const CHANGE_TEMPLATE = "CHANGE_TEMPLATE";
const ADD_PERIOD = "ADD_PERIOD";
const FETCH_PERIOD = "FETCH_PERIOD";
const INITIAL_FETCH = "INITIAL_FETCH";

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
  return {
    type: EDIT_ITEM,
    index,
    payload: {
      type: payload.type,
      ...payload,
    },
  };
}
export function fetchList(payload) {
  let supplies;
  let shoppingList;

  // Return theme or default theme
  let isTheme = () => {
    let result;
    if (localStorage.getItem("state") != null) {
      result = JSON.parse(localStorage.getItem("state")).theme
        ? JSON.parse(localStorage.getItem("state")).theme
        : "LIGHT";
    } else {
      result = "LIGHT";
    }
    return result;
  };

  let isPeriod = () => {
    let result;
    if (localStorage.getItem("state") != null) {
      result = JSON.parse(localStorage.getItem("state")).periodList
        ? JSON.parse(localStorage.getItem("state")).periodList
        : [{ name: "", period: "", date: new Date() }];
    } else {
      result = [{ name: "", period: "", date: new Date() }];
    }
    return result;
  };
  if (
    localStorage.getItem("state") === undefined ||
    localStorage.getItem("state") === null ||
    localStorage.getItem("state") === "null"
  ) {
    supplies = [{ name: "", unit: " szt.", val: 0, minVal: 0 }];
    shoppingList = [{ name: "", unit: " szt.", val: 0, minVal: 0 }];
    let initialStorageObject = JSON.stringify({ supplies, shoppingList });
    localStorage.setItem("state", initialStorageObject);
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
      theme: isTheme(),
      periodList: isPeriod(),
    },
  };
}

export function checkShoppingList(payload) {
  return {
    type: CHECK_SHOPPING_LIST,
    payload: [...payload],
  };
}

export function changeTemplate(payload) {
  return {
    type: CHANGE_TEMPLATE,
    payload: payload,
  };
}

export function addPeriodItem(payload) {
  return {
    type: ADD_PERIOD,
    payload,
  };
}
export function fetchPeriodList(payload) {
  return {
    type: FETCH_PERIOD,
    payload,
  };
}
export function initialFetch(payload) {
  return {
    type: INITIAL_FETCH,
    payload,
  };
}
