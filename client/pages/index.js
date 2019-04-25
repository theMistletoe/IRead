import Layout from '../comps/MyLayout';
import NetworkInfo from './NetworkInfo'
import AccountInfo from './AccountInfo';
import AllReports from './AllReports';
import PostReportForm from './PostReportForm'

const Index = (props) => (
    <Layout>
        <h1>Book Reports</h1>
        <NetworkInfo />
        <AccountInfo />
        <PostReportForm />
        <AllReports />
    </Layout>
)

export default Index