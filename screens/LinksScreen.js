import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Avatar, Icon, ListItem, CheckBox } from 'react-native-elements';
import { GroupItem } from '../components/GroupList';

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      checked:true,
      group:[],
    }
    this._getGroupList()
  }
  _isMounted=false;
  static navigationOptions = {
    title: 'Links',
    headerStyle: {
      backgroundColor: '#6C6656cf'
    },headerTitleStyle: {
      color:'#fff',
      fontSize: 24,
      fontWeight: 'bold',
    }
  };
  componentDidUpdate(){
    console.log('updated')
  }
  componentDidMount(){
    this._isMounted = true;
  }
  componentWillUnmount(){
    this._isMounted = false;
  }
  _getGroupList = async () => {
    let index = await AsyncStorage.getItem('groupNumber');
    let url = await AsyncStorage.getItem('url') + '/groups/list?index='+index;
    await fetch(url).then(res=>res.json()).then(res=>this.setState({group:JSON.parse(res[0].content)}))
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.group.map((item, i)=>(
            <ListItem
              key={i}
              containerStyle={{borderBottomWidth:1, borderBottomColor:'#FFDa66'}}
              title={String(item.name + ' ' + item.surname)}
              titleStyle={{fontSize:18, fontWeight:'700'}}
              checkBox={{checked:true, onPress:()=>{console.log(this.state.group)}}}
            />
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 15,
    backgroundColor: '#FFD663',
  },
});
