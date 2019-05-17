import Layout from "../comps/MyLayout";
import { darkBlack } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';

const footerStyle = {
  backgroundColor: darkBlack,
  marginRight: 15,
  color: white
}


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

    <footer style={footerStyle}>
      @2019 <a href='https://github.com/theMistletoe'>theMistletoe</a> All Right Reserved.
    </footer>
  </Layout>
)