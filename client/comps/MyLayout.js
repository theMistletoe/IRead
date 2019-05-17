import Header from './Header';
import Head from 'next/head';
import { darkBlack } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';


const footerStyle = {
    backgroundColor: darkBlack,
    marginRight: 15,
    color: white
}

const Layout = (props) => (
    <div>
        <Head>
            <title>BookReports</title>
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css'></link>
        </Head>
        <Header />
        {props.children}
        <footer style={footerStyle}>
            @2019 <a href='https://github.com/theMistletoe'>theMistletoe</a> All Right Reserved.
        </footer>
    </div>
)

export default Layout