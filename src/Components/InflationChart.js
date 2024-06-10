import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function InflationChart() {
    return (
        <LineChartWithSlider
            title="Inflación, precios al consumidor (% anual)"
            fetchDataUrl="https://api.worldbank.org/v2/country/ESP/indicator/FP.CPI.TOTL.ZG?format=json"
            yAxisLabel="Porcentaje de inflación"
            formatYAxisValue={value => `${value.toFixed(0)}%`}
            description="La inflación, medida por el índice de precios al consumidor, refleja el cambio porcentual anual en el costo para el consumidor promedio de adquirir una canasta de bienes y servicios que puede fijarse o cambiarse en intervalos específicos, como por ejemplo anualmente. Generalmente se utiliza la fórmula de Laspeyres. Fuente: Fondo Monetario Internacional, Estadísticas Financieras Internacionales y archivos de datos."
        />
    );
}

export default InflationChart;
