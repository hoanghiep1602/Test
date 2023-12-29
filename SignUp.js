import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View,ImageBackground } from 'react-native';
import axios from 'axios';
import { message,Input } from 'antd';
import background from './assets/premium_photo-1700984292456-61a3632319f7.webp';
import { LockOutlined, UserOutlined,MailOutlined } from '@ant-design/icons';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userList, setUserList] = useState([]);

  const handleSignUp = async () => {
    try {
      if (!username || !password || !email) {
        message.error('Please enter complete information!');
      }else if(username.length < 8 || password.length < 8) {
      message.error('User and password must have at least 8 characters');
      }
       else {
        const newUser = {
          username: username,
          password: password,
          email: email,
        };
        await axios.post(
          'https://6530db196c756603295f2b0a.mockapi.io/Login',
          newUser
        );
        message.success('Đăng kí thành công !!');
        setUserList([newUser]);
        setUsername('');
        setPassword('');
        setEmail('');
      }
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  function onBackPress() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
     <ImageBackground source={background} style={styles.image} resizeMode="cover">
        <View style={styles.formView}>
          <Text style={styles.title}>Welcome SignUp</Text>
          <Input
            style={styles.input}
            prefix={<UserOutlined />}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Input.Password
            style={styles.input}
            placeholder="Password"
            prefix={<LockOutlined />}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            secureTextEntry
          />
          <Input
            style={styles.input}
            placeholder="Email"
            prefix={<MailOutlined/>}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <TouchableOpacity
            style={[styles.button, { marginTop: 5, width: 120,backgroundColor: '#1E90FF', alignSelf: 'center' }]} onPress={handleSignUp}>
        
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          {userList.map((user, index) => (
            <View key={index} style={styles.userInfo}>
              <Text style={styles.successText}>Thông tin đăng kí:</Text>
              <Text style={styles.text}>Username: {user.username}</Text>
              <Text style={styles.text}>Password: {user.password}</Text>
              <Text style={styles.text}>Email: {user.email}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={{ marginTop: 30, width: 200 }}
            onPress={onBackPress}>
            <Text style={[styles.buttonText,{color:'#FF4500'}]}>Back to Login</Text>
          </TouchableOpacity>
        </View>
</ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#AFEEEE',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 19,
    width: 140,
  },
  input: {
    height: 40,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#00FFFF",
    marginBottom:30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginBottom: 5,
    fontSize:15,
    color:'#800000',
    fontStyle:'italic',
    fontWeight:'bold',
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  successText: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formView: {
    backgroundColor: 'rgba(250,250,250,)',
    borderRadius: 20,
    alignItems: 'center',
    margin: 20,
  },
 
});

export default SignUp;