import Layout from '../comps/MyLayout';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import NetworkInfo from './NetworkInfo'
import AccountInfo from './AccountInfo';
import AllReports from './AllReports';
import Button from '@material-ui/core/Button'
import TextFields from './TextFields'
import PostReportForm from './PostReportForm'

const Index = (props) => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <NetworkInfo />
        <AccountInfo />
        <AllReports />
        <Button variant="contained" color="primary" >
            hello
        </Button>
        <PostReportForm />
        {/* <TextFields /> */}
        <ul>
            {props.shows.map(({ show }) => (
                <li key={show.id}>
                    <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </Layout>
)

Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
        shows: data
    }
}

export default Index