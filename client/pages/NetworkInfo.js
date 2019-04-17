import React from 'react'
import App from './App'

class NetworkInfo extends React.Component {
    state = {
        tokenName: undefined
    };

    getTokenName = async () => {
        const { accounts, contract } = this.props
        const response = await contract.methods.name().call()
        this.setState({ tokenName: response })
    }

    storeValue = async () => {
        const { accounts, contract } = this.props
        await contract.methods.set(5).send({ from: accounts[0] })
        alert('Stored 5 into account')
    };

    getValue = async () => {
        const { accounts, contract } = this.props
        const response = await contract.methods.get().call({ from: accounts[0] })
        this.setState({ balance: response })
    };

    getEthBalance = async () => {
        const { web3, accounts } = this.props
        const balanceInWei = await web3.eth.getBalance(accounts[0])
        this.setState({ ethBalance: balanceInWei / 1e18 })
    };

    render() {
        const { tokenName = 'N/A' } = this.state
        return (
            <div>
                <h1>My Dapp</h1>

                <button onClick={this.getTokenName}>Get TokenName</button>
                <div>Token Name: {tokenName}</div>
            </div>
        )
    }
}

export default () => (
    <App
        renderLoading={() => <div>Loading Dapp Page...</div>}
        render={({ web3, accounts, contract }) => (
            <NetworkInfo accounts={accounts} contract={contract} web3={web3} />
        )}
    />
)
