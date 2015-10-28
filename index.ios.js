/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var SearchScreen = require('./SearchScreen');

var GoogleBookBrowser = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        initialRoute = {{
          component: SearchScreen,
          title: 'Search',
          passProps: { placeholder: 'e.g. Music or JavaScript' }
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
