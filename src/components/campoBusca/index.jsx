import './styles.css'

function CampoBusca(props) {

    const { onChange, children } = props

    return (
        <div className="campo-busca">
            <input type="text" name="campo-busca" id="campo-busca" onChange={(evt) => onChange(evt.target.value)} value={children} placeholder='Digite para buscar uma obra' />
        </div>
    );
}

export default CampoBusca;