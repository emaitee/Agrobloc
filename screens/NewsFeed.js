import React, { Component } from 'react';
import { ActivityIndicator, View, Dimensions, ImageBackground } from 'react-native';
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
} from 'native-base';
import fire from '../firebase';

const QuestionItem = ({ item, navigation }) => (
  <ListItem
    thumbnail
    onPress={() => navigation.navigate('Challenge', { question: item })}
  >
    <Left>
      <Thumbnail source={require('../assets/images/robot-dev.png')} />
    </Left>
    <Body>
      <Text>{item.name}</Text>
      <Text note numberOfLines={1}> 
        {item.description}
      </Text>
    </Body>
    <Right>
      <Button
        bordered
        success
        onPress={() => navigation.navigate('Challenge', { question: item })}
      >
        <Text style={{ color: 'green' }}>View</Text>
      </Button>
    </Right>
  </ListItem>
);

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
              }}
            >
              <ActivityIndicator size="large" style={{ color: 'green' }} />
            </View>
          ) : (
            <List>
              {questions.map(item => (
                <QuestionItem
                  item={item}
                  navigation={navigation}
                  key={item.id}
                />
              ))}
            </List>
          )}
        </Content>
        <Fab
          style={{ backgroundColor: 'green' }}
          position="bottomRight"
          onPress={() => navigation.navigate('PostChallenge')}
        >
          <Icon name="plus" type="FontAwesome" />
        </Fab></ImageBackground>
      </Container>
    );
  }
}
