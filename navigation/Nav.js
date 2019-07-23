import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import ChallengeListScreen from '../screens/ChallengeList';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/Register';
import PostChallengeScreen from '../screens/PostChallenge';
import ChallengeScreen from '../screens/Challenge';
import LoadingScreen from '../screens/Loading';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ChallengeStack = createStackNavigator(
  {
    ChallengeList: ChallengeListScreen,
    PostChallenge: PostChallengeScreen,
    Challenge: ChallengeScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
)

const PeerStack = createStackNavigator(
  {
    ChallengeList: ChallengeListScreen,
    PostChallenge: PostChallengeScreen,
    Challenge: ChallengeScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
)

const AppStack = createStackNavigator(
  {
    ChallengeStack: ChallengeStack,
    // Peer: PeerStack,
    // Challenge: ChallengeScreen,
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
