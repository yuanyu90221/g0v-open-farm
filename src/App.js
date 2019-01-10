import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Content from "./components/Content";
import Vegetables from "./components/ItemsList";
import About from "./components/About";
import { observer } from "mobx-react";
import Garden from "./stores/store";
import {Helmet} from 'react-helmet';
// import DocumentMeta from "react-document-meta";
// set global store
const appStore = new Garden();
const Error = () => (
  <div>
    <h1>HTTP Error 404, Page not found</h1>
  </div>
);
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   title: appStore.title
  //   // };
  // }
  handleRoute = e => {
    this.currentUrl = e.url;
    // this.setState({title: appStore.title});
  };
  render() {
    console.log(appStore.title);
    // appStore.updateTitle('test');
    // const meta = {title:appStore.title};
    return (
      // <DocumentMeta {...meta}>
      
        <Router onChange={this.handleRoute}>
          <div>
            <Helmet>
              <title>{appStore.title}</title>
            </Helmet>
            <Switch>
              <Route path="/" render={props => <Home {...props} currentTitle={"Home"} store={appStore}/>} exact />
              <Route
                path="/category"
                render={props => <Category {...props} currentTitle={"Category"} store={appStore} />}
              />
              <Route path="/content" component={Content} />
              <Route
                path="/vegetables"
                render={props => <Vegetables {...props} currentTitle={"Vegetables"} store={appStore} />}
              />
              <Route path="/about" component={About} />
              <Route exact component={Error} />
            </Switch>
          </div>
        </Router>
    );
  }
}

App = observer(App);
export default App;
