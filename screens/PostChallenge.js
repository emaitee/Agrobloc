import React, { Component } from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';
import {
  Container,
  Header,
  Content,
  Textarea,
  Form,
  Item,
  Input,
  Right,
  Left,
  Button,
  Text,
  Body,
  Icon,
} from 'native-base';
import fire from '../firebase';

export default class extends Component {
  state = {
    description: '',
    formLoading: false,
  };

  onSubmitForm = () => {
    this.setState({ formLoading: true });
    const { name, description, address } = this.state;
    let time = new Date();
    const { uid, displayName } = fire.auth().currentUser;
    // console.log(`uid: ${uid}, displayName: ${displayName}, photoURL: ${photoURL}`);
    fire
      .database()
      .ref('users')
      .child(uid)
      .once('value', snap => {
        const userProfile = snap.val();

        if (userProfile) {
          const data = {
            uid,
            name: displayName,
            description,
            address: userProfile.address,
            time,
          };
          
          fire
            .database()
            .ref('questions')
            .push(data)
            .then(() => {
              this.setState({
                name: '',
                address: '',
                description: '',
                formLoading: false,
              });
              this.props.navigation.navigate('Home');
              alert('Challenge Submitted!');
            })
            .catch(err => alert(err.message));
        }
      });
  };

  render() {
    const { formLoading } = this.state;
    return (
      <Container>
        <ImageBackground
          source={require('../assets/images/login-bg.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <Header style={{ backgroundColor: 'green' }}>
            <Left>
              <Icon
                name="md-arrow-back"
                type="Ionicons"
                style={{ color: 'white' }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Left>
            <Body>
              <Text style={{ color: 'white' }}>Agricultural Custodian</Text>
            </Body>
          </Header>
          <Content padder>
            <Form>
            
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Description"
                placeholderTextColor="white"
                onChangeText={description => this.setState({ description })}
                style={{ color: 'white' }}
              />
            </Form>
            <Button
              full
              style={{ marginVertical: 10, backgroundColor: 'green' }}
              onPress={this.onSubmitForm}
            >
              {formLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text> Post Challenge </Text>
              )}
            </Button>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
