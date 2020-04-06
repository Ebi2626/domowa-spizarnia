import React, { Component } from "react";
import Item from "./../components/atoms/Item/Item";
import ItemsList from "./../components/molecules/ItemsList/ItemsList";
import Popup from "./../components/organisms/Popup/Popup";
import AddItem from "./../components/organisms/AddItem/AddItem";
import Header from "../components/atoms/Header/Header";
import { connect } from "react-redux";
import {
  fetchList,
  removeItem,
  addItem,
  editItem,
  checkShoppingList,
} from "../actions/actions";

// Type of actions
const SUPPLY = "SUPPLY";
const SHOP = "SHOP";

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

    this.props.onFetch({ type: SUPPLY });
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.state.props) {
      return;
    }
    if (this.props.supplies.length) {
      const suppliesLength = this.props.supplies.length;
      const shoppingListLength = this.props.shoppingList.length;
      let minSupplies = [];
      console.log(this.props.supplies);
      console.log(this.props.shoppingList);
      for (let i = 0; i < suppliesLength; i++) {
        let j = 0;
        if (this.props.supplies[i].val <= this.props.supplies[i].minVal) {
          let addingItem = true;
          for (let z = 0; z < shoppingListLength; z++) {
            if (
              this.props.shoppingList[z].name === this.props.supplies[i].name
            ) {
              console.log("jest taki item");
              addingItem = false;
            } else {
              console.log("nie ma takiego itemu");
            }
          }
          if (addingItem) {
            minSupplies[j] = this.props.supplies[i];
            this.props.addToShoppingList(minSupplies);
            console.log(minSupplies);
            console.log(`Dodawany item to: ${this.props.supplies[i].name}`);
            j++;
          } else {
            continue;
          }
        } else {
          console.log(
            `Item ${this.props.supplies[i].name} jest w odpowiedniej ilości`
          );
        }
        if (minSupplies.length) {
          console.log(minSupplies);
        } else {
          console.log("Nic nie wymaga aktualizacji");
        }
      }
    }
  }
  handleDel(name) {
    // Akcja usuwająca item ze store'a
    const payloadRemove = {
      name,
      type: SUPPLY,
    };
    this.props.onRemove(payloadRemove);
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
    let arr = this.props.supplies;
    if (arr.find((el) => el.name === name)) {
      return console.log("Już jest taki item w liście!");
    }
    this.props.addItem({ type: "SUPPLY", name, val, unit, minVal });
    this.setState({
      add: false,
    });
  }
  handleEdit(num, { name, val, unit, minVal }) {
    this.props.editItem(num, { type: "SUPPLY", name, val, unit, minVal });
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
        <Header title="Stan zapasów" className="m-16"></Header>
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
            />
          )}
          {this.state.add && (
            <AddItem
              num={
                this.props.supplies.length ? this.props.supplies.length : null
              }
              togglePopup={this.toggleAdd}
              handleAdd={this.handleAdd}
            />
          )}
          {this.props.supplies &&
            this.props.supplies.map((el, index) => (
              <Item
                {...el}
                key={el.name}
                handleDel={this.handleDel}
                togglePopup={this.togglePopup}
                changeNum={this.changeNum}
                num={index}
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
const mapStateToProps = ({ supplies, shoppingList }) => {
  return { supplies, shoppingList };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onFetch: (payload) => dispatch(fetchList(payload)),
    onRemove: (payload) => dispatch(removeItem(payload)),
    addItem: (payload) => dispatch(addItem(payload)),
    editItem: (index, payload) => dispatch(editItem(index, payload)),
    addToShoppingList: (payload) => dispatch(checkShoppingList(payload)),
  };
};
const WrappedHome = connect(mapStateToProps, mapDispatchToProp)(Home);

export default WrappedHome;
