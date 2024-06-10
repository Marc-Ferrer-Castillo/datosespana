import React from 'react';
import LineChartWithSlider from './LineChartWithSlider';

function EducationExpenditureChart() {
    return (
        <LineChartWithSlider
            title="Gasto público en educación, total (% del gasto del gobierno)"
            fetchDataUrl="http://api.worldbank.org/v2/country/ES/indicator/SE.XPD.TOTL.GB.ZS?format=json"
            yAxisLabel="Gasto público en educación, total (% del gasto del gobierno)"
            formatYAxisValue={value => `${value.toFixed(0)}%`}
            description="El gasto público en educación como porcentaje del gasto total del Gobierno corresponde al gasto público total (corriente y de capital) en educación, expresado como porcentaje del gasto total del Gobierno en todos los sectores en un año financiero determinado. El gasto público en educación incluye el gasto del Gobierno en instituciones educativas (públicas y privadas), administración educativa y subsidios para entidades privadas (estudiantes/hogares y otras entidades privadas). Fuente: Instituto de Estadística de la Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura ( UNESCO )."
        />
    );
}

export default EducationExpenditureChart;
