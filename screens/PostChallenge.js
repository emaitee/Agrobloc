import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
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
    name: '',
    address: '',
    description: '',
    formLoading: false,
  };

  onSubmitForm = () => {
    this.setState({ formLoading: true });
    const { name, description, address } = this.state;
    let time = new Date();
    const data = { name, description, address, time };
    console.log(data);

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
  };

  render() {
    const { formLoading } = this.state;
    return (
      <Container>
        <Header style={{backgroundColor:'green'}}>
          <Left>
            <Icon name="md-arrow-back" type="Ionicons" style={{ color: 'white' }} onPress={() => this.props.navigation.goBack()} />
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>Agricultural Custodian</Text>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Item regular style={{ marginVertical: 5 }}>
              <Input
                placeholder="Name"
                onChangeText={name => this.setState({ name })}
              />
            </Item>
            <Item regular>
              <Input
                placeholder="Address"
                onChangeText={address => this.setState({ address })}
              />
            </Item>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Description"
              onChangeText={description => this.setState({ description })}
            />
          </Form>
          <Button
            full
            style={{ marginVertical: 10, backgroundColor:'green' }}
            onPress={this.onSubmitForm}
          >
            {formLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text> Post Challenge </Text>
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}
