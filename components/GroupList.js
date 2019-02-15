import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {CheckBox} from 'react-native-elements';

class MyListItem extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      check:false,
    }
  }
  _onPress = () => {
    console.log(this.props)
    this.props.onPressItem(this.props.id);
  };
  _onChange = () => {
    this.setState({check:!this.state.check});
    this.props.onCheckItem(this.props.id)
  };
  render() {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity style={{flexDirection:'row', flex:2}} onPress={this._onPress}>
          <View style={{justifyContent:'center', marginLeft:20}}>
            <Text style={{fontSize:22}}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <CheckBox
            iconType='font-awesome'
            uncheckedIcon='user-times'
            checkedIcon='user'
            style={{backgroundColor:'#f00'}}
            checked={this.state.check}
            onPress={this._onChange} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listItem:{
    flex:1, 
    flexDirection:'row',
    backgroundColor:'#fff', 
    borderBottomWidth:2,
    borderBottomColor:'#6C6656cf',
    height:50,
  }
});

export default MyListItem;