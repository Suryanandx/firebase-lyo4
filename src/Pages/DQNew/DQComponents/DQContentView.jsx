import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Card, makeStyles } from "@material-ui/core"

import Paper from '@material-ui/core/Paper';
import { useEffect } from "react";
import { db } from "../../../firebase";
const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },

  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
    padding: '20px',
 
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
    table: {
    minWidth: 650,
  },
}));

function DQContentView({content}) {
	const classes = useStyles()
	

	return (
		<>
		<div >
        <div >
          <Card >
		<section class="text-blueGray-700 ">
			<div class="container flex flex-col items-center px-5 py-8 mx-auto">
			<div class="flex flex-col w-full mb-12 text-left ">
				<div class="w-full mx-auto lg:w-1/2">
					 <div style={{display: 'flex' , justifyContent: 'space-evenly'}}>
                    {content.title && <h1 class="mx-auto mb-12 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font">  <b>{" -"} {" "} {content.title}</b> </h1>}
                <Button>Edit</Button>
                <Button>Delete</Button>
              </div>
				
				<h2 class="mx-auto mb-4 text-xl font-semibold leading-none tracking-tighter text-black title-font"> {content.desc} </h2>
				<p class="mx-auto text-base font-medium leading-relaxed text-blueGray-700 ">  </p>
				</div>
			</div>
			{
				content.specifications && (
					<>
					<TableContainer component={Paper}>
		<Table className={classes.table} aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell align="right"><b className='text-lg font-bold italic'>Review / Comment</b></TableCell>
			
			</TableRow>
			</TableHead>
					{
						content.specifications.map(data => (

							<>
								
			<TableBody>
			
			<TableRow key={data}>
			<TableCell component="th" scope="row">
				{data}
			</TableCell>
			<TableCell align="right"></TableCell>
			
			</TableRow>
		
			</TableBody>
					</>
						))
					}
					
		</Table>
		</TableContainer>
					</>
				)
			}

			{
			
			}
			</div>
			</section>
          </Card>
        </div>
      </div> 
		
        

		</>
	)
}

export default DQContentView
