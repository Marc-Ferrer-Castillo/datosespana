import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import './App.css'; // Si tienes estilos adicionales

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
    Tasa de Desempleo: {point.data.yFormatted}%
  </div>
);

function Empleo() {
  const [unemploymentData, setUnemploymentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spainResponse, usResponse, euResponse, chinaResponse] = await Promise.all([
          fetch('http://api.worldbank.org/v2/country/ESP/indicator/SL.UEM.TOTL.ZS?format=json'),
          fetch('http://api.worldbank.org/v2/country/USA/indicator/SL.UEM.TOTL.ZS?format=json'),
          fetch('http://api.worldbank.org/v2/country/EUU/indicator/SL.UEM.TOTL.ZS?format=json'),
          fetch('http://api.worldbank.org/v2/country/CHN/indicator/SL.UEM.TOTL.ZS?format=json')
        ]);

        const [spainData, usData, euData, chinaData] = await Promise.all([
          spainResponse.json(),
          usResponse.json(),
          euResponse.json(),
          chinaResponse.json()
        ]);

        const processUnemploymentData = (data) => data[1]
          .filter(item => item.value !== null)
          .map(item => ({
            x: item.date,
            y: item.value
          }))
          .sort((a, b) => a.x.localeCompare(b.x));

        setUnemploymentData([
          {
            id: 'España',
            data: processUnemploymentData(spainData)
          },
          {
            id: 'Estados Unidos',
            data: processUnemploymentData(usData)
          },
          {
            id: 'Europa',
            data: processUnemploymentData(euData)
          },
          {
            id: 'China',
            data: processUnemploymentData(chinaData)
          }
        ]);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Tasa de Desempleo: Comparación entre España, EE.UU., Europa y China</h2>
      <div style={{ overflow: 'hidden', position: 'relative', height: 800 }}>
        <div style={{ width: 1800, height: '100%' }}>
          <ResponsiveLine
            data={unemploymentData}
            margin={{ top: 50, right: 110, bottom: 110, left: 110 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
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
              tickPadding: 2,
              tickRotation: 0,
              legend: 'Tasa de Desempleo (%)',
              legendOffset: -35,
              legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            tooltip={CustomTooltip} // Uso del tooltip personalizado
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
    </div>
  );
}

export default Empleo;
