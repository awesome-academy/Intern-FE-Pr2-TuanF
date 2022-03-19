import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/index';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';
import Checkout from './features/Product/pages/Checkout';
import DetailPage from './features/Product/pages/DetailPage';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route path="/" component={ProductFeature} exact />
        <Route path="/products/:productId" component={DetailPage} />
        <Route path="/cart" component={CartFeature} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </div>
  );
}

export default App;
