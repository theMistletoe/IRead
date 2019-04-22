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


class PostReportForm extends React.Component {
    state = {
        title: 'DefaultTitle',
        link: 'DefaultLink',
        content: 'DefaultContent',
    };

    createBookReport = async () => {
        const { accounts, contract } = this.props
        const report = {
            title: this.state.title,
            link: this.state.link,
            content: this.state.content
        }
        console.log(report)
        console.log(JSON.parse(JSON.stringify(report)))
        await contract.methods.createBookReport(JSON.stringify(report)).send({ from: accounts[0] })
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form
                // className={classes.container}
                noValidate
                autoComplete="off">
                <TextField
                    id="title"
                    label="Title"
                    // className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleChange('title')}
                    margin="normal"
                />

                <TextField
                    id="link"
                    label="link"
                    // className={classes.textField}
                    value={this.state.link}
                    onChange={this.handleChange('link')}
                    margin="normal"
                />

                <TextField
                    id="content"
                    label="content"
                    multiline
                    rowsMax="30"
                    value={this.state.content}
                    onChange={this.handleChange('content')}
                    // className={classes.textField}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.createBookReport}>
                    Post!
                </Button>
            </form >
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