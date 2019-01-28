import React from 'react';
import {
    AsyncStorage,
    Button,
    View,
    StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return(
        <View style={styles.container}>
            <Button title="Exit!" onPress={this._signOutAsync} />
        </View>
    );
  }
  _signOutAsync = async () => {
        await AsyncStorage.setItem('userToken','');
        this.props.navigation.navigate('Auth');
  };
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ededf8',
    }
});
export default withNavigation(SettingsScreen);