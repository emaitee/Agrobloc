import React, { Component } from 'react';
import { ImageBackground, Modal, View, TouchableHighlight } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Right,
  Left,
  Button,
  Icon,
  Form,
  Textarea,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Response = () => (
  <Card>
    <CardItem>
      <Body>
        <Text>
          NativeBase is a free and open source framework that enable developers
          to build high-quality mobile apps using React Native iOS and Android
          apps with a fusion of ES6.
        </Text>
      </Body>
    </CardItem>
    <CardItem>
      <Left>
        <Button transparent>
          <Icon active name="thumbs-up" />
          <Text>12 votes</Text>
        </Button>
      </Left>

      <Right>
        <Text>11h ago</Text>
      </Right>
    </CardItem>
  </Card>
);

const NewResponse = ({ modalVisible, setModalVisible }) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={modalVisible}
    transparent
    onRequestClose={() => {
      alert('Modal has been closed.');
    }}
  >
    <View
      style={{
        marginHorizontal: 22,
        marginVertical: 100,
        backgroundColor: 'white',
      }}
    >
      <View>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Icon name="close" type="EvilIcons" />
          </TouchableOpacity>
        </View>

        <Form>
          <Textarea rowSpan={5} bordered placeholder="Your response" />
        </Form>

        <Button success
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  </Modal>
);

export default class CardItemButton extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { question } = this.props.navigation.state.params;
    const { modalVisible } = this.state;

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
            <NewResponse
              modalVisible={modalVisible}
              setModalVisible={this.setModalVisible}
            />
            <Body>
              <Text style={{ color: 'white' }}>Respond to Challenge</Text>
            </Body>
          </Header>
          <Content padder>
            <Card>
              <CardItem header>
                <Text>{question.name}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{question.description}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon
                      style={{ color: 'green' }}
                      active
                      name="chatbubbles"
                    />
                    <Text style={{ color: 'green' }}>{`${
                      question.response ? question.responses.length : 0
                    } Responses`}</Text>
                  </Button>
                </Left>

                <Right>
                  <Button
                    transparent
                    onPress={() => this.setModalVisible(true)}
                  >
                    <Icon
                      style={{ color: 'green' }}
                      active
                      name="chat-bubble"
                      type="MaterialIcons"
                    />
                    <Text style={{ color: 'green' }}>Respond Now</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
            <Text>Responses</Text>
            <Response />
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
