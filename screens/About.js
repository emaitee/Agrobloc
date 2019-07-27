import React, { Component } from 'react';
import { ImageBackground, Linking } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Icon,
  Left,
  Right,
} from 'native-base';

export default class CardHeaderFooterExample extends Component {
  render() {
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
            <Body />
            <Right />
          </Header>
          <Content>
            <Card>
              <CardItem header>
                <Text>Agrobloc</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Agrobloc is an Agricultural Custodian Economy for farmers
                    and the society. Agrobloc is the world No.1 platform that
                    connects rural farmers without internet connection or
                    smartphone, with formal extension farmers and the society
                    for knowledge sharing, agribusinesses and peer-to-peer
                    borrowing and lending of farm inputs. Agroblockchain
                    technology enables evidential traceability between the users
                    and their peer-to-peer relationship.
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text
                  onPress={() =>
                    Linking.openURL('https://agrobloc.farm').catch(err =>
                      alert('An error occurred', err)
                    )
                  }
                >
                  Visit our website: https://agrobloc.farm
                </Text>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
