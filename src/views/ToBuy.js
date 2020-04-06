import React, { Component } from "react";
import Item from "./../components/atoms/Item/Item";
import ItemsList from "./../components/molecules/ItemsList/ItemsList";
import Popup from "./../components/organisms/Popup/Popup";
import AddItem from "./../components/organisms/AddItem/AddItem";
import { connect } from "react-redux";
import { fetchList, removeItem, addItem, editItem } from "../actions/actions";
import Header from "../components/atoms/Header/Header";

// Type of actions
const SHOP = "SHOP";

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

    this.handleFetch();
  }

  handleFetch() {
    if (this.props.shoppingList === undefined) {
      this.props.onFetch({ type: SHOP });
    }
  }

  handleDel(name) {
    // Akcja usuwająca item ze store'a
    const payload = {
      type: SHOP,
      name,
    };
    this.props.onRemove(payload);
  }
  toggleAdd(props, num) {
    this.setState((prevState) => {
      return { add: !prevState.add };
    });
  }
  togglePopup(props, num) {
    this.changeNum(num);
    this.setState((prevState) => {
      return {
        popup: !prevState.popup,
      };
    });
  }
  handleAdd({ name, val, unit, minVal }) {
    let arr = this.props.shoppingList;
    if (arr.find((el) => el.name === name)) {
      return console.log("Już jest taki item w liście!");
    }
    this.props.addItem({ type: "SHOP", name, val, unit, minVal });
    this.setState({
      add: false,
    });
  }
  handleEdit(num, { name, val, unit, minVal }) {
    this.props.editItem(num, { type: "SHOP", name, val, unit, minVal });
    this.setState({
      popup: false,
    });
  }
  changeNum(num) {
    this.setState({ num: num });
    return num;
  }

  render() {
    return (
      <>
        <Header title="Lista zakupów" className="m-16"></Header>
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
            />
          )}
          {this.state.add && (
            <AddItem togglePopup={this.toggleAdd} handleAdd={this.handleAdd} />
          )}
          {this.props.shoppingList &&
            this.props.shoppingList.map((el, index) => (
              <Item
                {...el}
                key={el.name}
                handleDel={this.handleDel}
                togglePopup={this.togglePopup}
                changeNum={this.changeNum}
                num={index}
                shop={true}
              />
            ))}
          <button
            className="shadow bottom-0 right-0 fixed block bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white mb-16 mr-16 font-bold py-2 px-4 rounded"
            onClick={this.toggleAdd}
          >
            Dodaj produkt
          </button>
        </ItemsList>
      </>
    );
  }
}

const mapStateToProps = ({ shoppingList }) => {
  return { shoppingList };
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

export default WrappedToBuy;
