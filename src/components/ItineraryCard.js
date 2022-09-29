import { View, Text, Image, StyleSheet, ScrollView, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ItineraryCard({ search, refetchAction }) {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetchAction()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    let itineraries = search

    const itineraryView = (itinerary) => (

        <View style={styles.itineraryCard} key={itinerary._id}>
            <View style={styles.itineraryCardBody}>
                <View style={styles.itineraryTag}>
                    <Text style={{ color: '#fff' }}>
                        {itinerary.city.city}
                    </Text>
                </View>
                <Text style={styles.info}>
                    {itinerary.name} Itinerary
                </Text>
                <Text style={styles.info}>
                    Duration (Minutes): {itinerary.duration}
                </Text>
                <Text style={styles.info}>
                    $ {itinerary.price}
                </Text>
                <Text style={styles.info}>
                    Tags: {itinerary.tags}
                </Text>
                <View style={styles.itineraryUser}>
                    <View style={styles.itineraryUserInfo}>
                        <Image style={styles.itineraryUserImg} source={itinerary.user.photo} alt="user" />
                        <View>
                            <Text>{itinerary.user.name}</Text>
                            {/* <Like handleLike={handleLike} itinerary={itinerary}></Like> */}
                            <Text>Likes: {itinerary.likes.length}</Text>
                        </View>
                    </View>
                    {/* {localStorage.getItem("loggedUser") ?
                        <>
                            {loggedUser.user.id == itinerary.user._id ?
                                <View>
                                    <button className='itineraryUser-button' onClick={toggleEditItinerary}>Modificar</button>
                                    <>{editItinearyOpen && (
                                        <form id={itinerary._id} className='comment-form' onSubmit={handleEditItinerary}>
                                            {formEditItinerary.map(inputForm)}
                                            <input className='itineraryUser-button' type="submit" name="" value="Submit" />
                                        </form>
                                    )}
                                    </>

                                    <button id={itinerary._id} className='itineraryUser-button' onClick={handleDeleteItinerary}>Eliminar</button>
                                </View>
                                :
                                <>
                                    {loggedUser.user.role == "admin" ? <View>
                                        <button className='itineraryUser-button' onClick={toggleEditItinerary}>Modificar</button>
                                        <>{editItinearyOpen && (
                                            <form id={itinerary._id} className='comment-form' onSubmit={handleEditItinerary}>
                                                {formEditItinerary.map(inputForm)}
                                                <input className='itineraryUser-button' type="submit" name="" value="Submit" />
                                            </form>
                                        )}
                                        </>
                                    </View> : ''}
                                </>
                            }
                        </>
                        :
                        ''
                    } */}
                </View>
                {/* <Activities itinerary={itinerary._id} />
                <Comments itinerary={itinerary._id} /> */}
            </View>
        </View>
    )

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } showsVerticalScrollIndicator={false} style={styles.itineraryContainer}>
            <View>
                {itineraries?.response.map(itineraryView)}
                {/* <Alerts alert={result} /> */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    itineraryContainer: {

    },
    itineraryCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#52006A',
        elevation: 5,
        width: 300
    },
    itineraryCardBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        width: '100%'
    },
    itineraryTag: {
        backgroundColor: '#ad88e9',
        borderRadius: 10,
        padding: 5,
        textTransform: 'uppercase',
        color: '#fff'
    },
    info: {
        margin: 5
    },
    itineraryUser: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        borderBottomColor: '#666dce',
        borderBottomWidth: 2,
        width: '100%'
    },
    itineraryUserInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itineraryUserImg: {
        width: 20,
        height: 20,
    },
});