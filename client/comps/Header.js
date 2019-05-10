import Link from 'next/link'
import { darkBlack } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';

const linkStyle = {
    marginRight: 15,
    color: white
}

const headerSTyle = {
    backgroundColor: darkBlack,
}

const Header = () => (
    <div style={headerSTyle}>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/timeline">
            <a style={linkStyle}>Timeline</a>
        </Link>
        <Link href="/mypage">
            <a style={linkStyle}>Mypage</a>
        </Link>
    </div>
)

export default Header