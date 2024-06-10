import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function ExportChart() {
    return (
        <LineChartWithSlider
            title="Exportaciones de bienes y servicios (% del PIB)"
            fetchDataUrl="https://api.worldbank.org/v2/country/ES/indicator/NE.EXP.GNFS.ZS?format=json"
            yAxisLabel="Exportaciones (% del PIB)"
            formatYAxisValue={value => `${value.toFixed(0)} %`}
            description="Las exportaciones de bienes y servicios representan el valor de todos los bienes y otros servicios de mercado proporcionados al resto del mundo. Incluyen el valor de las mercancías, fletes, seguros, transporte, viajes, regalías, derechos de licencia y otros servicios, como comunicaciones, construcción, servicios financieros, de información, comerciales, personales y gubernamentales. Excluyen la remuneración de los empleados y los ingresos por inversiones (anteriormente llamados servicios de factores) y los pagos de transferencia. Fuente: Datos de cuentas nacionales del Banco Mundial y archivos de datos de Cuentas Nacionales de la OCDE."
        />
    );
}

export default ExportChart;
