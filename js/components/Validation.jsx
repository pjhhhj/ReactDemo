define(['react','classnames'], function(React, classNames) {

  var InputError = React.createClass({
    getInitialState: function() {
      return {
        message: 'Input is invalid'
      };
    },
    render: function(){
      var errorClass = classNames(this.props.className, {
        'error_container':   true,
        'visible':           this.props.visible,
        'invisible':         !this.props.visible
      });

      return (
        <div className={errorClass}>
          <span>{this.props.errorMessage}</span>
        </div>
      )
    }

  });

  var TextInput = React.createClass({
    getInitialState: function(){
      //most of these variables have to do with handling errors
      return {
        isEmpty: true,
        value: '',
        valid: false,
        errorMessage: "Input is invalid",
        errorVisible: false,
        required: true
      };
    },

    handleChange: function(event){
      //validate the field locally
      this.validation(event.target.value);

      //Call onChange method on the parent component for updating it's state
      //If saving this field for final form submission, it gets passed
      // up to the top component for sending to the server
      if(this.props.onChange) {
        this.props.onChange(event);
      }
    },

    validation: function (value, valid) {
      //The valid variable is optional, and true if not passed in:
      if (typeof valid === 'undefined') {
        valid = true;
      }

      var message = "";
      var errorVisible = false;

      //we know how to validate text fields based on information passed through props
      if (!valid) {
        //This happens when the user leaves the field, but it is not valid
        //(we do final validation in the parent component, then pass the result
        //here for display)
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      }
      else if (this.props.required && jQuery.isEmptyObject(value)) {
        //this happens when we have a required field with no text entered
        //in this case, we want the "emptyMessage" error message
        message = this.props.emptyMessage;
        valid = false;
        errorVisible = true;
      }
      else if (value.length < this.props.minCharacters) {
        //This happens when the text entered is not the required length,
        //in which case we show the regular error message
        message = this.props.errorMessage;
        valid = false;
        errorVisible = true;
      }

      //setting the state will update the display,
      //causing the error message to display if there is one.
      this.setState({
        value: value,
        isEmpty: jQuery.isEmptyObject(value),
        valid: valid,
        errorMessage: message,
        errorVisible: errorVisible
      });

    },

    render: function() {

      return (
        <div className={this.props.uniqueName}>
          <input
            placeholder={this.props.text}
            className={'input input-' + this.props.uniqueName}
            onChange={this.handleChange}
            //onBlur={this.handleBlur}
            value={this.state.value} />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage}
          />
        </div>
      );
    }
  });

  return TextInput;
});

