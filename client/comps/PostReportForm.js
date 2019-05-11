import React from 'react';
import App from './App'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'inline-block',
        flexWrap: 'wrap',
        width: '90%',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

const textFieldStyle = {
    width: 600
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
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    reflectTokens = async () => {
        const { accounts, contract } = this.props
        const ownedTokensCount = await contract.methods.balanceOf(accounts[0]).call()
        const newTokens = [];
        for (let i = 0; i < ownedTokensCount; i += 1) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call()
            const token = await contract.methods.tokenURI(tokenId).call()
            newTokens.push(token);
        }
        this.setState({ tokens: newTokens })
    }

    render() {
        const { tokens = 'N/A' } = this.state

        return (
            <div>
                <form
                    // className={classes.container}
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

                <div>Account Tokens: {tokens}</div>
            </div>
        );
    }
}

// TextFields.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(PostReportForm);

export default () => (
    <App
        renderLoading={() => <div>Loading Dapp Page...</div>}
        render={({ web3, accounts, contract }) => (
            <PostReportForm accounts={accounts} contract={contract} web3={web3} />
        )}
    />
)