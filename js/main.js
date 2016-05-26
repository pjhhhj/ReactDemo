require.config({
  baseUrl: "js/",
  shim : {
    "bootstrap" : { "deps" :['jquery'] }
  },
  paths: {
    "jquery": "jquery",
    "react": "react",
    "reactDom": "react-dom",
    "JSXTransformer": "JSXTransformer",
    "classnames":"https://cdnjs.cloudflare.com/ajax/libs/classnames/2.1.5/index.min",
    "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min"
  },

  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  }
});

require(['jquery','react', 'reactDom', 'jsx!components/Navigation', 'bootstrap'],
  function($, React, ReactDOM, Navigation) {

    Navigation = React.createFactory(Navigation);



    ReactDOM.render(
      Navigation(),
      document.getElementById('navigation')
    );

    //ReactDOM.render(
    //  UserGist({source:"https://api.github.com/users/octocat/gists"}),
    //  document.getElementById('container')
    //);

  });
