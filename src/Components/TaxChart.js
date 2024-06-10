import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function TaxChart() {
    return (
        <LineChartWithSlider
            title="Impuestos netos sobre productos (US$ a precios actuales)"
            fetchDataUrl="http://api.worldbank.org/v2/country/ES/indicator/NY.TAX.NIND.CD?format=json"
            yAxisLabel="Miles de millones"
            formatYAxisValue={value => `${(value / 1e9).toFixed(2)}`}
            description="Los impuestos netos sobre productos son impuestos menos subsidios que se aplican a la producción, importación, venta y consumo de bienes y servicios. Incluyen impuestos sobre el valor agregado (IVA), impuestos especiales y otros impuestos indirectos, pero no incluyen impuestos directos sobre la renta o la propiedad. Datos de cuentas nacionales del Banco Mundial y archivos de datos de Cuentas Nacionales de la OCDE."
        />
    );
}

export default TaxChart;
