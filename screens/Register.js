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
import {
  ActivityIndicator,
  Dimensions,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import fire from '../firebase';

export default class Register extends Component {
  static navigationOptions = () => ({
    header: null,
  });
  state = {
    email: '',
    password: '',
    formLoading: false,
  };

  handleSignUp = () => {
    this.setState({ formLoading: true });
    const { email, password } = this.state;
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
    const { email, name, password, formLoading } = this.state;
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
              <Item floatingLabel>
                <Label style={{ color: 'white' }}>Name</Label>
                <Input
                  style={{ color: 'white' }}
                  keyboardType="email-address"
                  value={name}
                  onChangeText={name => this.setState({ name })}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: 'white' }}>Email</Label>
                <Input
                  style={{ color: 'white' }}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: 'white' }}>Password</Label>
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
                primary
                onPress={this.handleSignUp}
                style={{ marginVertical: 5, backgroundColor: 'green' }}
              >
                {formLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text>Sign Up</Text>
                )}
              </Button>

              <Button
                block
                primary
                onPress={() => this.props.navigation.navigate('Login')}
                style={{ backgroundColor: 'green' }}
              >
                <Text>Already have an account? Login</Text>
              </Button>
            </Form>
            
          </Content>
          <KeyboardSpacer />
        </ImageBackground>
      </Container>
    );
  }
}
