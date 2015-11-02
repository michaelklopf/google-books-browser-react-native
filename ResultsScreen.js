'use strict';

var React = require('react-native');
var BookDetails = require('./BookDetails');

var {
  Modal,
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
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
      showErrorModal: false,
      animated: true,
      transparent: false,
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
      .catch(error => {
        this.setState({
          showErrorModal: true
        });
      });
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
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.showErrorModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalBody}>
              A network error occurred!
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity onPress={this.goBack}>
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>
                    &lt; Go back
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>
                    &#8635; Retry
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

  showBookDetails: function(book) {
    this.props.navigator.push({
      title: book.volumeInfo.title,
      component: BookDetails,
      passProps: {book}
    });
  },

  goBack: function() {
    this.setState({
      showErrorModal: false
    });
    this.props.navigator.pop();
  },

  retry: function() {
    this.setState({
      showErrorModal: false
    });
    this.fetchResults();
  },

  renderBook: function(book) {
    return (
      <TouchableHighlight onPress={() =>
        this.showBookDetails(book)}>
        <View style={styles.row}>
          <Image
            style={styles.thumbnail}
            source={{uri: book.volumeInfo.imageLinks.smallThumbnail}}>
          </Image>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>
              {book.volumeInfo.title}
            </Text>
            <Text style={styles.subtitle}>
              {book.volumeInfo.subtitle}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Math.random() > 0.5 ? '#CC0066' : '#0099CC'
  },

  label: {
    fontSize: 24,
    fontWeight: 'normal',
    color: '#fff'
  },

  listView: {
    marginTop: 64
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5AC8FA',
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
  },

  rightContainer: {
    flex: 1
  },

  thumbnail: {
    width: 70,
    height: 108,
    marginRight: 16
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40
  },

  modalBody: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff'
  },

  modalButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 240
  },

  modalButton: {
    borderColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },

  modalButtonText: {
    fontSize: 18,
    color: '#ffffff'
  }
});

module.exports = ResultsScreen;
