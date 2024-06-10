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

function TaxChart() {
    const [taxData, setTaxData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [yearRange, setYearRange] = useState([2000, 2023]);
    const [allData, setAllData] = useState([]);
    const [minYear, setMinYear] = useState(2000);
    const [maxYear, setMaxYear] = useState(2023);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://api.worldbank.org/v2/country/ES/indicator/NY.TAX.NIND.CD?format=json`);
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
                setTaxData([{
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
        setTaxData([{
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
            <h2>Impuestos netos sobre productos en miles de millones (US$ a precios actuales)</h2>
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
                <h2>Impuestos netos sobre productos (US$ a precios actuales)</h2>
                <div>
                    <p>Los impuestos netos sobre productos son impuestos menos subsidios que se aplican a la producción, importación, venta y consumo de bienes y servicios. Incluyen impuestos sobre el valor agregado (IVA), impuestos especiales y otros impuestos indirectos, pero no incluyen impuestos directos sobre la renta o la propiedad.</p>
                    <p><strong>Fuente:</strong> Datos de cuentas nacionales del Banco Mundial y archivos de datos de Cuentas Nacionales de la OCDE.</p>
                </div>
            </Modal>
            <div style={{ minWidth: '800px', width: 'auto', height: 800, overflow: 'unset', marginBottom: '-50px' }}>
                <ResponsiveLine
                    data={taxData}
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
                        legend: 'Impuestos netos (US$ a precios actuales)',
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

export default TaxChart;
