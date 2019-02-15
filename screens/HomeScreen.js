import React from 'react';
import {
  AsyncStorage,
  Button,
  //CheckBox,
  DatePickerAndroid,
  DatePickerIOS,
  Image,
  FlatList,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MyListItem from '../components/GroupList'
import {CheckBox,Icon, ListItem} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      language:'',
      date:this._currentDate(),
      group:'',
      groupList:[],
    };
    this._getGroupList('3321');
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
  _currentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if(month<10) return date+'.0'+month+'.'+year;
    else return date+'.'+month+'.'+year;
  }
  returnData(group) {
    this.setState({group: group});
    this._getGroupList(group);
  }
  componentDidMount() {
    if(this.state.group) {}

  }
  _getGroupList = async (group) => {
    let url = await AsyncStorage.getItem('url') + '/groups/list?index='+group;
    await fetch(url).then(res=>res.json()).then(res=>this.setState({groupList:JSON.parse(res[0].content)}))
  }
  _chooseData = async() =>{
    if(Platform.OS === 'ios'){
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
      </View>
    }else{
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
        }
        if (action == DatePickerAndroid.dateSetAction){
          if(month<9) this.setState({date:day+'.0'+(month+1)+'.'+year})
          else this.setState({date:day+'.'+(month+1)+'.'+year})
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }
  }
  _keyExtractor = (item, index) => String(index);

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };
  _onCheckItem = (index) => {
    // updater functions are preferred for transactional updates
    this.setState((state)=>{
      state.groupList[Number(index)].checked = !state.groupList[Number(index)].checked;
    });
  };
  _renderItem = ({item, i}) => (
    <MyListItem
      key={i}
      id={this.state.groupList.indexOf(item)}
      onPressItem={this._onPressItem}
      onCheckItem={this._onCheckItem}
      title={item.name + ' ' + item.surname}
    />
  );

  render() {
    const {navigate} = this.props.navigation;
    const groupChooseIcon = <Icon size={30} underlayColor='#6C665677' name='torsos-all' type='foundation'
                onPress={()=>{navigate('Picker', {returnData:this.returnData.bind(this)})}}/>;
    const groupNumber = 
      <Text style={{fontSize:16}} onPress={()=>{
        navigate('Picker', {returnData:this.returnData.bind(this)})}
      }>
        {this.state.group}
      </Text>
    return (
      <View style={styles.container}>
        {/*
          *  Строки изменения даты
        */}
        <View style={{flexDirection:'row',borderBottomWidth:1, justifyContent:'space-between', paddingVertical:10}}>
            <View style={{flex:1}}>
            </View>
            <View style={{
              flexDirection:'row',
              flex:1,
              alignItems:'center',
              justifyContent:'center',
            }}>
              <Text style={{fontSize:18, fontWeight:'500'}} >
                {this.state.date}
              </Text>
            </View>
            <View style={{
              flexDirection:'row',
              flex:1,
              paddingRight:15,
              justifyContent:'flex-end', 
            }}>
              <Icon size={30} underlayColor='#6C665677' name='calendar-edit' type='material-community'
                 onPress={async () => {this._chooseData()}}/>
            </View>
        </View>
        {/*
          *  Choose the group number...
        */}
        <View style={{flex:1, backgroundColor:'#fff'}}>
          <View style={{flexDirection:'row', marginTop:5, borderBottomWidth:1}}>
            <View style={{}}>
              <Text style={{padding:15, fontSize:16}}>
                Choose the group number:
              </Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              {this.state.group?groupNumber:groupChooseIcon}
            </View>
          </View>
          <View style={{flex:1}}>
            { <FlatList
              data={this.state.groupList}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />}
          </View>
        </View>
        <Button title="Get" onPress={()=>{console.log(this.state)}} />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD663',
  },
  listItem:{
    flex:1, 
    flexDirection:'row',
    backgroundColor:'#fff', 
    borderBottomWidth:2,
    borderBottomColor:'#6C6656cf',
    height:50,
  }
});
/*
BCKG -   FFD663
topClr - C59200
tabClr - 6C6656
C59200
9B7200
 */