import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import { Container, Icon, Header, Left, Right, Thumbnail } from 'native-base';
import fire from '../firebase';

export default class extends React.PureComponent {
  state = { feeds: [] };

  getLastestFeed = () => {
    fire
      .database()
      .ref('questions')
      .limitToLast(4)
      .on('value', snap => {
        const exists = snap.val();
        if (exists !== null) {
          console.log(Object.values(exists));
        } else {
          console.log('nothing to show');
        }
      });
  };

  componentDidMount() {
    this.getLastestFeed();
  }
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../assets/images/login-bg.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <Header style={{ backgroundColor: 'green' }}>
            <Left>
              <TouchableOpacity>
                <Thumbnail
                  source={require('../assets/images/robot-dev.png')}
                  style={{ height: 50, width: 50 }}
                />
              </TouchableOpacity>
            </Left>
            <Right>
              <Text style={{ color: 'white' }}>About Us</Text>
            </Right>
          </Header>
          <View
            style={{
              margin: 10,
              marginTop: Dimensions.get('screen').height / 10,
            }}
          >
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={{ width: '48%' }}
                onPress={() => this.props.navigation.navigate('ChallengeStack')}
              >
                <View
                  style={{
                    backgroundColor: 'lightgreen',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 120,
                  }}
                >
                  <Icon
                    name="wechat"
                    type="FontAwesome"
                    style={{ fontSize: 60, color: 'green' }}
                  />
                  <Text style={{ textAlign: 'center' }}>
                    Agro Challenges & Response
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '48%' }}>
                <View
                  style={{
                    backgroundColor: 'lightgreen',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'green',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 120,
                  }}
                >
                  <Image
                    source={require('../assets/images/p2p.png')}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text style={{ textAlign: 'center' }}>
                    P2P Borrowers and Lender
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginVertical: 10 }}>
              <View
                style={{
                  padding: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 240,
                  width: '100%',
                }}
              >
                <Text style={{ color: 'white' }}>News Feed</Text>
                <View />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
