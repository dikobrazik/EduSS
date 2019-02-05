import React from 'react';
import {
  AsyncStorage,
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  View, 
} from 'react-native';
import { url } from '../assets/store.js';
import { Hoshi } from 'react-native-textinput-effects';

export default class SignInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topPadding:Dimensions.get('window').height / 4, 
      width:Dimensions.get('window').width, 
    };
  }
  static navigationOptions = {
    title: 'Please sign in',
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  _keyboardDidShow = async () => {
    await this.setState({topPadding:this.state.topPadding-20});
  }

  _keyboardDidHide = async () => {
    this.setState({topPadding:this.state.topPadding+20});
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  render() {
    return (
      <View style={{alignSelf:'center', width:this.state.width - 40, paddingVertical:this.state.topPadding}}>
        <Hoshi
          label={'Login'}
          textContentType='username'
          returnKeyType='next'
          autoCapitalize = 'none'
          borderColor={'#0000cc'}
          onChangeText={(username) => this.setState({username:username})}
        />
        <Hoshi
          label={'Password'}
          textContentType='password'
          returnKeyType='send'
          secureTextEntry={true}
          borderColor={'#ff0066'}
          onChangeText={(password) => this.setState({password:password})}
        />
        <Button
          style={{ position:'absolute',marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN IN"
          onPress={() => {this._signInAsync()}}
        />
      </View>
    );
  }

  _signInAsync = async () => {
    await fetch('http://192.168.1.100:1337/session/create', {
      method: 'POST',
      headers: {
        'user-agent': 'mobile-app',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res)=>{
        if(res.status == 200){
          AsyncStorage.setItem('userToken', 'abc');
          this.props.navigation.navigate('Main');
        }
        return res.json()
      })
      .then(res => AsyncStorage.setItem('userId', res.id))
      .catch((error)=>{
        console.log('There has been a problem with your fetch operation: ' + error);
      });
  };
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput:{
    //flex:1,
    height:30,
    backgroundColor:'gray',
    justifyContent: 'center',
  },
});*/