define(['react', 'reactDom','jsx!components/UserGist','jsx!components/SearchProduct', 'jsx!components/Timer'],
  function(React, ReactDOM, UserGist, SearchProduct, Timer) {

  var tabList = [
    { 'id': 1, 'name': 'Mike', 'url': '/mike' },
    { 'id': 2, 'name': 'Donnie', 'url': '/donnie' },
    { 'id': 3, 'name': 'Raph', 'url': '/raph' },
    { 'id': 4, 'name': 'Leo', 'url': '/leo' }
  ];

  var Tab = React.createClass({
    handleClick: function(e){
      e.preventDefault();
      this.props.handleClick();
    },

    render: function(){
      return (
        <li id={this.props.isCurrent ? 'selected' : null} className={this.props.isCurrent ? 'current' : null}>
          <a onClick={this.handleClick}>
            {this.props.name}
          </a>
        </li>
      );
    }
  });

  var Tabs = React.createClass({
    handleClick: function(tab){
      this.props.changeTab(tab);
    },

    render: function(){
      return (
        <nav id="nav">
          <ul>
            {this.props.tabList.map(function(tab) {
              return (
                <Tab
                  handleClick={this.handleClick.bind(this, tab)}
                  key={tab.id}
                  url={tab.url}
                  name={tab.name}
                  isCurrent={(this.props.currentTab === tab.id)}
                />
              );
            }.bind(this))}
          </ul>
        </nav>
      );
    }
  });


  var Content = React.createClass({
    componentDidMount: function(){

      if(this.props.currentTab === 1){
        SearchProduct = React.createFactory(SearchProduct);

        var PRODUCTS = [
          {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
          {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
          {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
          {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
          {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
          {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
        ];

        var CATEGORIES = [
          {category: ''},
          {category: 'Sporting Goods'},
          {category: 'Electronics'}
        ];

        var productDataUrl = "products.json"

        ReactDOM.render(
          SearchProduct({url: productDataUrl, categories:CATEGORIES}),
          //  new FilterableProductTable({products: PRODUCTS, categories: CATEGORIES}),
          document.getElementById('container2')
        );
      }
      if(this.props.currentTab === 2){
        UserGist = React.createFactory(UserGist);
        ReactDOM.render(
          UserGist({source:"https://api.github.com/users/octocat/gists"}),
          document.getElementById('container')
        )
      }
      else if(this.props.currentTab === 4){
        var start = new Date();
        Timer = React.createFactory(Timer);
        // Mount the JSX component in the app container
        ReactDOM.render(
          Timer({start: start}),
          document.getElementById('js-app-container'));
      }
    },
    componentDidUpdate: function(){

      if(this.props.currentTab === 1){
        SearchProduct = React.createFactory(SearchProduct);

        var PRODUCTS = [
          {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
          {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
          {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
          {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
          {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
          {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
        ];

        var CATEGORIES = [
          {category: ''},
          {category: 'Sporting Goods'},
          {category: 'Electronics'}
        ];

        var productDataUrl = "products.json"

        ReactDOM.render(
          SearchProduct({url: productDataUrl, categories:CATEGORIES}),
          //  new FilterableProductTable({products: PRODUCTS, categories: CATEGORIES}),
          document.getElementById('container2')
        );
      }
      if(this.props.currentTab === 2){
        UserGist = React.createFactory(UserGist);
        ReactDOM.render(
          UserGist({source:"https://api.github.com/users/octocat/gists"}),
          document.getElementById('container')
        )
      }
      else if(this.props.currentTab === 4){
        var start = new Date();
        Timer = React.createFactory(Timer);
        // Mount the JSX component in the app container
        ReactDOM.render(
          Timer({start: start}),
          document.getElementById('js-app-container'));
      }
    },
    render: function(){
      return(
        <div id="content" className="content">
          {this.props.currentTab === 1 ?
            <div id="container2">
            </div>
            :null}
          {this.props.currentTab === 2 ?
            <div id="container">
            </div>
            :null}
          {this.props.currentTab === 3 ?
            <div className="mike">
              <img src="" />FIRST
            </div>
            :null}
          {this.props.currentTab === 4 ?
            <div id="js-app-container">
            </div>
            :null}
        </div>
      );
    }
  });

  var Navigation = React.createClass({
    getInitialState: function () {
      return {
        tabList: tabList,
        currentTab: 1
      };
    },

    changeTab: function(tab) {
      this.setState({ currentTab: tab.id });
    },

    render: function(){
      return(
        <div>
          <Tabs
            currentTab={this.state.currentTab}
            tabList={this.state.tabList}
            changeTab={this.changeTab}
          />
          <Content currentTab={this.state.currentTab} />
        </div>
      );
    }
  });

  return Navigation;
});

