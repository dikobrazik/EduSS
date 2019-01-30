import React from 'react';
import {
  FlatList,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { url } from '../assets/store.js';
import {Icon, ListItem} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    const list = [
      {
        name: '1234',
      },
      {
        name: '0000',
      },
    ];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      list:list,
    };
  }
  
  static navigationOptions = {
    title: 'Header',
    headerStyle: {
      backgroundColor: '#6C6656cf'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    }
  };
  _getGroupsList = async () => {
    await fetch(url+'/session/create', {
      method: 'POST',
      headers: {
        'user-agent': 'mobile-app',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then((res)=>{
        if(res.status == 200){
          AsyncStorage.setItem('userToken', 'abc');
          this.props.navigation.navigate('Main');
        }
      })
      .catch((error)=>{
        console.log('There has been a problem with your fetch operation: ' + error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          {
            this.state.list.map((item, i)=>(
              <ListItem
                key={i}
                title={item.name}
                titleStyle={{fontSize:16, fontWeight:'500'}}
                chevronColor="white"
                onPress={()=>{
                  this.props.navigation.state.params.returnData(item.name);
                  this.props.navigation.goBack();
                }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD663',
  },
});