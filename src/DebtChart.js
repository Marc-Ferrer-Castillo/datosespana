import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import Modal from 'react-modal';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './App.css';
import InfoIcon from '@mui/icons-material/Info';

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

function DebtChart() {
    const [debtData, setDebtData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://api.worldbank.org/v2/country/ES/indicator/GC.DOD.TOTL.GD.ZS?format=json`);
                const data = await response.json();

                if (!Array.isArray(data) || data.length < 2 || !Array.isArray(data[1])) {
                    console.error('Datos inesperados:', data);
                    return;
                }

                const processedData = data[1]
                    .filter(item => item.value !== null && parseInt(item.date) >= 2000)
                    .map(item => ({
                        x: item.date,
                        y: item.value // Asegúrate de que el valor es numérico y está en el formato correcto
                    }))
                    .sort((a, b) => a.x.localeCompare(b.x));

                setDebtData([{
                    id: 'España',
                    data: processedData
                }]);
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

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <h2>Deuda del Gobierno Central (% del PIB)</h2>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<InfoIcon />}
                onClick={openModal}>
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
                <h2>Deuda del gobierno central, total (% del PIB)</h2>
                <div>
                    <p>La deuda es el conjunto total de obligaciones contractuales directas del gobierno a plazo fijo con otros pendientes en una fecha particular. Incluye pasivos internos y externos, como depósitos en moneda y dinero, valores distintos de acciones y préstamos. Es el monto bruto de los pasivos del gobierno menos el monto de capital y derivados financieros en poder del gobierno. Como la deuda es un stock y no un flujo, se mide a partir de una fecha determinada, generalmente el último día del año fiscal.</p>
                    <p><strong>Fuente:</strong> Fondo Monetario Internacional, Anuario de Estadísticas de Finanzas Públicas y archivos de datos, y estimaciones del PIB del Banco Mundial y la OCDE.</p>
                </div>
            </Modal>
            <div style={{ minWidth: '800px', width: 'auto', height: 800, overflow: 'unset' }}>
                <ResponsiveLine
                    data={debtData}
                    margin={{ top: 50, right: 110, bottom: 110, left: 110 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
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
                        tickPadding: 12,
                        tickRotation: 0,
                        legend: 'Deuda (% del PIB)',
                        legendOffset: -60,
                        legendPosition: 'middle',
                        format: value => `${value}%`
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel={point => `${point.data.y.toFixed(0)}%`}
                    pointLabelYOffset={-12}
                    useMesh={false}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    enablePointLabel={true}  // Habilitar etiquetas de puntos
                />
            </div>
        </div>
    );
}

export default DebtChart;
