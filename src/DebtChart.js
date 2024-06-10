import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function DebtChart() {
    return (
        <LineChartWithSlider
            title="Deuda del Gobierno Central (% del PIB)"
            fetchDataUrl="http://api.worldbank.org/v2/country/ES/indicator/GC.DOD.TOTL.GD.ZS?format=json"
            yAxisLabel="Deuda (% del PIB)"
            formatYAxisValue={value => `${value.toFixed(0)}%`}
            description="La deuda es el conjunto total de obligaciones contractuales directas del gobierno a plazo fijo con otros pendientes en una fecha particular. Incluye pasivos internos y externos, como depósitos en moneda y dinero, valores distintos de acciones y préstamos. Es el monto bruto de los pasivos del gobierno menos el monto de capital y derivados financieros en poder del gobierno. Como la deuda es un stock y no un flujo, se mide a partir de una fecha determinada, generalmente el último día del año fiscal. Datos de cuentas nacionales del Banco Mundial y archivos de datos de Cuentas Nacionales de la OCDE."
        />
    );
}

export default DebtChart;
