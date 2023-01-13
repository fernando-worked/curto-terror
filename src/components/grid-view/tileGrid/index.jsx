import './styles.css'

function TileGrid(props) {

    const { children } = props;

    return (
        <div className="tile-grid">
            <div className="conteudo-grid">
                <h3 className="titulo-grid">{children}</h3>
            </div>
        </div>
    );
}



export default TileGrid;