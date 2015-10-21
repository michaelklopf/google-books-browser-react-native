/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View
} = React;

var GoogleBookBrowser = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
});

AppRegistry.registerComponent('GoogleBookBrowser', () => GoogleBookBrowser);
