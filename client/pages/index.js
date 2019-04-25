import Layout from '../comps/MyLayout';
import NetworkInfo from './NetworkInfo'
import AccountInfo from './AccountInfo';
import AllReports from './AllReports';
import Button from '@material-ui/core/Button'
import TextFields from './TextFields'
import PostReportForm from './PostReportForm'

const Index = (props) => (
    <Layout>
        <h1>Book Reports</h1>
        <NetworkInfo />
        <AccountInfo />
        <AllReports />
        <PostReportForm />
    </Layout>
)

export default Index