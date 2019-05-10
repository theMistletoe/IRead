import React from 'react'
import App from './App'


const timelineStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const reportStyle = {
    borderBottom: "3px solid rgb(212, 212, 212)",
    marginLeft: 300,
    marginRight: 300,
    marginTop: 50,
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
            const owner = await contract.methods.ownerOf(i).call();
            const token = await contract.methods.tokenURI(i).call();
            const tokenJson = JSON.parse(token);
            const report = {
                id: i,
                owner: owner,
                title: tokenJson.title,
                link: tokenJson.link,
                content: tokenJson.content,
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
                            <p>書籍タイトル：{token.title}</p>
                            <div>リンク：{token.link}</div>
                            <h3>感想</h3>
                            <div>{token.content}</div>
                            <div>私がこれを読みました：{token.owner}</div>
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
