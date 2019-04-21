import React from 'react'
import App from './App'

class AllReports extends React.Component {
    state = {
        alltokes: undefined
    };

    componentDidMount = async () => {
        const { contract } = this.props
        const allTokensCount = await contract.methods.totalSupply().call()
        const alltokes = [];
        for (let i = 0; i < allTokensCount; i += 1) {
            const token = await contract.methods.tokenURI(i).call()
            alltokes.push(token);
        }
        console.log(alltokes)
        this.setState({ alltokes: alltokes })
    };

    render() {
        const { alltokes = 'N/A' } = this.state
        return (
            <div>
                <div>AllTokens: {alltokes}</div>
            </div>
        )
    }
}

export default () => (
    <App
        renderLoading={() => <div>Loading Dapp Page...</div>}
        render={({ web3, accounts, contract }) => (
            <AllReports accounts={accounts} contract={contract} web3={web3} />
        )}
    />
)
