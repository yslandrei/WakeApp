import React, { useEffect, useRef, useState } from 'react'
import { Text, View, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import Checkbox from 'expo-checkbox'

const Modal = ({ title, visible, duration, onClose, alarms, setAlarms, isChecked, setIsChecked, selectedAlarm, setSelectedAlarm, date, setDate, time, setTime }) => {
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

    const setMonday = () => {
        setSelectedAlarm({...selectedAlarm, monday: !selectedAlarm['monday']})
    }
    const setTuesday = () => {
        setSelectedAlarm({...selectedAlarm, tuesday: !selectedAlarm['tuesday']})
    }
    const setWednesday = () => {
        setSelectedAlarm({...selectedAlarm, wednesday: !selectedAlarm['wednesday']})
    }
    const setThursday = () => {
        setSelectedAlarm({...selectedAlarm, thursday: !selectedAlarm['thursday']})
    }
    const setFriday = () => {
        setSelectedAlarm({...selectedAlarm, friday: !selectedAlarm['friday']})
    }
    const setSaturday = () => {
        setSelectedAlarm({...selectedAlarm, saturday: !selectedAlarm['saturday']})
    }
    const setSunday = () => {
        setSelectedAlarm({...selectedAlarm, sunday: !selectedAlarm['sunday']})
    }

    const onPressClose = () => {
        onClose()
    }

    const onPressModify = () => {
        setAlarms(alarms => {
            return alarms.map((alarm, j) => {
              return alarm['time'] === selectedAlarm['time'] ? 
                {   
                    time: time,
                    enabled: alarm['enabled'],
                    oneTime: isChecked,
                    monday: selectedAlarm['monday'],
                    tuesday: selectedAlarm['tuesday'],
                    wednesday: selectedAlarm['wednesday'],
                    thursday: selectedAlarm['thursday'],
                    friday: selectedAlarm['friday'],
                    saturday: selectedAlarm['saturday'],
                    sunday: selectedAlarm['sunday'],
                } 
                :
                alarm
            })
        })
        onClose()
    }

    const onPressNew = () => {
        setAlarms(alarms => [...alarms, {   
            time: time,
            enabled: true,
            oneTime: isChecked,
            monday: selectedAlarm['monday'],
            tuesday: selectedAlarm['tuesday'],
            wednesday: selectedAlarm['wednesday'],
            thursday: selectedAlarm['thursday'],
            friday: selectedAlarm['friday'],
            saturday: selectedAlarm['saturday'],
            sunday: selectedAlarm['sunday'],
        }])
        onClose()
    }

    const onPressDelete = () => {
        setAlarms(alarms.filter((alarm, j) => {
            if (alarm['time'] != selectedAlarm['time'])
                return alarm
        }))
        onClose()
    }

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setDate(currentDate)
        let tempDate = new Date(currentDate)
        setTime((tempDate.getHours() <= 9 ? '0' + tempDate.getHours() : tempDate.getHours()) + ':' + (tempDate.getMinutes() <= 9 ? '0' + tempDate.getMinutes() : tempDate.getMinutes()))
    }

    return (
        <>
            <Animated.View className='absolute w-full h-full bg-black' style={{ opacity: generateBackgroundOpacity()}} pointerEvents='none'/>
            <Animated.View className='absolute w-full h-full justify-end' style={{transform: [{ translateY: transY.current }]}}>
                <View className='w-full h-[85%] bg-white rounded-xl'>
                    <View className='flex-row justify-between'>
                        <TouchableOpacity
                            onPress={onPressClose}>
                            <Text className='font-medium text-lg text-blue-600 mx-4 my-3'>Cancel</Text>
                        </TouchableOpacity>
                        <Text className='font-medium text-lg text-gray-700 mx-4 my-3'>{title}</Text>
                        <TouchableOpacity
                            onPress={title==='Edit Alarm'? onPressModify : onPressNew}>
                            <Text className='font-bold text-lg text-blue-600 mx-4 my-3'>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='m-2'>
                        <RNDateTimePicker 
                            mode='time'
                            display='spinner' 
                            value={date}
                            onChange={onChangeTime}

                        />

                        <View className='bg-gray-100 rounded-lg mt-2 mx-2 pt-4 pb-5 flex-col items-center'><View>
                            <View className='mb-2.5 mx-0.5 flex-row'>
                                <Text className='mr-1.5 text-gray-700 text-base font-normal'>One Time Alarm</Text>
                                <Checkbox
                                    style={{borderRadius: 100, height: 22, width: 22, borderWidth: isChecked? 5 : 1.5}}
                                    value={isChecked}
                                    onValueChange={setIsChecked}
                                    color={'#1C64F2'}
                                />
                            </View>
                            <View style={{opacity: isChecked? 0.5 : 1}} className='bg-gray-300 h-[46] w-[316] rounded-lg flex-row items-center'>
                                <TouchableOpacity onPress={isChecked? null : setMonday} activeOpacity={0.8} style={{backgroundColor: selectedAlarm["monday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg ml-2 mr-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>M</Text></TouchableOpacity>
                                <TouchableOpacity onPress={isChecked? null : setTuesday} activeOpacity={0.8} style={{backgroundColor: selectedAlarm["tuesday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>T</Text></TouchableOpacity>
                                <TouchableOpacity onPress={isChecked? null : setWednesday} activeOpacity={0.8} style={{backgroundColor: selectedAlarm["wednesday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>W</Text></TouchableOpacity>
                                <TouchableOpacity onPress={isChecked? null : setThursday} activeOpacity={0.8} style={{backgroundColor: selectedAlarm["thursday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>T</Text></TouchableOpacity>
                                <TouchableOpacity onPress={isChecked? null : setFriday} activeOpacity={0.8} style={{backgroundColor: selectedAlarm["friday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>F</Text></TouchableOpacity>
                                <TouchableOpacity onPress={isChecked? null : setSaturday} activeOpacity={0.8} style={{backgroundColor: selectedAlarm["saturday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg mx-1 items-center justify-center'><Text  className='text-lg font-bold text-gray-700'>S</Text></TouchableOpacity>
                                <TouchableOpacity onPress={isChecked? null : setSunday} activeOpacity={0.8} style={{backgroundColor: selectedAlarm["sunday"]? "white" : "#D1D5DB"}} className='h-9 w-9 rounded-lg ml-1 mr-2 items-center justify-center'><Text  className='text-lg font-bold text-red-600'>S</Text></TouchableOpacity>
                            </View>
                        </View></View>
                        <TouchableOpacity 
                            className='flex-row items-end justify-center mt-[240]'
                            onPress={onPressDelete}
                            >
                            <Text className='font-medium text-lg text-red-600'>Delete Alarm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    
            </Animated.View>
        </>
    )
}

export default Modal