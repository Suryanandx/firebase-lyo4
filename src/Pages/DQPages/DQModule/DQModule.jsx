import { Button, Typography } from "@material-ui/core"

function DQModule({module, match}) {
	return (
		<div style={{marginTop: '20px'}}>
			<div style={{display: 'flex', justifyContent: 'space-evenly'}}>
					<Typography variant='h6' align='left'>
						<b>{module.title}</b>
						
					</Typography>
					<Typography variant='body1' align='left'>
						<p className='italic'>{module.desc}</p>
					</Typography>
					<div>
						<Button>
							Edit
						</Button>
						<Button>
							delete
						</Button>
						<Button>
							Components
						</Button>
					</div>
				</div>
		</div>
	)
}

export default DQModule
