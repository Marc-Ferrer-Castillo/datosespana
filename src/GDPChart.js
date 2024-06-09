import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import './App.css';

const CustomTooltip = ({ point }) => (
  <div
    style={{
      background: 'white',
      padding: '5px 10px',
      border: '1px solid #ccc',
    }}
  >
    <strong>{point.serieId}</strong>
    <br />
    Año: {point.data.xFormatted}
    <br />
    PIB: {(point.data.y / 1e6).toFixed(2)} M
  </div>
);

function GDPChart() {
  const [gdpData, setGdpData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://api.worldbank.org/v2/country/ES/indicator/NY.GDP.MKTP.CD?format=json`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length < 2 || !Array.isArray(data[1])) {
          console.error('Datos inesperados:', data);
          return;
        }

        const processedData = data[1]
          .filter(item => item.value !== null && parseInt(item.date) >= 2000)
          .map(item => ({
            x: item.date,
            y: item.value
          }))
          .sort((a, b) => a.x.localeCompare(b.x));

        setGdpData([{
          id: 'España',
          data: processedData
        }]);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        window.location.reload();
      }
    };

    try {
      fetchData();
    } catch (error) {
      console.error('Error inesperado:', error);
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <h2>Producto Interior Bruto de España (US$ a precios actuales)</h2>
      <div style={{ minWidth: '800px', width: 'auto', height: 800, overflow: 'unset' }}>
          <ResponsiveLine
            data={gdpData}
            margin={{ top: 50, right: 110, bottom: 110, left: 110 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Año',
              legendOffset: 36,
              legendPosition: 'middle'
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 25,
              tickRotation: 0,
              legend: 'PIB (US$ a precios actuales)',
              legendOffset: -15,
              legendPosition: 'middle',
              format: value => `${(value / 1e6).toFixed(2)} M`
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            tooltip={CustomTooltip}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />
      </div>
    </div>
  );
}

export default GDPChart;
