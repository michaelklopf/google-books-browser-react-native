'use strict';

var React = require('react-native');

var {
  View,
  ListView,
  Text,
  StyleSheet
} = React;

var buildUrl = function(q) {
  return 'https://www.googleapis.com/books/v1/volumes?q='
    + encodeURIComponent(q)
    + '&langRestrict=en&maxResults=30';
};

var ResultsScreen = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  },

  componentDidMount: function() {
    this.fetchResults(this.props.searchPhrase);
  },

  fetchResults: function(searchPhrase) {
    fetch(buildUrl(searchPhrase))
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(jsonData.items)
        });
        console.dir(jsonData.items);
      })
      .catch(error => console.dir(error));
  },

  render: function() {
    if (this.state.isLoading) {
      return this.renderLoadingMessage();
    } else {
      return this.renderResults();
    }
  },

  renderLoadingMessage: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Searching for "{this.props.searchPhrase}".
        </Text>
        <Text style={styles.label}>
          Please wait...
        </Text>
      </View>
    );
  },

  renderResults: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBook}
        style={styles.listView}
      />
    );
  },

  renderBook: function(book) {
    return (
      <View style={styles.row}>
        <Text style={styles.title}>
          {book.volumeInfo.title}
        </Text>
        <Text style={styles.subtitle}>
          {book.volumeInfo.subtitle}
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
  },

  listView: {

  },

  row: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5AC8FA',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 1
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },

  subtitle: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  }
});

module.exports = ResultsScreen;
