import React, { Component } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { ImagePicker, Permissions } from 'expo';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Text,
} from 'native-base';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import fire from '../firebase';

let defaultPhotoURL =
  'https://firebasestorage.googleapis.com/v0/b/agrobloc-2ac86.appspot.com/o/robot-dev.png?alt=media&token=37b3a971-00db-4ae5-a0c9-f06479514774';

export default class Register extends Component {
  static navigationOptions = () => ({
    header: null,
  });
  state = {
    name: '',
    email: '',
    password: '',
    avatarUrl: defaultPhotoURL,
    formLoading: false,
    address: '',
  };

  handleSignUp = () => {
    this.setState({ formLoading: true });
    const { name, email, password, avatarUrl, address } = this.state;
    if (!name.length) {
      this.setState({ formLoading: false });
      return alert('Please enter your full name');
    }
    if (!address.length) {
      this.setState({ formLoading: false });
      return alert('Please enter your address');
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const userProfile = fire.auth().currentUser;
        if (userProfile) {
          if (avatarUrl !== defaultPhotoURL) {
            this.uploadImage(avatarUrl, userProfile.uid);
          }

          userProfile
            .updateProfile({
              displayName: name,
            })
            .catch(err => console.log('cant update profile', err));

          fire
            .database()
            .ref('users')
            .child(userProfile.uid)
            .update({
              name,
              email,
              address
            })
            .then(() => {
              this.setState({ formLoading: false });
              this.props.navigation.navigate('App');
            });
        }
      })
      .catch(error => {
        this.setState({ formLoading: false });
        alert(error.message);
      });
  };

  uploadImage = async (uri, userId) => {
    this.setState({ uploadingImage: true });

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };

      xhr.onerror = function(err) {
        console.log(err);
        reject(new TypeError('Network request failed'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = fire
      .storage()
      .ref()
      .child(`profile-images/${userId}`);
    const snapshot = await ref.put(blob);

    blob.close();

    return snapshot.ref
      .getDownloadURL()
      .then(avatarUrl => this.setState({ avatarUrl, uploadingImage: false }))
      .catch(err => alert(err.toString()));
  };

  uploadProfileImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);

    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      // this.setState({ loading: true });
      // console.log(result)
      // uploadUrl = await uploadImageAsync(result.uri)
      this.setState({ avatarUrl: result.uri });
      // this.uploadImage(result.uri, userId);
    }
  };

  render() {
    const {
      email,
      name,
      password,
      formLoading,
      avatarUrl,
      address,
    } = this.state;
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
              margin: 5,
            }}
          >
            <ImageBackground
              source={{ uri: avatarUrl }}
              PlaceholderContent={<ActivityIndicator />}
              style={{
                width: 200,
                height: 200,
              }}
              imageStyle={{
                borderRadius: 100,
                borderWidth: 4,
                borderColor: 'green',
              }}
            >
              {this.state.uploadingImage ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ActivityIndicator size="large" />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => this.uploadProfileImage()}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(225,255,225,.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                    padding: 10,
                  }}
                >
                  <Icon
                    name="add-a-photo"
                    type="MaterialIcons"
                    style={{ color: 'white', fontSize: 40 }}
                  />
                </TouchableOpacity>
              )}
            </ImageBackground>
          </View>
          <Content padder>
            <Form style={{ marginVertical: 20 }}>
              <Item rounded last>
                <Label style={{ color: 'white' }}>Name:</Label>
                <Input
                  style={{ color: 'white' }}
                  value={name}
                  onChangeText={name => this.setState({ name })}
                />
              </Item>
              <Item rounded last style={{ marginTop: 5 }}>
                <Label style={{ color: 'white' }}>Email:</Label>
                <Input
                  style={{ color: 'white' }}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item rounded last style={{ marginTop: 5 }}>
                {/* <Label style={{ color: 'white' }}>Address:</Label> */}
                <Icon
                  name="location-on"
                  type="MaterialIcons"
                  style={{ color: 'green' }}
                />
                <Input
                  style={{ color: 'white' }}
                  value={address}
                  placeholder="Address"
                  placeholderTextColor="#aaa"
                  onChangeText={address => this.setState({ address })}
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
                rounded 
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
