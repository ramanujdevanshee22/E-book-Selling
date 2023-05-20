import LinkButton from '../UI/LinkButton'
import WhiteButton from '../UI/WhiteButton';
import '../CSS/header.css';
function Header(props) {
    return (
        <>
            {/* Header Containing logo and Login/Register/cart Button */}
            <div className='header'>
                <h2>TatvaSoft</h2>
                {/* <div className='header-menu'>
                    <WhiteButton buttonText="Menu" click={menu} />
                </div> */}
                <div className='header-buttons'>
                    <LinkButton buttonText="Login" /> | <LinkButton buttonText="Register" />
                    <WhiteButton buttonText="Cart" />
                </div>
            </div>
        </>
    )
}
export default Header;