import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Avatar} from 'antd';
import { message } from 'antd';
import Icon from 'react-native-vector-icons/AntDesign';
import { UserOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const Api = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ Name: '', MSSV: '', Class: '' });

  useEffect(() => {
    fetchData();
  }, []);

  function onPressAPIEdit() {
    navigation.navigate('EditAPI');
  }

  function onPressList() {
    navigation.navigate('List');
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://6530db196c756603295f2b0a.mockapi.io/Data'
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setNewItem({
      ...newItem,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    if (newItem.Name && newItem.MSSV && newItem.Class) {
      try {
        message.success('Add new success!');
        await axios.post(
          'https://6530db196c756603295f2b0a.mockapi.io/Data',
          newItem
        );
        fetchData();
        setNewItem({ Name: '', MSSV: '', Class: '' });
      } catch (error) {
        console.error(error);
      }
    } else {
      message.error('Please fill the full information !');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
     <TouchableOpacity onPress={onPressList} style={{ flexDirection: 'row',
alignItems: 'center',paddingTop: 5, marginRight:190,}}>
        <Icon name="stepbackward" size={15} />
        <Text style={styles.text2}>Back</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <input
          style={styles.input}
          name="Name"
          placeholder="Name"
          value={newItem.Name}
          onChange={handleInputChange}
        />
        <input
          style={styles.input}
          name="MSSV"
          placeholder="MSSV"
          value={newItem.MSSV}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            const keyCode = e.keyCode || e.which;
            const keyValue = String.fromCharCode(keyCode);
            const regex = /[0-9]/;
            if (!regex.test(keyValue)) {
              e.preventDefault();
            }
          }}
        />
        <input
          style={styles.input}
          name="Class"
          placeholder="Class"
          value={newItem.Class}
          onChange={handleInputChange}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.userListContainer}>
        <Text style={styles.mainTitle}>DANH SÁCH SINH VIÊN</Text>
        {data.map((item) => (
          <View key={item.id} style={styles.userItem}>
            <Text style={styles.title}>Thông tin sinh viên</Text>
          <View style={styles.userInfoContainer}>
                  <View style={{marginRight:15}}>
      <Avatar size={100} icon={<UserOutlined />}  style={{marginBottom:69}}/>
    </View>
            <View style={{marginBottom:55}}>
      <Text style={styles.contentText}>Tên: {item.Name}</Text>
      <Text style={styles.contentText}>MSSV: {item.MSSV}</Text>
      <Text style={styles.contentText}>Lớp: {item.Class}</Text>
          </View>
          </View>
       <TouchableOpacity
  style={[styles.button, { backgroundColor: '#90EE90', marginLeft: 68, width: '50%', marginTop: -45 }]}
  onPress={onPressAPIEdit}>

  <Text style={styles.buttonText}>Edit User</Text>
</TouchableOpacity>
           </View>
        ))}
 </View>
    <FloatButton.BackTop />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#E0FFFF',
  },
  text2: {
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 60,
    color: '#6495ED',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '90%',
    marginTop: 10,
  },
  input: {
    height: 39,
    borderWidth: 1,
    width:'90%',
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingLeft: 10,
    marginLeft:7,
  },
    userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFA07A',
    borderRadius: 18,
    paddingVertical: 10,
    marginLeft: 90,
    width: '40%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userListContainer: {
    marginTop: 20,
    width: '90%',
    borderRadius:18,
  },
  mainTitle: {
    fontSize: 20,
    color: '#191970',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  userItem: {
    backgroundColor: '#E6E6FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    color: '#FF4500',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
    paddingBottom:1,
  },
});
export default Api;
