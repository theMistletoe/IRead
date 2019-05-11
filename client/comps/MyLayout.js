import Header from './Header';
import Head from 'next/head';

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const Layout = (props) => (
    <div>
        <Head>
            <title>BookReports</title>
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/light.min.css'></link>
        </Head>
        <Header />
        {props.children}
    </div>
)

export default Layout