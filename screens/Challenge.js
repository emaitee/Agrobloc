import React, { Component } from 'react';
import { ImageBackground, View, Dimensions } from 'react-native';
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
import Modal from 'react-native-modal';
import fire from '../firebase';

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

export default class CardItemButton extends Component {
  state = {
    isModalVisible: false,
    responses: [],
    response: '',
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  fetchResponses = () => {
    const { question } = this.props.navigation.state.params;
    // console.log(question)
    fire
      .database()
      .ref('questions')
      .child(question.uid)
      .on('value', snap => {
        const exist = snap.val();
        if (exist !== null) {
          console.log(exist);
          this.setState({ responses: Object.values(exist) });
        } else {
          console.log('nothing');
        }
      });
  };

  componentDidMount() {
    this.fetchResponses();
  }

  submitResponse = () => {};

  render() {
    const { question } = this.props.navigation.state.params;
    const { isModalVisible } = this.state;
    const { toggleModal } = this;
    const { height, width } = Dimensions.get('screen');

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
                  <Button transparent onPress={this.toggleModal}>
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
            <Text style={{ color: 'white' }}>Responses</Text>
            <Response />
            <Modal
              isVisible={isModalVisible}
              deviceHeight={height}
              deviceWidth={width}
              onBackdropPress={() => toggleModal()}
              onSwipeComplete={() => toggleModal()}
              swipeDirection="left"
              style={{ margin: 0 }}
            >
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                  marginVertical: 200,
                  backgroundColor: 'white',
                  padding: 10,
                  paddingVertical:20,
                  justifyContent: 'center',
                }}
              >
                <View style={{ justifyContent: 'flex-end', flexDirection:'row' }}>
                  <TouchableOpacity onPress={this.toggleModal}>
                    <View>
                      <Icon name="close" type="EvilIcons" color="black" />
                    </View>
                  </TouchableOpacity>
                </View>

                <Form>
                  <Textarea rowSpan={5} bordered placeholder="Your response" />
                </Form>

                <Button
                  success
                  onPress={this.toggleModal}
                  full
                  style={{ marginVertical: 5 }}
                >
                  <Text>Submit</Text>
                </Button>
              </View>
            </Modal>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
