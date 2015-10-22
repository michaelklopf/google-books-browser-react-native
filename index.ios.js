/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text
} = React;

var GoogleBookBrowser = React.createClass({
  render: function() {
    return (
      <View>
        <Text>
          BookBrowser
        </Text>
      </View>
    );
  }
});

AppRegistry.registerComponent('GoogleBookBrowser', () => GoogleBookBrowser);
