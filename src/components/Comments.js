import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useGetCommentsItineraryQuery, useNewCommentMutation, useDeleteCommentMutation, useEditCommentMutation } from '../features/commentsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export default function Comments({ itinerary }) {
    const axios = require('axios').default;

    const [loggedUser, setUser] = useState()
    const [token, setToken] = useState()

    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("loggedUser");
            let currentUser = JSON.parse(savedUser)
            const savedToken = await AsyncStorage.getItem("token");
            let currentToken = JSON.parse(savedToken)
            setUser(currentUser)
            setToken(currentToken)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser()
    }, [])

    let { data: comments, refetch } = useGetCommentsItineraryQuery(itinerary)

    const refresh = (prop) => {
        refetch()
        onChangeText("")
        setNewCommentOpen(false)
        setEditCommentOpen(false)
    }

    const [isOpened, setIsOpened] = useState(false);
    function toggle() {
        setIsOpened(wasOpened => !wasOpened);
        refresh()
    }

    const [newCommentOpen, setNewCommentOpen] = useState(false);
    function toggleNewComment() {
        setNewCommentOpen(wasOpened => !wasOpened);
    }

    const [editCommentOpen, setEditCommentOpen] = useState(false);
    function toggleEditComment() {
        setEditCommentOpen(wasOpened => !wasOpened);
    }

    let id = itinerary
    const [value, onChangeText] = React.useState('');
    const handleAddComment = async (form) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            comment: value,
        };

        axios.post(
            `${api}/comments?id=${id}`,
            bodyParameters,
            config
        ).then(res => console.log(res.data)).catch(err => console.log(err)).finally(() => refresh("add"))
    }

    const handleEditComment = async (commentId) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            comment: value,
        };

        axios.patch(
            `${api}/comments?id=${commentId}`,
            bodyParameters,
            config
        ).then(res => console.log(res.data)).catch(err => console.log(err)).finally(() => refresh("edit"))
    }

    async function handleDeleteComment(commentId) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.delete(
            `${api}/comments/${commentId}`,
            config
        ).then(res => console.log(res.data)).catch(err => console.log(err)).finally(() => refetch())
    }

    const commentView = (comment) => (
        <>
            {isOpened && (
                <View style={styles.commentInfo}>
                    <View style={styles.commentUser}>
                        <Image style={styles.userCommentPhoto} source={{ uri: comment.user.photo }} alt="user-photo" />
                        <View>
                            <Text>{comment.user.name} {comment.user.lastName}</Text>
                        </View>
                    </View>
                    <View style={styles.commentTextContainer}>
                        <Text style={{ fontStyle: 'italic' }}>{comment.comment}</Text>
                    </View>
                    {loggedUser.user ?
                        <View key={comment._id}>
                            {loggedUser.user.id == comment.user._id ?
                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                    <TouchableOpacity onPress={() => toggleEditComment()}>
                                        <Text style={styles.editButton}>Edit comment</Text>
                                    </TouchableOpacity>
                                    <>{editCommentOpen && (
                                        <View>
                                            <TextInput
                                                multiline={true}
                                                numberOfLines={4}
                                                onChangeText={(text) => onChangeText(text)}
                                                value={value}
                                                style={{ marginVertical: 10, padding: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }}
                                            />
                                            <TouchableOpacity style={styles.loginBtn} onPress={() => handleEditComment(comment._id)}>
                                                <Text style={styles.editButton}>Submit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    </>
                                    <TouchableOpacity onPress={() => handleDeleteComment(comment._id)}>
                                        <Text style={styles.editButton}>Delete comment</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <>
                                    {loggedUser.user.role == "admin" ? <View>
                                        <TouchableOpacity onPress={() => handleDeleteComment(comment._id)}>
                                            <Text style={styles.editButton}>Delete comment</Text>
                                        </TouchableOpacity>
                                    </View>
                                        : null}
                                </>
                            }
                        </View>

                        :
                        ''
                    }
                </View>
            )}
        </>
    )

    return (
        <View style={styles.commentsContainer}>
            <View>
                <TouchableOpacity style={styles.commentsButton} onPress={toggle}>
                    <Text style={styles.textButton}>Comments</Text>
                </TouchableOpacity>
            </View>
            {comments?.response.filter(comment => comment.itinerary._id == itinerary).map(commentView)}

            <>
                {loggedUser ?
                    <View style={styles.newCommentContainer}>
                        <TouchableOpacity onPress={toggleNewComment}>
                            <Text style={styles.newButton}>New Comment</Text>
                        </TouchableOpacity>
                        <>
                            {newCommentOpen && (
                                <View>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        onChangeText={(text) => onChangeText(text)}
                                        value={value}
                                        style={{ padding: 10, borderColor: 'black', borderWidth: 2, width: '100%' }}
                                    />
                                    <TouchableOpacity style={styles.loginBtn} onPress={handleAddComment}>
                                        <Text style={styles.editButton}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    </View>
                    :
                    null}
            </>
        </View>
    )
}

const styles = StyleSheet.create({
    commentsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    commentsButton: {
        backgroundColor: '#9d85e0',
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },
    textButton: {
        color: '#fff'
    },
    commentInfo: {
        flex: 1,
        backgroundColor: '#e1e7fa',
        borderRadius: 5,
        width: '100%',
        padding: 20
    },
    commentUser: {
        flex: 1,
        borderBottomColor: '#666dce',
        borderBottomWidth: 1,
        padding: 5
    },
    userCommentPhoto: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    commentTextContainer: {
        padding: 10,
        fontStyle: 'italic'
    },
    newCommentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 2,
        width: '100%'
    },
    newButton: {
        backgroundColor: '#495C83',
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 3,
        fontSize: 14,
        marginVertical: 10
    },
    editButton: {
        backgroundColor: '#495C83',
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 3,
        fontSize: 14,
        marginVertical: 5
    }
});