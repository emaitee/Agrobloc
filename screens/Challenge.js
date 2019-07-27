import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
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
} from 'native-base';

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
  render() {
    const { question } = this.props.navigation.state.params;
    console.log(question);
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
                    <Text style={{ color: 'green' }}>4 Responses</Text>
                  </Button>
                </Left>

                <Right>
                  <Button transparent>
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
