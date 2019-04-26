import React from 'react'
import App from './App'

class AccountInfo extends React.Component {
    state = {
        tokens: undefined
    };

    componentDidMount = async () => {
        this.reflectTokens();
    };

    componentDidUpdate = async () => {
        this.reflectTokens();
    };

    reflectTokens = async () => {
        const { accounts, contract } = this.props
        const ownedTokensCount = await contract.methods.balanceOf(accounts[0]).call()
        const tokens = [];
        for (let i = 0; i < ownedTokensCount; i += 1) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call()
            const token = await contract.methods.tokenURI(tokenId).call()
            tokens.push(token);
        }
        console.log(tokens)
        this.setState({ tokens: tokens })
    }

    render() {
        const { tokens = 'N/A' } = this.state
        return (
            <div>
                {/* <button onClick={this.tokens}>Get Tkens</button> */}
                <div>Account Tokens: {tokens}</div>
            </div>
        )
    }
}

export default () => (
    <App
        renderLoading={() => <div>Loading Dapp Page...</div>}
        render={({ web3, accounts, contract }) => (
            <AccountInfo accounts={accounts} contract={contract} web3={web3} />
        )}
    />
)
