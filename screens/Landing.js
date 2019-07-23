import React, { Component } from 'react';
import { ActivityIndicator, View, Dimensions } from 'react-native';
import { Container, Icon } from 'native-base';

export default class extends React.PureComponent {
  render() {
    return (
      <Container>
        <View>
          <Icon name="wechat" type="FontAwesome" style={{ fontSize: 40 }} />
        </View>
      </Container>
    );
  }
}
