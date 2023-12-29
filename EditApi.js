import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { Button, message, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { Avatar} from 'antd';

const APIedit = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const confirm = () => {
    message.success('User has been deleted ! ');
  };

  function returnAdd() {
    navigation.navigate('Api');
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://6530db196c756603295f2b0a.mockapi.io/Data'
      );
      setData(response.data);
    } catch (error) {
      console.error('Loi goi API', error);
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(
        `https://6530db196c756603295f2b0a.mockapi.io/Data/${item.id}`
      );
      message.success('User has been deleted!');
      fetchData();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditedValues({
      Name: item.Name,
      MSSV: item.MSSV.toString(),
      Class: item.Class,
    });
  };

  const handleInputChange = (event, name) => {
    setEditedValues({
      ...editedValues,
      [name]: event.nativeEvent.text,
    });
  };

  const handleSave = async () => {
    try {
      message.success('Save success!');
      await axios.put(
        `https://6530db196c756603295f2b0a.mockapi.io/Data/${editedItem.id}`,
        {
          ...editedItem,
          ...editedValues,
        }
      );
      fetchData();
      setEditedItem(null);
      setEditedValues({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {data.map((item) => (
          <View key={item.id} style={styles.item}>
            {editedItem && editedItem.id === item.id ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={editedValues.Name || ''}
                  placeholder="Name"
                  onChange={(event) => handleInputChange(event, 'Name')}
                />
                <TextInput
                  style={styles.input}
                  placeholder="MSSV"
                  value={editedValues.MSSV || ''}
                  onChange={(event) => handleInputChange(event, 'MSSV')}
                  onKeyPress={(e) => {
                    const keyCode = e.nativeEvent.key;
                    const regex = /[0-9]/;
                    if (!regex.test(keyCode) && keyCode !== 'Backspace') {
                      e.preventDefault();
                    }
                  }}
                />
                <TextInput
                  style={styles.input}
                  value={editedValues.Class || ''}
                  placeholder="Class"
                  onChange={(event) => handleInputChange(event, 'Class')}
                />
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      marginLeft: 95,
                      marginRight: 20,
                      alignItems: 'center',
                      backgroundColor: '#00CED1',
                      width: '40%',
                    },
                  ]}
                  onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.userItem}>
                <Text style={styles.title}>Thông tin sinh viên</Text>
                <View style={styles.userInfoContainer}>
  <Avatar size={100} icon={<UserOutlined />} />
  <View style={{ marginLeft: 10}}>
    <Text style={styles.contentText}>Tên: {item.Name}</Text>
    <Text style={styles.contentText}>MSSV: {item.MSSV}</Text>
    <Text style={styles.contentText}>Lớp: {item.Class}</Text>
  </View>
</View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: '#4287f5', marginRight: 10 },
                    ]}
                    onPress={() => handleEdit(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>

                  <Popconfirm
                    title="Delete User ?"
                    description="Are you sure to delete this User?"
                    onConfirm={() => handleDelete(item)}
                    okText="Yes">
                    <Button style={{backgroundColor:'red',marginRight:9,width:"85%",height:40,marginTop:1,borderRadius: 18,}} danger>
                      <Text style={styles.buttonText}>Delete</Text>
                    </Button>
                  </Popconfirm>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: '#CD5C5C', padding: 10 },
                    ]}
                    onPress={returnAdd}>
                    <Text style={styles.buttonText}>Go Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
  },
  item: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  userItem: {
    backgroundColor: '#E6E6FA',
    borderRadius: 20,
    padding: 20,
    width: '103%',
    marginBottom: 20,
    marginRight: 30,
    borderWidth: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
 userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 17,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default APIedit;
