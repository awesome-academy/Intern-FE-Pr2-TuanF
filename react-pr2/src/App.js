import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/index';
import ProductFeature from './features/Product';
import DetailPage from './features/Product/pages/DetailPage';
import CartFeature from './features/Cart';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Route path="/" component={ProductFeature} exact />
        <Route path="/products/:productId" component={DetailPage} />
        <Route path="/cart" component={CartFeature} />
      </Switch>
    </div>
  );
}

export default App;
