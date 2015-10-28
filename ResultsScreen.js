'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet
} = React;

var ResultsScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          This is the results screen
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
    alignItems: 'center',
    backgroundColor: '#5AC8FA'
  },

  label: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#fff'
  }
});

module.exports = ResultsScreen;
