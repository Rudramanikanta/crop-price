import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet,TextInput } from 'react-native';
import { FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loader from './Loader'; 

const Stack = createStackNavigator()
const cropImages = {
  carrot: require('./crop/carrot.jpeg'),
  tomato: require('./crop/tomato.jpeg'),
  cucumber: require('./crop/cucumber.jpeg'),
  rice: require('./crop/wheat.jpeg'),
  onion: require('./crop/oni.jpeg'),
  green_chili: require('./crop/greenchile.jpeg'),
  lemon: require('./crop/th.jpeg'),
  brinjal: require('./crop/brinjals.jpeg'),
  ginger: require('./crop/ginger.jpeg'),
  drums: require('./crop/drums.jpeg'),
  cabage: require('./crop/cabage.jpeg'),
  banana: require('./crop/banana.jpeg'),
  tobaco: require('./crop/tobaco.jpeg'),
  spainch: require('./crop/spainch.jpeg'),
  redchile: require('./crop/redchil.jpeg'),
  pumkin: require('./crop/pumkin.jpeg'),
  potato: require('./crop/potato.jpeg'),
  mango: require('./crop/mango.jpeg'),
  ladies_fin: require('./crop/ladies.jpeg'),
  ground_nut: require('./crop/groundnuts.jpeg'),
};
const cropNames = Object.keys(cropImages);

const IconButton = ({ cropName, navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate('CropDetail', { cropName });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
      <Image source={cropImages[cropName]} style={styles.cropImage} />
      <Text style={styles.cropName}>{cropName}</Text>
      
    </TouchableOpacity>
  );
};

const CropDetailScreen = ({ route }) => {
  const { cropName, } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.cropNames}>{cropName} details</Text>
      <Image source={cropImages[cropName]} style={styles.cropImageDeatil}></Image>
      <Text style={styles.output}>Current Price : <br></br>Upcoming Price :</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CropList" component={CropListScreen} options={{ title: 'Crop List' }} />
        <Stack.Screen name="CropDetail" component={CropDetailScreen} options={{ title: 'Crop Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const CropListScreen = ({ navigation }) => {
  const data = Array.from({ length: cropNames.length }, (_, index) => ({ id: index.toString() }));
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredCrops, setFilteredCrops] = useState(cropNames);


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 30);
  const filtered = cropNames.filter((cropName) =>
      cropName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCrops(filtered);
  }, [searchText]);

return (
  <View style={styles.container}>
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Crops"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />

      
        <FlatList
          data={filteredCrops}
          numColumns={3}
          renderItem={({ item }) => <IconButton cropName={item} navigation={navigation} />}
          keyExtractor={(item) => item}
        />
      </>
    )}
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    textAlign:"center",
    gap:"",
  },
  button: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
  },
  cropImage: {
    width: 95,
    height: 80,
    borderRadius: 8,
  },
   cropImageDeatil: {
    width: 95,
    height: 80,
    borderRadius: 8,
    transform:[{translateX:100}],

  },
  cropName: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  cropNames: {
    marginTop: 2,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    fontFamily:"sans-sanrif",
    
  },
  output:{
    position:"absolute",
    top:150,
    marginLeft:1,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
