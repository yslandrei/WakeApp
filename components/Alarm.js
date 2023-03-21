import React, {useState} from 'react'
import { Text, View, Switch, TouchableHighlight } from 'react-native'

const Alarm = ({ time }) => {
    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        console.log('Alarm On/Off\n')
    }

    const editAlarm = () => {
        console.log('Alarm Edit\n')
    }

    return (
        <>
            <TouchableHighlight
                activeOpacity={1}
                underlayColor='#D1D5DB'
                onPress={editAlarm}>
                <View>
                    <View className='bg-gray-300 h-px w-full self-center'></View>
                    <View className='flex-row justify-between mx-4'>
                        <Text
                            className='text-6xl font-extralight mt-5 mb-2'
                            style={{color: isEnabled ? '#374151' : '#9CA3AF'}}>
                            {time}
                        </Text>
                        <Switch
                            className='self-center'
                            trackColor={{false: '#D1D5DB', true: '#1C64F2'}}
                            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor='#D1D5DB'
                            value={isEnabled}
                            onValueChange={toggleSwitch}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        </>
    )
}

export default Alarm