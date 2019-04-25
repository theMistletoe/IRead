import Layout from '../comps/MyLayout';
import NetworkInfo from '../comps/NetworkInfo'
import AccountInfo from '../comps/AccountInfo';
import AllReports from '../comps/AllReports';
import PostReportForm from '../comps/PostReportForm'

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