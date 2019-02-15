import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';

import {Avatar, Icon, ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
    let url = await AsyncStorage.getItem('url') + '/edu/groups';
    axios
    .get(url, {params:{id:id}})
    .then(response => this.setState({list:response.data}));
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {
            this.state.list.map((item, i)=>(
              <ListItem
                key={i}
                containerStyle={{borderBottomWidth:1, borderBottomColor:'#FFDa66'}}
                leftAvatar={<Avatar rounded icon={{ name:'torsos-all', type:'foundation' }}/>}
                title={item.gNum}
                titleStyle={{fontSize:18, fontWeight:'700'}}
                rightTitle={'Номер пары: '+(Number(item.number)+1)}
                rightTitleStyle={{color:'#444', width:150}}
                chevron
                chevronColor="white"
                onPress={()=>{
                  this.props.navigation.state.params.returnData(item.gNum);
                  AsyncStorage.setItem('subjId', item.id)
                  AsyncStorage.setItem('groupNumber', item.gNum)
                  this.props.navigation.goBack();
                }}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD663',
    //backgroundColor: '#FFF',
  },
});