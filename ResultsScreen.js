'use strict';

var React = require('react-native');

var {
  View,
  Text,
  StyleSheet
} = React;

var buildUrl = function(q) {
  return 'https://www.googleapis.com/books/v1/volumes?q='
    + encodeURIComponent(q)
    + '&langRestrict=en&maxResults=30';
};

var ResultsScreen = React.createClass({
  componentDidMount: function() {
    this.fetchResults(this.props.searchPhrase);
  },

  fetchResults: function(searchPhrase) {
    fetch(buildUrl(searchPhrase))
      .then(response => response.json())
      .then(jsonData => console.dir(jsonData))
      .catch(error => console.dir(error));
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          This is the results screen
        </Text>
        <Text style={styles.label}>
          You searched for: {this.props.searchPhrase}
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
