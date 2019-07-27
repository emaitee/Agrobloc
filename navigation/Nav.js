import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import LandingScreen from '../screens/Landing';
import ChallengeListScreen from '../screens/ChallengeList';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/Register';
import PostChallengeScreen from '../screens/PostChallenge';
import ChallengeScreen from '../screens/Challenge';
import LoadingScreen from '../screens/Loading';
import AboutScreen from '../screens/About'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const AppStack = createStackNavigator(
  {
    Landing: LandingScreen,
    About: AboutScreen,
    ChallengeList: ChallengeListScreen,
    PostChallenge: PostChallengeScreen,
    Challenge: ChallengeScreen,
    // Peer: PeerScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    //   RecoverPass: RecoverPassScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

const AppNav = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export default createAppContainer(AppNav);
