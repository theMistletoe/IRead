import React from 'react'
import App from './App'

class NetworkInfo extends React.Component {
    state = {
        tokenName: undefined,
        symbol: undefined,
        contractAddress: undefined,
    };

    componentDidMount = async () => {
        this.getTokenName()
        this.getSymbol()
        this.getContractAddress()
    };

    getTokenName = async () => {
        const { contract } = this.props
        const response = await contract.methods.name().call()
        this.setState({ tokenName: response })
    }

    getSymbol = async () => {
        const { contract } = this.props
        const response = await contract.methods.symbol().call()
        this.setState({ symbol: response })
    }

    getContractAddress = async () => {
        const { contract } = this.props
        const response = await contract.address
        this.setState({ contractAddress: response })
    }

    render() {
        const { tokenName = 'N/A' } = this.state
        const { symbol = 'N/A' } = this.state
        const { contractAddress = 'N/A' } = this.state
        return (
            <div>
                <div>Token Name: {tokenName}</div>
                <div>Symbol: {symbol}</div>
                <div>Contract Address: {contractAddress}</div>
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
