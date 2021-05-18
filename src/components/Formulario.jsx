import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;


    &:hover{
        background-color: #325AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //state de la lista de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);
    const [error, guardarError] = useState(false);

    const Monedas = [
        { codigo: 'USD', nombre: 'Dolar (USA)'},
        { codigo: 'MXN', nombre: 'Peso mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libre esterlina'},
        { codigo: 'ARS', nombre: 'Peso argentino'},
    ]

    //utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', Monedas);

    //utilizar criptoMoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda','', listacripto);

    //llamada a la API
    useEffect(() =>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        
            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    //Cuando el usuario envia el formulario
    const cotizarMoneda = e =>{
        e.preventDefault();

        //validacion del form
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        //pasar los datos al componente ppal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje='Ambos campos son obligatorios'/> : null}

            <SelectMoneda />

            <SelectCripto />

            
            <Boton
                type='submit'
                value='Calcular'
            />
        </form>
     );
}
 
export default Formulario;