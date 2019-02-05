import React from 'react';
import {
  AsyncStorage,
  FlatList,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
//import { url } from '../assets/store.js';
import { Icon, ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      list:[],
    };
    this._getGroupsList();
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
    let id = await AsyncStorage.getItem('userId');
    axios
    .get('http://192.168.1.100:1337/edu/groups', {params:{id:id}})
    .then(response => {this.setState({list:response.data})});
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