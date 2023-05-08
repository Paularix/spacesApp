import React, {useContext} from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { Grid } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GlobalContext from "../../context/GlobalContext"


export const Error = () => {
    const {error} = useContext(GlobalContext)

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <Box sx={{
                        minWidth: 275,
                        width: 600,
                    }}>
                        <React.Fragment>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Error
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        Something went wrong
                                    </Typography>

                                    <Typography variant="body2">
                                        Message: {error}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </React.Fragment>
                    </Box>
                </Grid>
            </Grid>



        </div>
    )
}

export default Error