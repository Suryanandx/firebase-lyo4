import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import FetchRecipee from "./FetchRecipee";
import { firebaseLooper } from "../utils/tools";
import { Button, Card, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import GraphSelect from "./GraphSelect";
import Chartjs from "chart.js";

const chartConfig = {
  type: "line",
  data: {
    labels: [],

    datasets: [
      {
          fill: 'false',
        label: "Temprature",
         yAxisID: "y-axis-0",
        data: [],
        borderWidth: 1,
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
      },
        {
       
          fill: 'false',
           yAxisID: "y-axis-1",
        label: "Pressure",
        data: [],
        lineTension: 0.1,
      backgroundColor: 'orangered',
      borderColor: 'orangered',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'orangered',
      pointBackgroundColor: 'orangered',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff7a00',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
        borderWidth: 1
      },
      {
       yAxisID: "y2",
      
      label: 'RealTime',
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
      data: []
    },
     

    ]
  },
  options: {
     legend: {
       position: 'bottom',
        labels: {
                  fontColor: 'white'
         }
              },
    title: {
      display: true,
      text: "Select/Change The Required to Showcase Data"
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
        stacked: false,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 15,
          fontColor: 'white',
          fontSize: 10,
          animation: {
            
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
        title: 'Temp Set Point',
        ticks: {
         
          steps: 10,
          max: 50,
          fontColor: 'white',
          fontSize: 14,
           min: -100
        },
      
         
      },
       {
        stacked: false,
        display: false,
        position: "left",
        id: "y2",
        title: 'Realtime',
        ticks: {
         
          steps: 10,
        max: 50,
          fontColor: 'white',
          fontSize: 14,
          min: -100
        },
      
         
      },
      {
        stacked: false,
        position: "right",
        id: "y-axis-1",
        fontColor: 'white',
        ticks: {
         steps: 100,
          
          fontColor: 'white',
          fontSize: 14
        },
        
        
      },
     ]
    } 
  }
};

const TestGraph = () => {
    const [recipes, setRecipes] = useState([])
    const [rid, setRid] = useState('')
    const [machines, setMachines] = useState([])
    const [rData, setRdata] = useState([])
     const [realData, setRealData] = useState([])
    const [batch, setBatch] = useState([])
     const [batchId, setBatchId] = useState([])

    const [mid, setMid] = useState('')
      let time = []
  let temp = []
  let stillTime = []
  let pressure = []
  let delta =  []
  let deltaP =[]
 
  const [stillTimeData, setStillTimeData] = useState([])
  const [deltaTemp, setDeltaTemp] = useState([])
  const [deltaPressure, setDeltaP] = useState([])
  const [tempData, setTempData] = useState([])
  const [pressureData, setPressureData] = useState([])
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    db.collection('machineData').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setMachines(data)
        })

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (time, newData, pressure) => {
      chartInstance.data.labels = time
    chartInstance.data.datasets[0].data = newData;
    chartInstance.data.datasets[1].data = pressure;
     chartInstance.data.datasets[2].data = realData;
    chartInstance.update();
  };

  const onButtonClick = (e) => {
      var x, y, z;
      var randomTemp, randomPressure;
      let currTemp=0; let currPressure= 800; let currTime = 0;
    for (let index = 0; index < rData.length; index++) {
      x = (rData[index].temp1 - currTemp)/rData[index].time1
      y = (rData[index].pressure - currPressure)/rData[index].time1
     
      for (let j = 0; j < rData[index].time1 ; j++) {
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

      for (let k = 0; k < rData[index].time2; k++) {
          currTime++
          time.push(currTime)
          delta.push(randomTemp + Math.random() * x)
          deltaP.push (randomPressure + Math.random()*y)
          temp.push(currTemp)
          pressure.push(currPressure)
         
         
     
      }
    }
 
  setTempData(temp)
  setStillTimeData(stillTime)
  setPressureData(pressure)
  setDeltaP(deltaP)
  setDeltaTemp(delta)

    
    updateDataset(time, temp, pressure);
  };
    
    function handleChange(e){
        setRid(e.target.value)
        const recipe_id = e.target.value
        db.collection('realtimeData').where('recipe_id', '==',`${recipe_id}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setBatch(data)
        })
       
       
    }
   
    function handleBatchChange(e){
        setBatchId(e.target.value)
        let batch_id = e.target.value

        db.collection('realtimeData').where('recipe_id','==', `${rid}`).where('time', '==', `${batch_id}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setRealData(data[0].temp_points)
    })
        db.collection('recipeeData').where('rid', '==', `${rid}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
             data.sort(function(a,b) {
                return(a.index-b.index)
            })
            setRdata(data)
          
        })
       
       
    }
    function handleSetChange(e){
        let mid = e.target.value
       db.collection('recipes').where('mid', '==',`${mid}`).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setRecipes(data)
        })
    }

  return (
      <Card >
          <Grid container spacing={3} style={{display: 'flex', justifyContent: 'space-evenly', marginLeft: '3%', marginBottom: '12px', marginTop: '5px'}} >
             
                  <Grid item  lg={3}
            sm={6}
            xl={3}
            xs={12} >
                 <FormControl className='form-select mt-1 block w-full'  fullWidth variant="outlined">
                 <InputLabel id="demo-simple-select-outlined-label">Select Machine</InputLabel>
                     <Select
                     label='Select Machine'
                     
                    onChange={handleSetChange} >
                           <MenuItem value="">
                          <em>None</em>
                         </MenuItem>
                    {
                        machines.map(data => (
                            <MenuItem value={data.id}>{data.title}</MenuItem>
                        ))
                    } 
                    </Select>
                    
                 </FormControl>
                    
                  </Grid>
                    
     
             
              <Grid item lg={3}
            sm={6}
            xl={3}
            xs={12} >
                  <FormControl className='form-select mt-1 block w-full'  fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Select Recipes</InputLabel>
                   <Select label="Select Recipes"  variant='outlined'  fullWidth onChange={handleChange} >
                       
                    {
                        recipes.map(data => (
                            <MenuItem value={data.id}>{data.title}</MenuItem>
                        ))
                    } 
                    </Select>
                  </FormControl>
                  
                  
                    
              </Grid>
              <Grid item lg={3}
            sm={6}
            xl={3}
            xs={12}>
                  <FormControl className='form-select mt-1 block w-full'  fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Select Batch</InputLabel>
                   <Select label='Select Batch'  fullWidth variant='outlined' onChange={(e) => {handleBatchChange(e) }}>
                      
                    {
                        batch.map(data => (
                            <MenuItem value={data.time}>{data.time}</MenuItem>
                        ))
                    } 
                    </Select>
                  </FormControl>
                  
                  
              </Grid>
              <Grid 
              item lg={3}
            sm={6}
            xl={3}
            xs={12}
              >
                <Button className=' mt-3 block ' onClick={onButtonClick} style={{backgroundColor: 'orange', color: 'white'}}>Show Graph</Button>
              </Grid>
              
          </Grid>
                    <Card style={{padding: '15px'}}>
                      <canvas style={{background: 'black'}} ref={chartContainer} />
                    </Card>
    
   
    </Card>
  );
}

export default TestGraph;