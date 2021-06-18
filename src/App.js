import LogIn from "./components/LogIn/LogIn"
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';
//import Sidebar from "./components/Sidebar/Sidebar";
import { Process, Reports } from "./Pages/Reports/Reports";
import './App.css'
import Machines from "./components/Machines/Machines";
import AddMachines from "./components/Machines/AddMachines";
import AddUser from "./components/AddUser/AddUser";
import CustomerListView from "./components/LogsData/Logs";
import Steps from "./Pages/Steps/Steps";
import AddContent from "./Pages/MachineContents/AddContent";
import AddSteps from "./Pages/Steps/AddSteps";
import BatchListView from './Pages/Reports/BatchData/Logs'
import MiddlePage from "./Pages/MiddlePage/MiddlePage";
import AppRoute from "./routes/AppRoute";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Users from "./components/AddUser/Users";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import ForgotPass from "./components/ForgotPass/ForgotPass";
import ContentsData from "./Pages/ContentsData/ContentsData";
import Page from "./components/Page";
import Tests from "./Pages/Tests/Tests";
import AccountDetails from "./components/Account/AccountDetails";
import NotFoundView from "./Pages/Error/NotFoundView";
import BatchInfo from "./Pages/BatchInfo/BatchInfo";
import RenderVc from "./components/VideoCall/RenderVc";
import DashboardLayout from './Demo/DashboardLayout'
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/index";
import GlobalStyles from "./components/GlobalStyles"; 

import Recipes from "./Pages/Recipee/Recipes";
import AddRecipe from "./Pages/Recipee/AddRecipe";
import RecipeeValuesView from "./Pages/Recipee/RecipeeValues/RecipeeValuesView";
import AddRecipeeValues from "./Pages/Recipee/RecipeeValues/AddRecipeeValues";
import JobsList from "./Pages/JobsData/JobsList";
import ModuleComponents from "./Pages/ContentsData/ComponentData/ModuleComponents";
import Manuals from "./Pages/Manuals/Manuals";
import AddManuals from "./Pages/Manuals/AddManuals";
import AddComponent from "./Pages/ContentsData/ComponentData/AddComponents";
import DQReport from "./Pages/DQReport/DQReport";
import BatchReport from "./Pages/BatchInfo/BatchInfo";
import QualityReport from './Pages/QualityReport/QualityReport'
import CallLogs from "./Pages/CallLogs/CallLogs";
import TestGraph from "./TestGraph/TestGraph";
import Settings from "./Pages/settings/Settings";
import OpenTokPage from "./Pages/VideoCallPage/OpenTokPage";
import RenderCall from "./Pages/VideoCallPage/RenderCall";
import { Paper } from "@material-ui/core";
import NewVideoCall from "./components/VideoCall/NewVideoCall";
import FileManagerView from "./Pages/FileManager/FileManagerView";
import AddFiles from "./Pages/FileManager/AddFiles";
import UserManual from "./Pages/user_manual/UserManual";
import WorkFlow from "./Pages/MiddlePage/WorkFlow";
import Whiteboard from "./components/Whiteboard/Whiteboard";
import ModelThreeD from "./components/3DModel/ModelThreeD";
import TestVideo from "./VideoCallModel/TestVideo";
import EntryPage from "./VideoCallModel/EntryPage";
import DQNew from "./Pages/DQNew/DQNew";
import DQContent from "./Pages/DQNew/DQContent";
import DQPurpose from "./Pages/DQPages/DQPurpose";
import DQGeneral from "./Pages/DQPages/DQGeneral";
import DQConfig from "./Pages/DQPages/DQConfig";

function App() {
 
  return (
    <>
 
      <GlobalStyles/>
    <AuthProvider>
      <Page
      title="Lyo Ims"
      >
        <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Router>
      <Switch>
         <Route path="/login" exact component={LogIn} />
        <AppRoute path='/machine-data/:id/Reports' exact component={Reports} layout={MainLayout}/>
         <AppRoute path='/machine-data/:id/Call-Logs' exact component={CallLogs} layout={MainLayout} />
        <AppRoute path='/machine-data/Reports/:id/Recipes' exact component={Recipes} layout={MainLayout} />
         <AppRoute path='/machine-data/Reports/:id/Add-Recipes' exact component={AddRecipe} layout={MainLayout} />
        <AppRoute path='/machine-data/reports/:id/process' exact component={Process} layout={MainLayout} />
         <AppRoute path='/Recipe/:id/Recipe-values' exact component={RecipeeValuesView} layout={MainLayout} />
         <AppRoute path='/Recipe/:id/Add-Recipee-Data' exact component={AddRecipeeValues} layout={MainLayout} />
        <AppRoute path='/machine-data/:id/Module' exact component={ContentsData} layout={MainLayout} />
        <AppRoute path="/machine-data/:id/Add-module" exact component={AddContent} layout={MainLayout}/>
        <AppRoute path="/machine-data" exact component={Machines} layout={DashboardLayout}/> 
        <AppRoute path="/settings" exact component={Settings} layout={DashboardLayout}/> 
        <AppRoute path="/add-machine" exact component={AddMachines} layout={DashboardLayout} />
        <Route path="/forgotPass" exact component={ForgotPass}/>
        <AppRoute path="/machine-data/Job/:id/Job" exact component={JobsList} layout={MainLayout} />
        <AppRoute path="/DQ/:id/content" exact component={DQContent} layout={MainLayout} />
         <AppRoute path="/DQ/:id" exact component={QualityReport} layout={MainLayout} />
         <AppRoute path="/Module/:id/Components" exact component={ModuleComponents} layout={MainLayout} />
        <AppRoute path="/users/add-user" exact component={AddUser} layout={DashboardLayout}/>
        <AppRoute path="/account" exact component={AccountDetails} layout={DashboardLayout}/> 
        <AppRoute path="/Manuals/:id/Steps" exact component={Steps} layout={MainLayout}/>
        <AppRoute path="/Manuals/:id/Add-Step" exact component={AddSteps} layout={MainLayout}/>
        <AppRoute path="/" exact component={MiddlePage} layout={DashboardLayout}/>
        <AppRoute path="/users" exact component={Users} layout={DashboardLayout}/>
        <AppRoute path="/machine-data/Batch/:id/Batch" exact component={BatchReport} layout={MainLayout}/>
        <AppRoute path="/machine-data/:id/Add-Manuals" exact component={AddManuals} layout={MainLayout} />
         <AppRoute path="/Module/:id/Add-Component" exact component={AddComponent} layout={MainLayout} />
        {/*/machine-data/Reports/BXLmS3MAwjf25qEdubL6/Recipes*/}
         <AppRoute path="/machine-data/Manuals/:id/Manuals" exact component={Manuals} layout={MainLayout} />
        <AppRoute path="/video-call" exact component={EntryPage} layout={DashboardLayout} />
        <Route path="/video-call/:id" exact component={EntryPage} layout={MainLayout} />
          <AppRoute path="/machine-data/DQ-Reports/:id/DQ-Reports" exact component={DQReport} layout={MainLayout} />
          <AppRoute path="/Manuals/:id/3D-Model" exact component={ModelThreeD} layout={MainLayout}/>
        <AppRoute path="/Add-files" exact component={AddFiles}  layout={DashboardLayout}/>
        <AppRoute path="/file-manager" exact component={FileManagerView}  layout={DashboardLayout}/>
        <AppRoute path="/user-manual" exact component={UserManual}  layout={DashboardLayout}/>
        <Route path='/whiteboard' exact component={Whiteboard} layout={MainLayout}/>
         <AppRoute path='/machine-data/:id/DQ-New' exact component={DQNew} layout={MainLayout} />
          <AppRoute path='/DQ/:id/Purpose' exact component={DQPurpose} layout={MainLayout} />
           <AppRoute path='/DQ/:id/General-Information' exact component={DQGeneral} layout={MainLayout} />
         <AppRoute path='/DQ/:id/Equipment-Config' exact component={DQConfig} layout={MainLayout} />
      </Switch>
    </Router>
    </BrowserRouter>
    </ThemeProvider>
    </Page>
    </AuthProvider>

    </>
    
  );
}

export default App;
