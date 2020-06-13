import React, { Component } from 'react';

import {
  Container,
  Icon,
  Header,
  Left,
  Right,
  Thumbnail,
  Button,
} from 'native-base';
import fire from '../firebase';

let defaultPhotoURL =
  'https://firebasestorage.googleapis.com/v0/b/agrobloc-2ac86.appspot.com/o/robot-dev.png?alt=media&token=37b3a971-00db-4ae5-a0c9-f06479514774';

export default class extends React.PureComponent {
  state = { feeds: [], avatarUrl: defaultPhotoURL, downloadingAvatar: false };

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
    this.downloadAvatar();
    // this.getLastestFeed();
  }

  downloadAvatar = async () => {
    this.setState({ downloadingAvatar: true });
    let userData = fire.auth().currentUser;
    let uid = userData.uid;
    let userAvatarRef = fire.storage().ref(`profile-images/${uid}`);
    let defaultPathRef = fire.storage().ref('/robot-dev.png');

    userAvatarRef
      .getDownloadURL()
      .then(url => {
        this.setState({ avatarUrl: url, downloadingAvatar: false });
      })
      .catch(err => {
        defaultPathRef
          .getDownloadURL()
          .then(url => {
            this.setState({ avatarUrl: url, downloadingAvatar: false });
          })
          .catch(err => console.log(err));
      });
  };

  render() {
    return (
      <Container>
        <ImageBackground
          source={require('../assets/images/login-bg.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <Header style={{ backgroundColor: 'green' }}>
            <Left>
              <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                {this.state.downloadingAvatar ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Thumbnail
                    source={{ uri: this.state.avatarUrl }}
                    style={{ height: 50, width: 50 }}
                  />
                )}
              </TouchableOpacity>
            </Left>
            <Right>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('About')}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  About Us
                </Text>
              </Button>
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
                onPress={() => this.props.navigation.navigate('ChallengeList')}
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
                  height: 300,
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
