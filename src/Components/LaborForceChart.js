import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function LaborForceChart() {
    return (
        <LineChartWithSlider
            title="Fuerza laboral, total"
            fetchDataUrl="https://api.worldbank.org/v2/country/ESP/indicator/SL.TLF.TOTL.IN?format=json"
            yAxisLabel="Millones de personas"
            formatYAxisValue={value => `${(value / 1e6).toFixed(2)} M`}
            description="La fuerza laboral está compuesta por personas de 15 años o más que suministran mano de obra para la producción de bienes y servicios durante un período específico. Incluye a las personas que actualmente están empleadas y a las personas que están desempleadas pero que buscan trabajo, así como a las que buscan empleo por primera vez. Sin embargo, no todos los que trabajan están incluidos. A menudo se omiten a los trabajadores no remunerados, los trabajadores familiares y los estudiantes, y algunos países no cuentan a los miembros de las fuerzas armadas. El tamaño de la fuerza laboral tiende a variar durante el año a medida que entran y salen trabajadores estacionales. Fuente: Banco Mundial, base de datos de indicadores del desarrollo mundial. Las estimaciones se basan en datos obtenidos de la Organización Internacional del Trabajo y la División de Población de las Naciones Unidas."
        />
    );
}

export default LaborForceChart;
