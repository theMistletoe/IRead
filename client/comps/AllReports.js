import React from 'react'
import App from './App'


const reportStyle = {
    borderBottom: "3px solid rgb(212, 212, 212)",
}

class AllReports extends React.Component {
    state = {
        alltokens: [],
    }

    componentDidMount = async () => {
        const { contract } = this.props
        let tokenIdLength = 0;

        await contract.getPastEvents('Transfer', {
            filter: { myIndexedParam: [20, 23], myOtherIndexedParam: '0x123456789...' }, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest'
        }, (error, events) => {
            events.map(event => {
                console.log(event);
                const returnVal = event.returnValues;
                if (returnVal.from === '0x0000000000000000000000000000000000000000') {
                    tokenIdLength = parseInt(returnVal.tokenId, 10)
                }
            });
        });

        const alltokens = Object.assign([], this.state.alltokens);
        for (let i = 0; i <= tokenIdLength; i += 1) {
            const owner = await contract.methods.ownerOf(i).call();

            // ignore burned token
            if (owner === null) continue;

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

        this.setState({ alltokens: this.state.alltokens.concat(alltokens) })
    };

    render() {
        const { alltokens = 'N/A' } = this.state
        return (
            <div>
                {alltokens.reverse().map(token => {
                    return (
                        <div style={reportStyle} key={token.id}>
                            <h2>書籍タイトル：{token.title}</h2>
                            <div><a href={token.link} target="_blank">Link to Book</a></div>
                            <h3>感想</h3>
                            <p>{token.content}</p>
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
