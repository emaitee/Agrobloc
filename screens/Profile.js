import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header } from 'native-base';

export default class extends React.PureComponent {
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../assets/images/login-bg.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <Header />
          <Content />
        </ImageBackground>
      </Container>
    );
  }
}
