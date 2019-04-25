import React from 'react'
import App from './App'


const timelineStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const reportStyle = {
    border: '1px solid #DDD'
}

const addressStyle = {

}

const contentStyle = {

}


class AllReports extends React.Component {
    state = {
        alltokens: [],
    }

    componentDidMount = async () => {
        const { contract } = this.props
        const allTokensCount = await contract.methods.totalSupply().call()
        const alltokens = Object.assign([], this.state.alltokens);
        for (let i = 0; i < allTokensCount; i += 1) {
            const owner = await contract.methods.ownerOf(i).call()
            const token = await contract.methods.tokenURI(i).call()
            const report = {
                id: i,
                owner: owner,
                report: token
            }
            alltokens.push(report)
        }
        console.log(alltokens)
        this.setState({ alltokens: this.state.alltokens.concat(alltokens) })
    };

    render() {
        const { alltokens = 'N/A' } = this.state
        return (
            <div>
                {alltokens.map(token => {
                    return (
                        <div style={reportStyle} key={token.id}>
                            <div>{token.owner}</div>
                            <div>{token.report}</div>
                        </div>
                    )
                })}
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
