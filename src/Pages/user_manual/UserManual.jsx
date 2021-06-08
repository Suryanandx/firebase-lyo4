import React from 'react'
import WorkFlow from '../MiddlePage/WorkFlow'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Typography } from '@material-ui/core';

const UserManual = () => {
    return (
        <div>
               <Typography variant='h1' align='center'><b>Authentication</b></Typography>
             <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
             
                <div>
                   <Typography>Enter your credentials to log into the application</Typography>
                <img loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Flogin.PNG?alt=media&token=2f0b7889-1218-444e-b304-71b0035d55df'/>
                </div>
                <div>
                   <Typography>reset password by entering your email, a link to reset password will be sent to your email</Typography>
                      <img  loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Freset-pass.PNG?alt=media&token=e7c49c28-abe4-464e-9f83-dd17e976e2c1'/>
                </div>
                <div>
                   <Typography>Admins can create a new user from Users --  Add New User</Typography>
                  <img  loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fcreate-user.PNG?alt=media&token=92ab25c8-a65e-4a5e-b472-fb7342891230'/>
                </div>
            </Carousel>
            <Typography variant='h1' align='center'><b>Dashboard</b></Typography>
             <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
             
                <div>
                   <Typography>After Logging in you'll be redirected to a page like this :</Typography>
                <img loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fdashboard.PNG?alt=media&token=b6c0be90-8320-4a22-8489-495357bbb0d5'/>
                </div>
                <div>
                   <Typography>Chatbot will be available for quick queries. </Typography>
                      <img  loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fchat-bot.PNG?alt=media&token=60338b20-e941-4ced-a478-1b0519f36c2d'/>
                </div>
                
            </Carousel>
            <Typography variant='h1' align='center'><b>ADD / UPDATE / DELETE</b></Typography>
             <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
             
                <div>
                  <Typography> Add any data by clicking on the "Add __" Button and filling in a form like the given.</Typography>
                <img loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fadd-content.PNG?alt=media&token=8d07d40b-5cad-4f7a-b1db-935820402506'/>
                </div>
                <div>
                   <Typography>Delete any data by clicking on "delete" icon available on any component which will give you a warning like this </Typography>
                      <img  loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fdel.PNG?alt=media&token=b3b38f8e-3645-4ef7-b21b-3541c4f9243e'/>
                </div>
                <div>
                   <Typography>Update any data by clicking the "Pen" icon available on any component and changing the necessary fields</Typography>
                  <img  loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fedit-content.PNG?alt=media&token=701f2d23-1875-491a-8556-bee3973f8c8d'/>
                </div>
            </Carousel>
            <Typography variant='h1' align='center'><b>Users</b></Typography>
             <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
             
                <div>
                   <Typography>From sidebar you have Users menu where "Admins" can change certain data of an authenticated user</Typography>
                <img loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fusers.PNG?alt=media&token=103a884a-57ca-4c8c-bbe1-9f47f0eb333a'/>
                </div>
                <div>
                   <Typography>Update any data by clicking the "Pen" icon available on any user's box and changing the necessary fields</Typography>
                      <img  loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fedit-user.PNG?alt=media&token=c159e23c-7fea-4991-9268-2a535170dfad'/>
                </div>
                <div>
                   <Typography>delete any authenticated user by clicking on the "delete" button</Typography>
                  <img  loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fdel-user.PNG?alt=media&token=58169005-a111-488a-ba8c-561b6a345e5f'/>
                </div>
            </Carousel>
            <Typography variant='h1' align='center'><b>Video Call</b></Typography>
             <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
             
                <div>
                <img loading='lazy' src='https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fvideo-call.PNG?alt=media&token=93931012-2f75-40cc-986b-ecef5625a47d'/>
                </div>
                <div>
                      <img  loading='lazy' src='https://instapage.com/wp-content/uploads/2018/06/ad-banner-microsoft.jpg'/>
                </div>
                <div>
                  <img  loading='lazy' src='http://barbaraelmoredesigns.com/wp-content/uploads/2020/11/banners-ads-do-they-really-work-1.jpg'/>
                </div>
            </Carousel>
        </div>
    )
}

export default UserManual
