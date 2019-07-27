import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  H1,
  Text,
} from 'native-base';
import { ActivityIndicator, Image, View, ImageBackground } from 'react-native';
import fire from '../firebase';

export default class Login extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    email: '',
    password: '',
    formLoading: false,
  };

  handleLogin = () => {
    this.setState({ formLoading: true });
    const { email, password } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ formLoading: false });
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        this.setState({ formLoading: false });
        alert(error.message);
      });
  };

  render() {
    const { email, password, formLoading } = this.state;
    return (
      <Container>
        <ImageBackground
          source={require('../assets/images/login-bg.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../assets/images/Agro-bloc.png')}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <Content padder>
            <Form style={{ marginVertical: 20 }}>
              <Item rounded last>
                <Label style={{ color: 'white' }}>Email:</Label>
                <Input
                  keyboardType="email-address"
                  style={{ color: 'white' }}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                />
              </Item>
              <Item rounded last style={{ marginVertical: 5 }}>
                <Label style={{ color: 'white' }}>Password:</Label>
                <Input
                  style={{ color: 'white' }}
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry
                  autoCapitalize="none"
                  value={password}
                />
              </Item>
              <Button
                block
                rounded
                primary
                onPress={this.handleLogin}
                style={{ marginVertical: 5, backgroundColor: 'green' }}
              >
                {formLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text>Login</Text>
                )}
              </Button>

              <Button
                block
                primary
                rounded
                onPress={() => this.props.navigation.navigate('SignUp')}
                style={{ backgroundColor: 'green' }}
              >
                <Text>Sign Up</Text>
              </Button>
            </Form>
          </Content>
          <KeyboardSpacer />
        </ImageBackground>
      </Container>
    );
  }
}
