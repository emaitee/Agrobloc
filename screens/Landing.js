import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Container, Icon } from 'native-base';

export default class extends React.PureComponent {
  render() {
    return (
      <Container>
        <View style={{ margin: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ChallengeStack')}
            >
              <View
                style={{
                  padding: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'green',
                }}
              >
                <Icon
                  name="wechat"
                  type="FontAwesome"
                  style={{ fontSize: 60, color: 'green' }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  padding: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'green',
                }}
              >
                <Icon
                  name="wechat"
                  type="FontAwesome"
                  style={{ fontSize: 60, color: 'green' }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View
              style={{
                padding: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'green',
              }}
            >
              <Icon
                name="wechat"
                type="FontAwesome"
                style={{ fontSize: 60, color: 'green' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
