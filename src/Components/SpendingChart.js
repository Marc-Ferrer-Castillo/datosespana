import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function SpendingChart() {
    return (
        <LineChartWithSlider
            title="Gasto (% del PIB)"
            fetchDataUrl="https://api.worldbank.org/v2/country/ES/indicator/GC.XPN.TOTL.GD.ZS?format=json"
            yAxisLabel="Gasto (% del PIB)"
            formatYAxisValue={value => `${value.toFixed(0)} %`}
            description="Los gastos son los pagos de dinero por actividades operativas del Gobierno para la provisión de bienes y servicios. Incluye remuneración de empleados (como sueldos y salarios), interés y subsidios, donaciones, beneficios sociales y otros gastos como renta y dividendos. Fuente: Fondo Monetario Internacional, Anuario de Estadísticas de las Finanzas Publicas y archivos de datos, y estimaciones del PIB del Banco Mundial y la OCDE."
        />
    );
}

export default SpendingChart;
