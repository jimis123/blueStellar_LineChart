import { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';


export default function LineChart(){

  const [data, setData] = useState([]);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');


  const getData = () => {
    fetch('timeseries.json',{headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    }}).then((response)=>{
      return response.json()
    }).then((data)=>{
      //console.log(data)
      setData(data)

      // Extract minimum and maximum dates from the data
      const minDateTime = data.reduce((min, obj) => {
        return (new Date(obj.DateTime) < new Date(min.DateTime)) ? obj : min;
      });
      setMinDate(minDateTime.DateTime.split('T')[0]);

      const maxDateTime = data.reduce((max, obj) => {

        return (new Date(obj.DateTime) > new Date(max.DateTime)) ? obj : max;
      });
      setMaxDate(maxDateTime.DateTime.split('T')[0]);
    }
  )
  .catch(error => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const labels = data.map(entry => {
      const dateTime = new Date(entry.DateTime);
      return dateTime.toLocaleString();
    });
    const dataset1 = data.map(entry => parseFloat(entry.ENTSOE_DE_DAM_Price));
    const dataset2 = data.map(entry => parseFloat(entry.ENTSOE_GR_DAM_Price));
    const dataset3 = data.map(entry => parseFloat(entry.ENTSOE_FR_DAM_Price));


    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Price in Denmark',
            data: dataset1,
            borderColor: 'red',
            fill: false
          },
          {
            label: 'Price in Greece',
            data: dataset2,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Price in France',
            data: dataset3,
            borderColor: 'green',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        elements:{
          line: {
            tension: 0.5,
          },
        },
        scales: {
          x: {
            title:{
              display: true,
              text: 'Date and Time'
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price Fluctuation'
            },
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  const handleFilterClick = () => {

    //initiallize the starting and the final date in milisec (number)
    const start1 = new Date(document.getElementById('start').value);
    const start = start1.setHours(0,0,0,0);
   // console.log(start);

    const end1 = new Date(document.getElementById('end').value);
    const end = end1.setHours(0,0,0,0);
    //console.log(end);

     // Filter the data based on the selected date range
     const filteredData = data.filter(entry => {
      const date = new Date(entry.DateTime).setHours(0, 0, 0, 0);
      return date >= start && date <= end;
  });

  // Destroy the existing chart instance if it exists
  const existingChart = Chart.getChart('myChart');
  if (existingChart) {
      existingChart.destroy();
  }

  // Update the chart with the filtered data
  const ctx = document.getElementById('myChart').getContext('2d');

  const labels = filteredData.map(entry => {
      const dateTime = new Date(entry.DateTime);
      return dateTime.toLocaleString();
  });
  const dataset1 = filteredData.map(entry => parseFloat(entry.ENTSOE_DE_DAM_Price));
  const dataset2 = filteredData.map(entry => parseFloat(entry.ENTSOE_GR_DAM_Price));
  const dataset3 = filteredData.map(entry => parseFloat(entry.ENTSOE_FR_DAM_Price));

  const chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [
              {
                  label: 'Price in Denmark',
                  data: dataset1,
                  borderColor: 'red',
                  fill: false
              },
              {
                  label: 'Price in Greece',
                  data: dataset2,
                  borderColor: 'blue',
                  fill: false
              },
              {
                  label: 'Price in France',
                  data: dataset3,
                  borderColor: 'green',
                  fill: false
              }
          ]
      },
      options: {
          responsive: true,
          elements: {
              line: {
                  tension: 0.5,
              },
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Date and Time'
                  },
              },
              y: {
                  title: {
                      display: true,
                      text: 'Price Fluctuation'
                  },
                  beginAtZero: true
              }
          }
      }
  });

  return () => {
      chart.destroy();
  };


  };

  
  return (
<div>
      <h2 className='header-container'>Line Chart</h2>
      <h3 className='header-container'>Demostrating price fluctuations throught dates and time</h3>
      <canvas id="myChart" className='chart-container'></canvas>
      <div className='search-container'>
        <label>Starting Date:</label>
        <input id='start' type='date' className='search-space' value={minDate} min={minDate} max={maxDate} onChange={(e) => setMinDate(e.target.value)} />
        <label className='search-space'>Ending Date:</label>
        <input id='end' type='date' className='search-space' value={maxDate} min={minDate} max={maxDate} onChange={(e) => setMaxDate(e.target.value)} />
        <button className='search-space' onClick={handleFilterClick}>Filter</button>
      </div>
    </div>
);

}
