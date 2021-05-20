import CapturePictures from './components/CapturePictures'
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import CaseOverview from "./components/CaseOverview"
import UpdateProfile from "./components/UpdateProfile"
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword"
import Navigationbar from "./components/Navigationbar"
import PrivateRoute from './components/PrivateRoute'
import PoliceCase from './components/PoliceCase'
import PoliceDashboard from './components/PoliceDashboard'
import Evaluate from './components/Evaluate'
import Review from './components/Review'
import LearnMore from './components/LearnMore'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <Router>
      <AuthProvider>
      <Navigationbar />
        <div>              
          <Switch>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/login" component={Login} />
            <PrivateRoute exact path="/" component={CaseOverview} />
            <PrivateRoute path="/capture" component={CapturePictures} />
            <PrivateRoute path="/evaluate" component={Evaluate} />
            <PrivateRoute path="/police_case" component={PoliceCase} />
            <PrivateRoute path="/police" component={PoliceDashboard} />
            <PrivateRoute path="/review" component={Review} />
            <PrivateRoute path="/learn_more" component={LearnMore} />
          </Switch>
        </div>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

//       <CapturePictures />
// <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
// </Container>
 