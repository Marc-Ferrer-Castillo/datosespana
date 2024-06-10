import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import Modal from 'react-modal';
import { Button, IconButton, Slider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';

// Estilos del modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        maxHeight: '70vh',
        overflowY: 'auto',
        position: 'relative'
    }
};

Modal.setAppElement('#root');

function ReserveChart() {
    const [reserveData, setReserveData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [yearRange, setYearRange] = useState([1974, 2022]);
    const [allData, setAllData] = useState([]);
    const [minYear, setMinYear] = useState(1974);
    const [maxYear, setMaxYear] = useState(2022);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://api.worldbank.org/v2/country/ES/indicator/FI.RES.TOTL.CD?format=json`);
                const data = await response.json();

                if (!Array.isArray(data) || data.length < 2 || !Array.isArray(data[1])) {
                    console.error('Datos inesperados:', data);
                    return;
                }

                const processedData = data[1]
                    .filter(item => item.value !== null)
                    .map(item => ({
                        x: parseInt(item.date),
                        y: item.value
                    }))
                    .sort((a, b) => a.x - b.x);

                setAllData(processedData);
                setReserveData([{
                    id: 'España',
                    data: processedData
                }]);

                const years = processedData.map(item => item.x);
                setMinYear(Math.min(...years));
                setMaxYear(Math.max(...years));
                setYearRange([Math.min(...years), Math.max(...years)]);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                window.location.reload();
            }
        };

        try {
            fetchData();
        } catch (error) {
            console.error('Error inesperado:', error);
            window.location.reload();
        }
    }, []);

    const handleYearRangeChange = (event, newValue) => {
        setYearRange(newValue);
        const filteredData = allData.filter(item => item.x >= newValue[0] && item.x <= newValue[1]);
        setReserveData([{
            id: 'España',
            data: filteredData
        }]);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <h2>Total de reservas (incluye oro, US$ a precios actuales)</h2>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<InfoIcon />}
                onClick={openModal}
            >
                Detalles
            </Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Información sobre el gráfico">
                <IconButton
                    style={{ position: 'absolute', top: 10, right: 10 }}
                    onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
                <h2>Total de reservas (incluye oro, US$ a precios actuales)</h2>
                <div>
                    <p>El total de reservas comprenden las tenencias de oro monetario, derechos especiales de giro, reservas de los miembros del FMI que mantiene el FMI y tenencias de divisas bajo el control de autoridades monetarias. El componente de oro de estas reservas se valora a los precios de fin de año (31 de diciembre) de Londres. Datos en US$ a precios actuales.</p>
                    <p><strong>Fuente:</strong> Fondo Monetario Internacional, Estadísticas financieras internacionales y archivos de datos.</p>
                </div>
            </Modal>
           
            <div style={{ minWidth: 800, height: 800, overflow: 'unset', marginBottom: '-50px' }}>
                <ResponsiveLine
                    data={reserveData}
                    margin={{ top: 50, right: 110, bottom: 110, left: 110 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Año',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 25,
                        tickRotation: 0,
                        legend: 'Reservas (US$ a precios actuales)',
                        legendOffset: -15,
                        legendPosition: 'middle',
                        format: value => `${(value / 1e9).toFixed(2)} B` // Expresar en miles de millones
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    enablePointLabel={true}
                    pointLabel={point => `${(point.data.y / 1e9).toFixed(2)} Mil millones`} // Mostrar el valor del punto en miles de millones
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={false}
                />
            </div>

            <div style={{ margin: '0px 110px' }}>
                <Slider
                    value={yearRange}
                    onChange={handleYearRangeChange}
                    valueLabelDisplay="auto"
                    min={minYear}
                    max={maxYear}
                    marks={[
                        { value: minYear, label: String(minYear) },
                        { value: maxYear, label: String(maxYear) }
                    ]}
                />
            </div>
        </div>
    );
}

export default ReserveChart;
