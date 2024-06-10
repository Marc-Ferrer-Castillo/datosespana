import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function ReserveChart() {
    return (
        <LineChartWithSlider
            title="Total de reservas (incluye oro, US$ a precios actuales)"
            fetchDataUrl="http://api.worldbank.org/v2/country/ES/indicator/FI.RES.TOTL.CD?format=json"
            yAxisLabel="Miles de millones"
            formatYAxisValue={value => `${(value / 1e9).toFixed(2)}`}
            description="El total de reservas comprenden las tenencias de oro monetario, derechos especiales de giro, reservas de los miembros del FMI que mantiene el FMI y tenencias de divisas bajo el control de autoridades monetarias. El componente de oro de estas reservas se valora a los precios de fin de año (31 de diciembre) de Londres. Datos en US$ a precios actuales. Fuente: Fondo Monetario Internacional, Estadísticas financieras internacionales y archivos de datos."
        />
    );
}

export default ReserveChart;
