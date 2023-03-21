import React, { useEffect, useRef } from 'react'
import { Text, View, Dimensions, Animated, Easing, TouchableOpacity } from 'react-native'

const Modal = ({ title, visible, options, duration, onClose }) => {
    const { height } = Dimensions.get('screen')
    const startPointY = options?.from === 'top' ? -height: height
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
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start()
    }

    const onPressClose = () => {
        onClose()
    }

    const onPressSave = () => {
        console.log('Alarm Save')
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

    return (
        <>
            <Animated.View className='absolute w-full h-full bg-black' style={{ opacity: generateBackgroundOpacity()}} pointerEvents='none'/>
            <Animated.View className='absolute w-full h-full justify-end items-center ' style={{transform: [{ translateY: transY.current }]}}>
                <View className='w-full h-[85%] bg-white rounded-[20] flex-row justify-between'>
                    <TouchableOpacity
                        onPress={onPressClose}>
                        <Text className='font-medium text-lg text-blue-600 mx-4 my-3'>Cancel</Text>
                    </TouchableOpacity>
                    <Text className='font-medium text-lg text-gray-700  mx-4 my-3'>{title}</Text>
                    <TouchableOpacity
                        onPress={onPressSave}>
                        <Text className='font-bold text-lg text-blue-600 mx-4 my-3'>Save</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    )
}

export default Modal