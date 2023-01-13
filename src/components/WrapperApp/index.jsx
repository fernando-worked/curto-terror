// TODO:

// tamanho dos botões (design e texto) - RESOLVIDO
// criar rodapé - RESOLVIDO
// selecionar textos e alterar index - RESOLVIDO
// alterar ponteiro do mouse no hover - RESOLVIDO
// compilar versão produção
// publicar site github pages
// alterar domínio site


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import './styles.css'

import Header from '../header';
import CampoBusca from '../campoBusca';
import { useEffect, useState } from 'react';
import TileGrid from '../grid-view/tileGrid';
import textos from '../../textos';
import Footer from '../footer';
import { useParams, useNavigate } from 'react-router-dom';


function WrapperApp() { 

    const [titulo, setTitulo] = useState('Camadas do Medo');
    const [textoSelecionado, setTextoSelecionado] = useState('');
    const [index, setIndex] = useState(null);

    const [valorBusca, setValorBusca] = useState('');
    const [textosFiltrados, setTextosFiltrados] = useState(textos);

    const [textoURL, setTextoURL] = useState('');

    const navigate = useNavigate();
    let { texto } = useParams();

    useEffect(() => {
        if (texto) {
            setTextoURL(texto);

            if (texto !== textoURL) {

                buscarTextoTitulo();
            }

        }

    }, []);


    useEffect(() => {
        setTextosFiltrados(textos.filter((texto) => texto.props.titulo.toLocaleLowerCase().startsWith(valorBusca.toLocaleLowerCase())));
    }, [valorBusca, texto]);


    const handleChange = (value) => {

        setValorBusca(value);

        if (!value) {
            //console.log(textosFiltrados);
            setTextosFiltrados(textos);
            return textosFiltrados;
        }

        setTextosFiltrados(textos.filter((texto) => texto.props.titulo.toLocaleLowerCase().startsWith(valorBusca.toLocaleLowerCase())));
    }

    const handleHome = () => {
        setIndex(null);
        setTextoSelecionado('');
        setTitulo('Camadas do Medo');
        setTextosFiltrados(textos);
    }

    const handleClick = (texto) => {
        setIndex(texto.props.index);
        setTitulo(texto.props.titulo);
        setTextoSelecionado(texto);

    }


    const handleProximo = () => {
        setIndex((prev) => parseInt(prev) + 1);
        setTextoSelecionado(textos[parseInt(index) + 1]);
        setTitulo(textos[parseInt(index) + 1].props.titulo);
        scroll();

    }

    const handleAnterior = () => {
        setIndex((prev) => parseInt(prev) - 1);
        setTextoSelecionado(textos[parseInt(index) - 1]);
        setTitulo(textos[parseInt(index) - 1].props.titulo);
        scroll();

    }


    return (
        <div className='site'>
            <div className="wrapperapp">
                <Header>{titulo ? titulo : 'Camadas do Medo'}</Header>
                <div className="cabecalho-holder">
                    <div className="titulo-holder">{textoSelecionado ?
                        <div className="btn-holder">
                            <div className="btn-place"><input type="button" disabled={parseInt(index) === 0 ? true : false} onClick={handleAnterior} value={tituloAnterior(textos[parseInt(index)])} /></div>
                            <div className="btn-place"><input type="button" onClick={handleHome} value='Início' /></div>
                            <div className="btn-place"><input type="button" disabled={parseInt(index) + 1 >= textos.length ? true : false} onClick={handleProximo} value={tituloProximo(textos[parseInt(index)])} /></div>
                        </div> : <CampoBusca onChange={handleChange}></CampoBusca>}
                    </div>
                </div>
                <div className="conteudo-site">{textoSelecionado ?
                    <div id="content-holder" className="content-holder">{textoSelecionado}</div>
                    : <ListaDeTextos />}
                    
                </div>
                <Footer></Footer>
            </div>
            
        </div>
    );

    function buscarTextoTitulo() {


        var result = textos.filter(txt => {
            return txt.props.titulo.toLocaleLowerCase() === texto.toLocaleLowerCase();
        })

        if (result.length > 0) {
            setIndex(result[0].props.index);
            setTitulo(result[0].props.titulo);
            setTextoSelecionado(result[0]);
        }


        navigate('/');

    }

    function scroll() {
        document.getElementById('content-holder').scrollTo(0, 0);
    }

    function tituloProximo(textoAtual) {
        if (parseInt(textoAtual.props.index) + 1 >= textos.length) {
            return '-';
        } else {
            return textos[parseInt(textoAtual.props.index) + 1].props.titulo;
        }

    }

    function tituloAnterior(textoAtual) {
        if (parseInt(index) === 0) {
            return '-';
        } else {
            return textos[parseInt(textoAtual.props.index) - 1].props.titulo;
        }

    }


    function ListaDeTextos() {

        return (
            textosFiltrados.length > 0 ? <div className='fundo'>
                {textosFiltrados.map((texto, index) => (
                    <div key={index} onClick={() => handleClick(texto)} className="tile-content">
                        <TileGrid className='tile-content'>{texto.props.titulo}</TileGrid></div>
                ))}

            </div> : <div className='fundo'>Infelizmente, eu ainda não criei um texto com esse título...</div>

        );
    }

}



export default WrapperApp;