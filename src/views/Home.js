import React, { Component } from "react";
import MainWrapper from "./../components/atoms/MainWrapper/MainWrapper";
import Item from "./../components/molecules/Item/Item";
import ItemsList from "./../components/molecules/ItemsList/ItemsList";
import Popup from "./../components/organisms/Popup/Popup";
import AddItem from "./../components/organisms/AddItem/AddItem";
import Header from "../components/atoms/Header/Header";
import Footer from "../components/atoms/Footer/Footer";
import EmptyListInfo from "../components/molecules/EmptyListInfo/EmptyListInfo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchList,
  removeItem,
  addItem,
  editItem,
  checkShoppingList,
} from "../actions/actions";

// Secure from mistakes in string values
const SUPPLY = "SUPPLY";
const SHOP = "SHOP";

// String with text displayed if there is no content
const EmptyListInfoText =
  "Ooops... Zdaje się, że jeszcze nie uzupełniłeś swojej listy produktów. Dodaj do listy zawartość swojej spiżarki i zapomnij o problemach z listą zakupów!";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      num: 0,
      add: false,
    };
    this.handleDel = this.handleDel.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.changeNum = this.changeNum.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    // Get datas from localStorage after first render of view
    this.props.onFetch({ type: SUPPLY });
  }

  componentDidUpdate(prevProps) {
    // Checking if props has been changed
    if (prevProps === this.props) {
      return;
    }

    // Checking if any of supplies is below the minimum limit
    if (this.props.supplies.length) {
      const suppliesLength = this.props.supplies.length;
      const shoppingListLength = this.props.shoppingList.length;
      let minSupplies = [];

      for (let i = 0; i < suppliesLength; i++) {
        let j = 0;

        if (this.props.supplies[i].val <= this.props.supplies[i].minVal) {
          // Setting flag true, if amount of the supply  will be lower than minimum value
          // Then it will check in the loop if there is such product in the shopping list
          // If it is then flag will be turned into false and it won't be added to the shopping list
          let addingItem = true;

          for (let z = 0; z < shoppingListLength; z++) {
            if (
              this.props.shoppingList[z].name === this.props.supplies[i].name
            ) {
              addingItem = false;
            }
          }
          // If after checking loops, flag will be still true, then item will be added to the shopping list
          if (addingItem) {
            let newItem = Object.assign({}, this.props.supplies[i]);
            minSupplies[j] = newItem;
            minSupplies[j].type = SHOP;
            minSupplies[j].val =
              newItem.minVal - newItem.val <= 0
                ? 1
                : newItem.minVal - newItem.val;
            minSupplies[j].minVal = 0;
            j++;
          } else {
            continue;
          }
          this.props.addToShoppingList(minSupplies);
        }
      }
    }
  }

  handleDel(name) {
    // Removing Item from store
    const payloadRemove = {
      name,
      type: SUPPLY,
    };
    this.props.onRemove(payloadRemove);
  }
  // Toggle popup to adding item form
  toggleAdd(props, num) {
    this.setState((prevState) => {
      return { add: !prevState.add };
    });
  }
  // Toggle popup to editing item
  togglePopup(props, num) {
    this.changeNum(num);
    this.setState((prevState) => {
      return {
        popup: !prevState.popup,
      };
    });
  }

  handleAdd({ name, val, unit, minVal }) {
    val = Number(val);
    minVal = Number(minVal);
    let arr = this.props.supplies;
    // Checking if there is such product on the list and display alert if true
    if (arr.find((el) => el.name === name)) {
      return alert(
        "Już jest taki produkt na liście! Możesz kliknąć hamburger obok niego w celu edycji."
      );
    }
    // Save data in redux and close popup
    this.props.addItem({ type: SUPPLY, name, val, unit, minVal });
    this.setState({
      add: false,
    });
  }

  handleEdit(num, { name, val, unit, minVal }) {
    val = Number(val);
    minVal = Number(minVal);
    // Save data in redux and close popup
    this.props.editItem(num, { type: SUPPLY, name, val, unit, minVal });
    this.setState({
      popup: false,
    });
  }

  // Function with current number of editing item
  changeNum(num) {
    this.setState({ num: num });
    return num;
  }

  render() {
    return (
      <MainWrapper theme={this.props.theme}>
        <Header
          theme={this.props.theme}
          title="Stan zapasów"
          className="m-16"
        ></Header>
        <ItemsList>
          {this.state.popup && (
            <Popup
              num={this.state.num}
              name={this.props.supplies[this.state.num].name}
              val={this.props.supplies[this.state.num].val}
              minVal={this.props.supplies[this.state.num].minVal}
              unit={this.props.supplies[this.state.num].unit}
              changeNum={this.changeNum}
              togglePopup={this.togglePopup}
              handleEdit={this.handleEdit}
              shop={false}
              theme={this.props.theme}
            />
          )}
          {this.state.add && (
            <AddItem
              theme={this.props.theme}
              num={
                this.props.supplies.length ? this.props.supplies.length : null
              }
              togglePopup={this.toggleAdd}
              handleAdd={this.handleAdd}
            />
          )}
          {this.props.supplies.length !== 1 ? (
            this.props.supplies.map((el, index) => (
              <Item
                {...el}
                key={el.name}
                handleDel={this.handleDel}
                togglePopup={this.togglePopup}
                changeNum={this.changeNum}
                num={index}
                shop={false}
                theme={this.props.theme}
              />
            ))
          ) : (
            <EmptyListInfo theme={this.props.theme} text={EmptyListInfoText} />
          )}
          <button
            className="shadow bottom-0 right-0 fixed block bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white mb-16 mr-16 font-bold py-2 px-4 rounded"
            onClick={this.toggleAdd}
          >
            Dodaj produkt
          </button>
        </ItemsList>
        <Footer></Footer>
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({ supplies, shoppingList, theme }) => {
  return { supplies, shoppingList, theme };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (payload) => dispatch(fetchList(payload)),
    onRemove: (payload) => dispatch(removeItem(payload)),
    addItem: (payload) => dispatch(addItem(payload)),
    editItem: (index, payload) => dispatch(editItem(index, payload)),
    addToShoppingList: (payload) => dispatch(checkShoppingList(payload)),
  };
};

const WrappedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  supplies: PropTypes.array, // List of products in the home views
  shoppingList: PropTypes.array, // List of products in the shopping list
  onFetch: PropTypes.func, // Function to fetching data from local storage (and redux)
  onRemove: PropTypes.func, // Function to removing data from local storage (and redux)
  addItem: PropTypes.func, // Function to addItem to local storage (and redux)
  editItem: PropTypes.func, // Function to change item properties and send data to local storage (and redux)
  addToShoppingList: PropTypes.func, // Function to add item to shopping list
};

Home.defaultProps = {
  supplies: [],
  shoppingList: [],
};

export default WrappedHome;
