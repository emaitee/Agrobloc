import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Fab,
  Card,
  CardItem,
} from 'native-base';
import avatar from '../assets/images/robot-dev.png';
import fire from '../firebase';

class QuestionItem extends React.Component {
  state = { avatarURL: '', downloadingAvatar: false };

  downloadAvatar = async () => {
    this.setState({ downloadingAvatar: true });
    const { item } = this.props;

    let uid = item.uid;
    // console.log('uid', uid)
    let userAvatarRef = fire.storage().ref(`/profile-images/${uid}`);
    let defaultPathRef = fire.storage().ref('/robot-dev.png');

    userAvatarRef
      .getDownloadURL()
      .then(url => {
        this.setState({ avatarUrl: url, downloadingAvatar: false });
      })
      .catch(err => {
        alert(err.toString())
        defaultPathRef
          .getDownloadURL()
          .then(url => {
            this.setState({ avatarUrl: url, downloadingAvatar: false });
          })
          .catch(err => console.log(err));
      });
  };

  componentDidMount() {
    this.downloadAvatar();
  }
  render() {
    const { item, navigation } = this.props;
    return (
      <ListItem
        thumbnail
        onPress={() => navigation.navigate('Challenge', { question: item })}
      >
        <Left>
          {this.state.avatarURL.length ? (
            <Thumbnail source={{ uri: this.state.avatarURL }} />
          ) : (
            <ActivityIndicator color="white" />
          )}
        </Left>
        <Body>
          <Text style={{color:'white'}}>{item.name}</Text>
          <Text note numberOfLines={1} style={{color:'white'}}>
            {item.description}
          </Text>
        </Body>
        <Right>
          <Button
          style={{borderColor:'white'}}
            bordered
            // success
            onPress={() => navigation.navigate('Challenge', { question: item })}
          >
            <Text style={{ color: 'white' }}>View</Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default class extends Component {
  state = {
    questions: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    fire
      .database()
      .ref('questions')
      .on('value', snapshot => {
        let exists = snapshot.val();
        if (exists !== null) {
          let questions = Object.values(exists);
          console.log(questions);
          this.setState({ questions, loading: false });
        } else {
          console.log('databbaase empty');
          this.setState({ loading: false });
        }
      });
  }
  render() {
    const { loading, questions } = this.state;
    const { navigation } = this.props;

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
          <Content>
            {loading ? (
              <View
                style={{
                  height: Dimensions.get('screen').height,
                  alignItems: 'center',
                  justifyConten: 'center',
                  marginTop: Dimensions.get('window').height / 4,
                }}
              >
                <ActivityIndicator size="large" style={{ color: 'green' }} />
              </View>
            ) : (
              <List>
                {questions.length ? (
                  questions.map(item => (
                    <QuestionItem
                      item={item}
                      navigation={navigation}
                      key={item.id}
                    />
                  ))
                ) : (
                  <Card style={{ marginVertical: 10 }}>
                    <CardItem>
                      <Body>
                        <Text>
                          No ongoing conversation, to start one, post a
                          challenge by pressing the plus button below.
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                )}
              </List>
            )}
          </Content>
          <Fab
            style={{ backgroundColor: 'green' }}
            position="bottomRight"
            onPress={() => navigation.navigate('PostChallenge')}
          >
            <Icon name="plus" type="FontAwesome" />
          </Fab>
        </ImageBackground>
      </Container>
    );
  }
}
