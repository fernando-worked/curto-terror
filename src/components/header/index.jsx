import './styles.css'

function Header(props) {

    const { children } = props;

    return (
        <div className="header"><h1>{children}</h1></div>
    );
}

export default Header;