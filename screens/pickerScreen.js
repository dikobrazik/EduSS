import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {ListItem} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
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

  render() {
    return (
      <View style={styles.container}>
        <View>
          {
            this.state.list.map((l, i) => (
              <ListItem
                key={i}
                title={l.name}
                subtitle={l.subtitle}
                onPress={()=>{
                  this.props.navigation.state.params.returnData('123');
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