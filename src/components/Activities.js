import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { useGetActivitieItineraryQuery } from '../features/activitiesSlice'

export default function Activities({itinerary}) {

    let { data: activities } = useGetActivitieItineraryQuery(itinerary)

    const activitieView = (activity) => (
        
        <View key={activity._id} style={styles.activityInfo}>                 
            <View>
                <Text style={styles.activityName}>{activity.name}</Text>  
            </View>   
            <View>
                <Image style={styles.activityImage} source={{uri: activity.photo}} alt="image"/>
            </View>
        </View>     
        
    )

  return (
    <View style={styles.activityContainer}>
        <View>
            <Text style={styles.activityTitle}>ACTIVITIES</Text>
        </View>
        {activities?.response.filter(activity => activity.itinerary._id == itinerary).map(activitieView) }
    </View>
  )
}

const styles = StyleSheet.create({
    activityContainer: {
        flex: 1,
        justifyContent: 'space-around',
        width: '100%',
        borderBottomColor: '#666dce',
        borderBottomWidth: 2,
        paddingVertical: 5
    },
    activityTitle: {
        fontSize: 15,
        color: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#7482ff',
        borderRadius: 10,
        width: 85
    },  
    activityImage:{
        width: '100%',
        height: 60
    },
    activityInfo: {
        flex: 1,
        padding: 3
    },
});