import React from 'react';
import App from './App'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const textFieldStyle = {
    width: 600
}

const reportStyle = {
    borderBottom: "3px solid rgb(212, 212, 212)",
}

class PostReportForm extends React.Component {
    state = {
        title: undefined,
        link: undefined,
        content: undefined,
        tokens: [],
    };

    componentDidMount = async () => {
        this.reflectTokens();
    };

    createBookReport = async () => {
        const { accounts, contract } = this.props;
        const report = {
            title: this.state.title,
            link: this.state.link,
            content: this.state.content
        };
        console.log(report);
        console.log(JSON.parse(JSON.stringify(report)));
        await contract.methods.createBookReport(JSON.stringify(report)).send({ from: accounts[0] })
            .on('transactionHash', (hash) => {
                console.log(hash);
                window.alert('your created tx:' + hash);
                this.reflectTokens();
            });
        console.log('craete token end');
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    reflectTokens = async () => {
        const { accounts, contract } = this.props
        const ownedTokensCount = await contract.methods.balanceOf(accounts[0]).call()
        const newTokens = [];
        for (let i = 0; i < ownedTokensCount; i += 1) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call();
            const token = await contract.methods.tokenURI(tokenId).call();
            let tokenJson = JSON.parse(token);
            tokenJson['tokenId'] = parseFloat(tokenId).toFixed(0);
            newTokens.push(tokenJson);
        }
        this.setState({ tokens: newTokens.reverse() })
    };

    burnToken = async (tokenId) => {
        console.log('start', tokenId);
        const { accounts, contract } = this.props;
        await contract.methods.deleteBookReport(tokenId).send({ from: accounts[0] });
        console.log('end', tokenId);
    };

    render() {
        const { tokens = 'N/A' } = this.state

        return (
            <div>
                <h1>投稿フォーム</h1>
                <form
                    noValidate
                    autoComplete="off">
                    <div>
                        <TextField
                            id="title"
                            label="書籍タイトル"
                            style={textFieldStyle}
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                            placeholder="書籍のタイトル"
                        />
                    </div>

                    <div>
                        <TextField
                            id="link"
                            label="URL"
                            style={textFieldStyle}
                            value={this.state.link}
                            onChange={this.handleChange('link')}
                            margin="normal"
                            placeholder="書籍のURL"
                        />
                    </div>

                    <div>
                        <TextField
                            id="content"
                            label="感想"
                            multiline
                            rowsMax="30"
                            value={this.state.content}
                            onChange={this.handleChange('content')}
                            style={textFieldStyle}
                            margin="normal"
                            placeholder="感想をここに入力"
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.createBookReport}>
                        Post!
                   </Button>
                </form>

                <h1>自分の感想文</h1>
                <div>
                    {tokens.map(token => {
                        return (
                            <div style={reportStyle} key={token.tokenId}>
                                <div>{token.tokenId}</div>
                                <h2>書籍タイトル：{token.title}</h2>
                                <div><a href={token.link} target="_blank">Link to Book</a></div>
                                <h3>感想</h3>
                                <p>{token.content}</p>
                                <a onClick={() => this.burnToken(token.tokenId)}>Burn!</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default () => (
    <App
        renderLoading={() => <div>Loading Dapp Page...</div>}
        render={({ web3, accounts, contract }) => (
            <PostReportForm accounts={accounts} contract={contract} web3={web3} />
        )}
    />
)