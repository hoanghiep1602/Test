
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import background from './assets/photo-1489769002049-ccd828976a6c.webp'
import { Icon } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  function onPressLogin() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}> 
     <ImageBackground source={background} style={styles.image} >
        <View style={styles.header}>   
          <View>
        <TouchableOpacity style={styles.loginbutton} onPress={onPressLogin}>
          <Icon name="login" type="entypo" color="#1E90FF" size={20} />
        </TouchableOpacity>
      </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome to Student Management</Text>
        </View>

        <Text style={styles.quoteText}>
          "The only way to do great work is to love what you do" Steve Jobs
        </Text>

            </ImageBackground>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginbutton: {
    borderRadius: 10,
    marginLeft:260,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 29,
    color: '#B22222',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    paddingTop:30,
  },
  quoteText: {
    fontSize: 20,
    color: '#4B0082',
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 110,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeScreen;