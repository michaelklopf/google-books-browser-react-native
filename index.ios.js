/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  View,
  Text,
  StyleSheet,
} = React;

var GoogleBookBrowser = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          BookBrowser
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('GoogleBookBrowser', () => GoogleBookBrowser);
