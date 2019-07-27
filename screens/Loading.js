import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import fire from '../firebase';

export default class extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  componentDidMount() {
    // fire.auth().signOut();
    fire.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'green' }}>Loading</Text>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
