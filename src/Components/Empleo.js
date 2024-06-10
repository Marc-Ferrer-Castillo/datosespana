import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function Empleo() {
  return (
    <LineChartWithSlider
        title="Desempleo, total (% de la fuerza laboral total) (estimación modelada de la OIT)"
        fetchDataUrl="https://api.worldbank.org/v2/country/ESP/indicator/SL.UEM.TOTL.ZS?format=json"
        yAxisLabel="Tasa de Desempleo"
        formatYAxisValue={value => `${value.toFixed(0)}%`}
        description="El desempleo se refiere a la proporción de la fuerza laboral que está sin trabajo pero disponible y buscándolo. Funte: Organización Internacional del Trabajo. “Base de datos de estimaciones y proyecciones modeladas de la OIT ( ILOEST )” ILOSTAT."
    />
);
}

export default Empleo;
