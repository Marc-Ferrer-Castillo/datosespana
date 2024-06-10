import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function GDPPerCapitaChart() {
    return (
        <LineChartWithSlider
            title="PIB per cápita, PPA ($ a precios internacionales actuales)"
            fetchDataUrl="http://api.worldbank.org/v2/country/ES/indicator/NY.GDP.PCAP.PP.CD?format=json"
            yAxisLabel="PIB per cápita, PPA ($ a precios internacionales actuales)"
            formatYAxisValue={value => `${value.toFixed(0)}`}
            description="Este indicador proporciona valores per cápita del producto interno bruto (PIB) expresado en dólares internacionales corrientes convertidos mediante el factor de conversión de paridad de poder adquisitivo (PPA). El PIB es la suma del valor agregado bruto de todos los productores residentes en el país más los impuestos sobre los productos y menos los subsidios no incluidos en el valor de los productos. El factor de conversión es un deflactor espacial de precios y un conversor de divisas que controla las diferencias de nivel de precios entre países. La población total es una población de mitad de año basada en la definición de facto de población, que cuenta a todos los residentes independientemente de su estatus legal o ciudadanía. Fuente: Programa de Comparación Internacional, Banco Mundial | Base de datos de indicadores de desarrollo mundial, Banco Mundial | Programa PPP Eurostat-OCDE."
        />
    );
}

export default GDPPerCapitaChart;
