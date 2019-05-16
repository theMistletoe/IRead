import Layout from "../comps/MyLayout";
import { emphasize } from "material-ui/utils/colorManipulator";

export default () => (
  <Layout>
    <center>
      <h1>IRead</h1>
      <p>自分の読んだ本の感想文をEthereumチェーンで管理できる分散アプリケーション</p>
    </center>
    <img src="/static/bookcase.jpg" />

    <h2>Usage</h2>

    <emphasize>※注意</emphasize>
    <p>アプリケーションにEthereumのRopstenTestNetworkを利用します。</p>
    <p>Metamaskをインストールし、Ether FaucetからRopstenTestNetworkのETHを入手してからご利用ください。</p>
    <ul>
      <li>
        <a href='https://metamask.io/' >Metamask</a>
      </li>
      <li>
        <a href='https://faucet.metamask.io/'>Ether Faucet</a>
      </li>
    </ul>
  </Layout>
)