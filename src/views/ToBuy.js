import React, { Component } from "react";
import Item from "./../components/molecules/Item/Item";
import ItemsList from "./../components/molecules/ItemsList/ItemsList";
import MainWrapper from "./../components/atoms/MainWrapper/MainWrapper";
import Popup from "./../components/organisms/Popup/Popup";
import AddItem from "./../components/organisms/AddItem/AddItem";
import EmptyListInfo from "../components/molecules/EmptyListInfo/EmptyListInfo";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchList, removeItem, addItem, editItem } from "../actions/actions";
import Header from "../components/atoms/Header/Header";
import Footer from "../components/atoms/Footer/Footer";

// Secure from mistakes in string value
const SHOP = "SHOP";
// String with text displayed if there is no content
const EmptyListInfoText =
  "Ooops... Zdaje się, że jeszcze nie uzupełniłeś swojej listy produktów. Dodaj do listy produkty, których nie chciałbyś zapomnieć podczas najbliższych zakupów.";

class ToBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      num: 0,
      add: false,
    };
    this.handleFetch = this.handleFetch.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.changeNum = this.changeNum.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleFetch() {
    if (
      this.props.shoppingList === undefined ||
      this.props.shoppingList.length === 1
    ) {
      this.props.onFetch({ type: SHOP });
    }
  }
  // Getting data if there isn't any items on the list, from the redux and local storage
  componentDidMount() {
    this.handleFetch();
  }

  handleDel(name) {
    // Remove item from store and redux
    const payload = {
      type: SHOP,
      name,
    };
    this.props.onRemove(payload);
  }

  toggleAdd(props, num) {
    // Toggle popup with adding item form
    this.setState((prevState) => {
      return { add: !prevState.add };
    });
  }

  togglePopup(props, num) {
    // Toggle popup with editing item form
    this.changeNum(num); // Update currently editing items number
    this.setState((prevState) => {
      return {
        popup: !prevState.popup,
      };
    });
  }

  handleAdd({ name, val, unit, minVal }) {
    // Checking if there is such item on the list and display alert if it's true
    let arr = this.props.shoppingList;
    if (arr.find((el) => el.name === name)) {
      return alert("Już jest taki produkt na liście!");
    }
    // Save data in the redux and local storage. Close popup
    this.props.addItem({ type: SHOP, name, val, unit, minVal });
    this.setState({
      add: false,
    });
  }

  handleEdit(num, { name, val, unit, minVal }) {
    // Save data in the redux and local storage. Close popup
    this.props.editItem(num, { type: SHOP, name, val, unit, minVal });
    this.setState({
      popup: false,
    });
  }

  changeNum(num) {
    // Change number of currently editing item
    this.setState({ num: num });
    return num;
  }

  render() {
    return (
      <MainWrapper theme={this.props.theme}>
        <Header
          theme={this.props.theme}
          title="Lista zakupów"
          className="m-16"
        ></Header>
        <ItemsList>
          {this.state.popup && (
            <Popup
              num={this.state.num}
              name={this.props.shoppingList[this.state.num].name}
              val={this.props.shoppingList[this.state.num].val}
              minVal={this.props.shoppingList[this.state.num].minVal}
              unit={this.props.shoppingList[this.state.num].unit}
              changeNum={this.changeNum}
              togglePopup={this.togglePopup}
              handleEdit={this.handleEdit}
              shop={true}
              theme={this.props.theme}
            />
          )}
          {this.state.add && (
            <AddItem
              theme={this.props.theme}
              shop
              togglePopup={this.toggleAdd}
              handleAdd={this.handleAdd}
            />
          )}
          {this.props.shoppingList.length !== 1 ? (
            this.props.shoppingList.map((el, index) => (
              <Item
                {...el}
                key={el.name}
                handleEdit={this.handleEdit}
                handleDel={this.handleDel}
                togglePopup={this.togglePopup}
                changeNum={this.changeNum}
                num={index}
                shop={true}
                theme={this.props.theme}
              />
            ))
          ) : (
            <EmptyListInfo text={EmptyListInfoText} theme={this.props.theme} />
          )}
          <button
            className="shadow bottom-0 right-0 fixed block bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white mb-16 mr-16 font-bold py-2 px-4 rounded"
            onClick={this.toggleAdd}
          >
            Dodaj produkt
          </button>
        </ItemsList>
        <Footer />
      </MainWrapper>
    );
  }
}

const mapStateToProps = ({ shoppingList, theme }) => {
  return { shoppingList, theme };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onFetch: (payload) => dispatch(fetchList(payload)),
    onRemove: (payload) => dispatch(removeItem(payload)),
    addItem: (payload) => dispatch(addItem(payload)),
    editItem: (index, payload) => dispatch(editItem(index, payload)),
  };
};

const WrappedToBuy = connect(mapStateToProps, mapDispatchToProp)(ToBuy);

ToBuy.propTypes = {
  shoppingList: PropTypes.array, // List of products in the shopping list
  onFetch: PropTypes.func, // Function to fetching data from local storage (and redux)
  onRemove: PropTypes.func, // Function to removing data from local storage (and redux)
  addItem: PropTypes.func, // Function to addItem to local storage (and redux)
  editItem: PropTypes.func, // Function to change item properties and send data to local storage (and redux)
};

ToBuy.defaultProps = {
  shoppingList: [],
};

export default WrappedToBuy;
