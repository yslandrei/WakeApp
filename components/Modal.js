import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox'

const Modal = ({ title, visible, duration, onClose, alarms, setAlarms, alarmIndex, isChecked, setIsChecked }) => {
    const { height } = Dimensions.get('screen')
    const startPointY = height
    const transY = useRef(new Animated.Value(startPointY))

    useEffect(() => {
        if (visible)
            startAnimation(0)
        else
            startAnimation(startPointY)
    }, [visible])

    const startAnimation = (toValue) => {
    Animated.timing(transY.current, {
            toValue,
            duration,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true
        }).start()
    }

    const generateBackgroundOpacity = () => {
        if (startPointY >= 0) {
        return transY.current.interpolate({
            inputRange: [0, startPointY],
            outputRange: [0.2, 0],
            extrapolate: 'clamp'
        })
        } else {
        return transY.current.interpolate({
            inputRange: [startPointY, 0],
            outputRange: [0, 0.2],
            extrapolate: 'clamp'
        })
        }
    }

    const onPressClose = () => {
        onClose()
    }

    //Add Asyncstorage
    const onPressSave = () => {
        setAlarms(alarms => {
            return alarms.map((alarm, j) => {
              return j === alarmIndex ? 
                {   
                    id: alarm['id'],
                    time: alarm['time'],
                    enabled: alarm['enabled'],
                    oneTime: isChecked,
                    monday: alarm['monday'],
                    tuesday: alarm['tuesday'],
                    wednesday: alarm['wednesday'],
                    thursday: alarm['thursday'],
                    friday: alarm['friday'],
                    saturday: alarm['saturday'],
                    sunday: alarm['sunday'],
                } 
                :
                alarm
            })
        })
        onClose()
    }




    return (
        <>
            <Animated.View className='absolute w-full h-full bg-black' style={{ opacity: generateBackgroundOpacity()}} pointerEvents='none'/>
            <Animated.View className='absolute w-full h-full justify-end' style={{transform: [{ translateY: transY.current }]}}>
                <View className='w-full h-[85%] bg-white rounded-[20]'>
                    <View className='flex-row justify-between'>
                        <TouchableOpacity
                            onPress={onPressClose}>
                            <Text className='font-medium text-lg text-blue-600 mx-4 my-3'>Cancel</Text>
                        </TouchableOpacity>
                        <Text className='font-medium text-lg text-gray-700 mx-4 my-3'>{title}</Text>
                        <TouchableOpacity
                            onPress={onPressSave}>
                            <Text className='font-bold text-lg text-blue-600 mx-4 my-3'>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='m-2'>
                        <RNDateTimePicker 
                            mode='time'
                            display='spinner' 
                            value={new Date()} 
                        />
                        <View className='flex-col items-center'>
                            <View className='mb-4 flex-row items-center'>
                                <Text className='mr-2 text-gray-700 text-base font-normal'>One Time Alarm</Text>
                                <Checkbox
                                    style={{borderRadius: 100, height: 24, width: 24, borderWidth: isChecked? 5 : 2}}
                                    value={isChecked}
                                    onValueChange={setIsChecked}
                                    color={'#1C64F2'}
                                />
                            </View>

                            <View className='bg-gray-300 h-[46] w-[316] rounded-lg flex-row items-center'>
                                <View style={{backgroundColor: alarms[alarmIndex]["monday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg ml-2 mr-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>M</Text></View>
                                <View style={{backgroundColor: alarms[alarmIndex]["tuesday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>T</Text></View>
                                <View style={{backgroundColor: alarms[alarmIndex]["wednesday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>W</Text></View>
                                <View style={{backgroundColor: alarms[alarmIndex]["thursday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>T</Text></View>
                                <View style={{backgroundColor: alarms[alarmIndex]["friday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>F</Text></View>
                                <View style={{backgroundColor: alarms[alarmIndex]["saturday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>S</Text></View>
                                <View style={{backgroundColor: alarms[alarmIndex]["sunday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg ml-1 mr-2 items-center justify-center'><Text  className='text-lg font-bold text-red-600'>S</Text></View>
                            </View>
                        </View>
                    </View>
                </View>
                    
            </Animated.View>
        </>
    )
}

export default Modal