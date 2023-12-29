import axios from 'axios';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined, SyncOutlined } from '@ant-design/icons';
import { message, Input } from 'antd';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity,ImageBackground  } from 'react-native';
import background from './assets/photo-1510776632413-f3e527a8dc42.webp';

const ResetPW = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
//Lai la dg house 
  const handleResetPassword = async () => {
    if (!username || !password || !confirmpassword) {
      message.error('Please enter complete information!');
    } else if (password !== confirmpassword) {
      message.error('Passwords do not match!');
    } else {
       await axios.post(`https://6530db196c756603295f2b0a.mockapi.io/Login/${username}`, {
        password: password
        })
        .then((response) => {
          message.success('Password changed successfully!');
        })
        .catch((error) => {
          message.error('Failed to change password!');
        });
    }
  };

  const returnLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.sectioncontainer}>
    <ImageBackground source={background} style={styles.image}resizeMode="cover">
      <View style={styles.formView}>
        <Text style={styles.title}>Reset Password</Text>
        <Input
        style={styles.input}
          prefix={<UserOutlined />}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Input.Password
          style={styles.input}
          prefix={<LockOutlined />}
          placeholder="Enter your new password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input.Password
      style={styles.input}
          prefix={<SyncOutlined />}
          placeholder="Confirm password"
          onChange={(e) => setConfirmpassword(e.target.value)}
          value={confirmpassword}
        />

        <TouchableOpacity
          style={[styles.button, { marginTop: 5, backgroundColor: '#2F4F4F', alignSelf: 'center' }]}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={returnLogin}>
          <Text style={styles.title2}>Back To Login</Text>
        </TouchableOpacity>
      </View>
        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectioncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    marginBottom: 10,
  },
  title2: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  formView: {
    backgroundColor: 'rgba(250,250,250,)',
    borderRadius: 20,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#6495ED',
  },
  button: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 18,
    width: 135,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#FF1493',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 25,
  },
});

export default ResetPW;