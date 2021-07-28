import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AdminScreen from "./screens/AdminScreen";
function App() {
    return (
        <div className="App">
            <Navbar />
            <Router>
                <Switch>
                    <Route path="/cart">
                        <CartScreen />
                    </Route>
                    <Route path="/login">
                        <LoginScreen />
                    </Route>
                    <Route path="/register">
                        <RegisterScreen />
                    </Route>
                    <Route path="/orders">
                        <OrdersScreen />
                    </Route>
                    <Route path="/admin">
                        <AdminScreen />
                    </Route>
                    <Route path="/">
                        <HomeScreen />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
