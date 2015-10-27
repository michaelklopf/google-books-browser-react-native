/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchScreen = require('./SearchScreen');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var GoogleBookBrowser = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        initialRoute = {{
          component: SearchScreen,
          title: 'Search'
        }}
        style={styles.navContainer}
      />
    )
  }
});

// reminder: Each JSX element needs to be styled directly
var styles = StyleSheet.create({
  navContainer: {
    flex: 1
  }
});

AppRegistry.registerComponent('GoogleBookBrowser', () => GoogleBookBrowser);
