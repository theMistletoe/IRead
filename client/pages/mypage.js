import Layout from "../comps/MyLayout"
import NetworkInfo from '../comps/NetworkInfo'
import PostReportForm from '../comps/PostReportForm'

export default () => (
    <Layout>
        <h1>マイページ</h1>
        <NetworkInfo />
        <hr />
        <PostReportForm />
    </Layout>
)