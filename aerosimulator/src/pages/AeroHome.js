import Button from '@mui/material/Button';
import React, { useState } from 'react';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import Select from 'react-select';
import logo from '../assets/logo.png';
import mapa from '../assets/mapa.svg';
import { getAirports } from '../utils/airports';
import { main } from '../utils/bfs';
import { generateErrorMessage, generateOutputText, generateOutputTitle } from '../utils/messages';

export const Aero = () => {
    const [departure, setDeparture] = React.useState(-1);
    const [destination, setDestination] = React.useState(-1);
    const [outputRoute, setOutputRoute] = useState([]);
    const [outputTitle, setOutputTitle] = React.useState("");
    let departureOpt = getAirports();
    let destinationOpt = getAirports();
    let route = [];

    const clearOutputs = () => {
        setOutputTitle("");
        setOutputRoute("");
    }

    const handleChangeDeparture = (option) => {
        setDeparture(option.value);
    };

    const handleChangeDestination = (option) => {
        setDestination(option.value);
    };

    const handleButtonClick = () => {
        clearOutputs();
        
        if(
            departure === destination  ||
            departure <= -1            ||
            destination <= -1
        ) {
            setOutputRoute([])
            if(departure <= -1 || destination <= -1) 
                setOutputTitle(generateErrorMessage(2))
            else 
                setOutputTitle(generateErrorMessage(1))
        } else {
            route = main(departure, destination);

            setOutputTitle(generateOutputTitle(departure, destination))
            setOutputRoute(generateOutputText(route))
        }
    }

    return (
        <div className='flex-container'>
            <div className='menu-superior'>
                <div className='logo'>
                    <img src={logo} alt="Logo do AeroSimulator"></img>
                </div>
                <div className='controlArea'>
                    <div className='selectionBoxes'>
                        <div className='boxDeparture'>
                            <h1>Partida</h1>
                            <Select
                                className='departure'
                                placeholder="Partida"
                                options={departureOpt}
                                onChange={handleChangeDeparture}
                            >
                            </Select>
                        </div>
                        <div className='boxDestination'>
                            <h1>Destino</h1>
                            <Select
                                className='destination'
                                placeholder="Destino"
                                options={destinationOpt}
                                onChange={handleChangeDestination}
                            >
                            </Select>
                        </div>
                        <div className='buttonGenerateRoute'>
                            <Button 
                                variant="contained"
                                onClick={handleButtonClick}
                            >
                                Buscar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contentArea'>
                <div className='gridContent'>
                    <div className='mapArea'>
                        <div className='mapa'>
                            <ReactPanZoom
                                image={mapa}
                                alt="Aeroportos do Brasil e suas rotas"
                            />
                        </div>
                    </div>
                    <div className='contentReturnArea'>
                        <div className='contentTitle'>
                            <h1>{outputTitle}</h1>
                        </div>
                        <div className='contentRoute'>
                            {outputRoute.map((element) => {
                                if(outputRoute.length > 1) {
                                    return (
                                        <h3>{element}</h3>
                                    )
                                } else {
                                    return undefined
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
