import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import FetchRecipee from '../MiddlePage/Graph/FetchRecipee';

const TestData = ({ data}) => {
  let time = []
  let temp = []
  let stillTime = []
  let pressure = []
  let delta =  []
  let deltaP =[]
  const [timeData, setTimeData] = useState([])
  const [stillTimeData, setStillTimeData] = useState([])
  const [deltaTemp, setDeltaTemp] = useState([])
  const [deltaPressure, setDeltaP] = useState([])
  const [tempData, setTempData] = useState([])
  const [pressureData, setPressureData] = useState([])
const totalDuration = 10000;
const delayBetweenPoints = totalDuration / data.length;

  
  useEffect(() => {
      var x, y, z;
      var randomTemp, randomPressure;
      let currTemp=25; let currPressure= 800; let currTime = 0;
    for (let index = 0; index < data.length; index++) {
      x = (data[index].temp1 - currTemp)/data[index].time1
      y = (data[index].pressure - currPressure)/data[index].time1
     
      for (let j = 0; j < data[index].time1 ; j++) {
          currTime++;
          currTemp = currTemp + x;
          randomTemp = currTemp + Math.floor(Math.random() * x)
          currPressure = currPressure + y
           randomPressure = currPressure+ Math.floor(Math.random() * y)
          time.push(currTime)
          temp.push(currTemp)
          pressure.push(currPressure)
          delta.push(randomTemp)
          deltaP.push(randomPressure)
          
      }

      for (let k = 0; k < data[index].time2; k++) {
          currTime++
          time.push(currTime)
          delta.push(randomTemp + Math.random() * x)
          deltaP.push (randomPressure + Math.random()*y)
          temp.push(currTemp)
          pressure.push(currPressure)
         
         
          
      }
    }
  setTimeData(time)
  setTempData(temp)
  setStillTimeData(stillTime)
  setPressureData(pressure)
  setDeltaP(deltaP)
  setDeltaTemp(delta)

  }, [])

  const dataTwo = {
  labels: timeData,
  datasets: [
    {
      yAxisID: "y-axis-0",
      label: 'Temprature',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'yellow',
      borderColor: 'yellow',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'yellow',
      pointBackgroundColor: 'yellow',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff7a00',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: tempData
    },
     {
       yAxisID: "y-axis-1",
       position: "right",
      label: 'Pressure',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'orange',
      borderColor: 'orange',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'orange',
      pointBackgroundColor: 'orange',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'orange',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: pressureData
    },
    {
      yAxisID: "y2",
      label: 'Expected Temp',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'green',
      borderColor: 'green',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'green',
      pointBackgroundColor: 'green',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'green',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: deltaTemp
    },
    {
      yAxisID: "y3",
      label: 'Expected Pressure',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'red',
      borderColor: 'red',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'red',
      pointHoverBorderColor: 'red',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: deltaPressure
    }
  
  ]
};
  
  const options =  {
     legend: {
       position: 'bottom',
        labels: {
                  fontColor: 'white'
         }
              },
    title: {
      display: true,
      text: "Graph Data for The respective Batch"
    },
    
    tooltips: {
      mode: 'label'
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    responsive: true,
    scales: {
     
      xAxes: [{
        display: true,
        stacked: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 10,
          animation: {
            duration: delayBetweenPoints,
            easing: 'linear'
          }
        }
        
      }],
       ticks: {
            major: {
              fontStyle: 'bold',
              fontColor: '#FF0000'
            }
          },
      yAxes: [{
        stacked: true,
        position: "left",
        id: "y-axis-0",
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 14
        },
      
         
      },
      {
        stacked: true,
        display: false,
        position: "left",
        id: "y2",
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 14
        },
      
         
      },
      {
        stacked: false,
        display: false,
        position: "right",
        id: "y3",
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 14
        },
      
         
      },
      {
        stacked: false,
        position: "right",
        id: "y-axis-1",
        fontColor: 'white',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          fontColor: 'white',
          fontSize: 14
        },
        
        
      }]
    } 
  }


    return (
        <Container
        style={{
          background: "black",
          color: "white",
         marginBottom: "20px"
        }}

        >
        <Line  data={dataTwo} options={options}/>
        {/* <Line  data={dataOne}/> */}
        {/* <FetchRecipee time={timeData} pressure={pressureData} temp={tempData}/> */}
        </Container>
    )
    
}

export default TestData
