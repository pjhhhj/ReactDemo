define(['react','jsx!components/Validation'], function(React, TextInput) {

  var ProductCategoryRow = React.createClass({
    render: function() {
      return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
  });

  var ProductRow = React.createClass({
    render: function() {
      var name = this.props.product.stocked ?
        this.props.product.name :
      <span style={{color: 'red'}}>
      {this.props.product.name}
      </span>;
      return (
        <tr>
        <td className="productRow">{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
      );
    }
  });

  var ProductTable = React.createClass({
    render: function() {
      var rows = [];
      var lastCategory = null;
      this.props.products.forEach(function(product, index) {

        if (product.category.indexOf(this.props.filterCategory) === -1) {
          return;
        }

        if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
          return;
        }


        if (product.category !== lastCategory) {
          rows.push(<ProductCategoryRow key={index} category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
      }.bind(this));
      return (
        <table>
        <thead>
        <tr>
        <th>Name</th>
        <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
      );
    }
  });

  var SearchBar = React.createClass({
    handleChange: function() {
      this.props.onUserInput(this.refs.filterTextInput.value, this.refs.inStockOnlyInput.checked, '');
    },
    render: function() {
      return (
        <form>
        <input
      type="text"
      placeholder="Search..."
      value={this.props.filterText}
      ref="filterTextInput"
      onChange={this.handleChange}
      />
      <p>
      <input
      type="checkbox"
      checked={this.props.inStockOnly}
      ref="inStockOnlyInput"
      onChange={this.handleChange}
      />
      {' '}
      Only show products in stock
      </p>
      </form>
      );
    }
  });

  var FilterableProductTable = React.createClass({
    loadProductDataFromServer: function(){
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({productData: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    getInitialState: function(){
      return({
        filterText: '',
        inStockOnly: false,
        filterCategory: '',
        productData: []
      });
    },
    componentDidMount: function() {
      this.loadProductDataFromServer();
      //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleUserInput: function(filterText, inStockOnly, filterCategory){
      this.setState({
        filterText: filterText,
        inStockOnly: inStockOnly,
        filterCategory: filterCategory
      });
    },
    render: function() {
      return (
        <div>
          <SearchBarDropDown
            categories={this.props.categories}
            onUserInput={this.handleUserInput}
          />
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onUserInput={this.handleUserInput}
          />
          <ProductTable
            products={this.state.productData}
            filterText={this.state.filterText}
            filterCategory={this.state.filterCategory}
            inStockOnly={this.state.inStockOnly}
          />
          <TextInput
            text="Your Name"
            minCharacters={5}
            errorMessage="Name is invalid"
            emptyMessage="Name is required"
            required={true}
          />
        </div>
      );
    }
  });

  var SearchBarDropDown = React.createClass({
    handleChange: function(){
      this.props.onUserInput('', false, this.refs.filterCategoryInput.value);
    },
    render: function(){
      var options = [];
      this.props.categories.forEach(function(category, index) {
        options.push(<option className="option" key={index} value={category.category}>{category.category}</option>);
      }.bind(this));

      return (
        <select className="select" onChange={this.handleChange}
      value={this.props.filterText}
      ref="filterCategoryInput"
        >
        {options}
        </select>
      );


    }
  });

  return FilterableProductTable;
});

