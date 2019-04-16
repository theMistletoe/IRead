import React, { Component } from "react";
import SimpleStorageContract from "./../contracts/BookReportToken.json";
import getWeb3 from "./utils/getWeb3";



class App extends Component {
  state = { totalSupply: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // await contract.methods.createBookReport('fromFront').send({ from: accounts[0] });
    console.log('end');

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.totalSupply().call();

    // Update state with the result.
    this.setState({ totalSupply: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        {console.log(this.state.totalSupply)}
        <div>The stored value is: {this.state.totalSupply}</div>
      </div>
    );
  }
}

export default App;