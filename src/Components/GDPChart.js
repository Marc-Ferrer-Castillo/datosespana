import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function GDPChart() {
    return (
        <LineChartWithSlider
            title="PIB (US$ a precios actuales)"
            fetchDataUrl="http://api.worldbank.org/v2/country/ES/indicator/NY.GDP.MKTP.CD?format=json"
            yAxisLabel="Miles de millones"
            formatYAxisValue={value => `${(value / 1e9).toFixed(2)}`}
            description="El PIB a precios de comprador es la suma del valor agregado bruto de todos los productores residentes en la economía más los impuestos sobre los productos y menos los subsidios no incluidos en el valor de los productos. Se calcula sin hacer deducciones por depreciación de activos fabricados o por agotamiento y degradación de recursos naturales. Los datos están en dólares estadounidenses actuales. Las cifras en dólares del PIB se convierten a partir de monedas nacionales utilizando tipos de cambio oficiales de un solo año. Para algunos países donde el tipo de cambio oficial no refleja el tipo efectivamente aplicado a las transacciones reales de divisas, se utiliza un factor de conversión alternativo."
        />
    );
}

export default GDPChart;
