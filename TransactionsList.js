import React, { Component } from "react";
import {
  listTransactions,
  createTransaction,
  deleteTransaction
} from "./transactions";
import { Icon, InlineIcon } from "@iconify/react";
import iosCheckmarkOutline from "@iconify/icons-ion/ios-checkmark-outline";
import closeIcon from "@iconify/icons-fa/close";


class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputSign: "+",
      inputDescription: "",
      inputAmount: 0,
      transactions: []
    };
  }

  deleteTransaction = async id => {
    await deleteTransaction(id);
    const transactions = await listTransactions();
    this.setState({ transactions });
  };

  async componentDidMount() {
    const transactions = await listTransactions();
    this.setState({ transactions });
  }

  onDescriptionChange = event => {
    const inputDescription = event.target.value;
    this.setState({ inputDescription });
  };

  onAmountChange = event => {
    const inputAmount = event.target.value;
    this.setState({ inputAmount });
  };

  onSignChange = event => {
    const inputSign = event.target.value;
    this.setState({ inputSign });
  };

  onInputKeyPress = async event => {
    if (event.nativeEvent.keyCode === 13) {
      const amount =
        this.state.inputSign === "+"
          ? this.state.inputAmount
          : -this.state.inputAmount;

      await createTransaction(this.state.inputDescription, amount);
      const transactions = await listTransactions();
      this.setState({ transactions, inputDescription: "", inputAmount: 0 });
    }
  };

  onClick = async event => {
    const amount =
      this.state.inputSign === "+"
        ? this.state.inputAmount
        : -this.state.inputAmount;

    await createTransaction(this.state.inputDescription, amount);
    const transactions = await listTransactions();
    this.setState({ transactions, inputDescription: "", inputAmount: 0 });
  };

  calculateBalance = () => {
    let balance = 0;
    this.state.transactions.forEach(transaction => {
      balance = balance + transaction.amount;
    });

    return balance;
  };

  render() {
    return (
      <div>
        <div className="top">
          <div className="budget">
            <div className="budget_title">Avialable budget</div>
            <div className="budget_value">{this.calculateBalance()}</div>
          </div>
        </div>

        <div className="bottom">
          <div className="add">
            <div className="add_container">
              <select className="type" onChange={this.onSignChange}>
                <option className="inc" value="+">+</option>
                <option className="exp" value="-">-</option>
              </select>

              <input
                className="add_description"
                type="text"
                placeholder="Description"
                value={this.state.inputDescription}
                onChange={this.onDescriptionChange}
                onKeyPress={this.onInputKeyPress}
              />

              <input
                className="add_value"
                type="number"
                placeholder="Amount"
                value={this.state.inputAmount}
                onChange={this.onAmountChange}
                onKeyPress={this.onInputKeyPress}
              />

              <button onClick={this.onClick} className="button">
                <Icon icon={iosCheckmarkOutline} />
              </button>
            </div>
          </div>
          <div className="container">
            {" "}
            <h2>Transactions</h2>
           
            <div className="transactionsContainer">
              {this.state.transactions.map(transaction => {
                  return (
                    <div className="item">
                      <label key={transaction.id} className="transactions">
                        <div className="item_description">
                          {transaction.title + " "}
                        </div>
                        <div className="item_value">{transaction.amount}</div>
                        <div className="item_delete">
                          <button
                            className="delete_button"
                            onClick={() =>
                              this.deleteTransaction(transaction.id)
                            }
                          >
                            <Icon icon={closeIcon} />
                          </button>
                        </div>
                      </label>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionsList;
