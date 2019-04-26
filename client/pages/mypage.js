import Layout from "../comps/MyLayout"
import NetworkInfo from '../comps/NetworkInfo'
import AccountInfo from '../comps/AccountInfo'
import PostReportForm from '../comps/PostReportForm'

export default () => (
    <Layout>
        <p>This is the your account page</p>
        <NetworkInfo />
        <PostReportForm />
        <AccountInfo />
    </Layout>
)