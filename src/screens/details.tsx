/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../theme/colors';

export default function Details({route}: any) {
  const {id} = route.params;
  const [job, setJob] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    function fetchData() {
      try {
        const response = require('../data/job.json');
        const json = response;
        //match id with job id
        const jobFind = json.filter((item: {catId: any}) => item.catId === id);
        setJob(jobFind);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={job}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity style={styles.notes}>
                  <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.circularCat}>{item.circularCat}</Text>
                      <Text
                        style={{
                          color: colors.green,
                          fontFamily: 'light',
                        }}>
                        মোট ভিউ : {item.view}
                      </Text>
                      <Text
                        style={{
                          color: colors.lightGreen,
                          fontFamily: 'light',
                        }}>
                        আবেদনের শেষ তারিখ : {item.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  contentContainerStyle: {
    paddingBottom: 10,
  },
  notes: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#435B66',
    marginTop: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    paddingBottom: 5,
  },
  circularCat: {
    fontSize: 12,
    color: '#ddfe34',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 2,
  },
});
