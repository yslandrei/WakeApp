import React, {useState} from 'react'
import { Text, View, Switch, TouchableHighlight } from 'react-native'

const Alarm = ({ alarm, openModal, setModalTitle, alarms, setAlarms }) => {
    const toggleSwitch = () => {
        setAlarms(alarms => {
            return alarms.map((alarmIter) => {
              return alarmIter['time'] === alarm['time'] ? 
                {   
                    time: alarm['time'],
                    enabled: !alarm['enabled'],
                    oneTime: alarm['oneTime'],
                    monday: alarm['monday'],
                    tuesday: alarm['tuesday'],
                    wednesday: alarm['wednesday'],
                    thursday: alarm['thursday'],
                    friday: alarm['friday'],
                    saturday: alarm['saturday'],
                    sunday: alarm['sunday'],
                } 
                :
                alarmIter
            })
        })
    }

    const editAlarm = () => {
        setModalTitle('Edit Alarm')
        openModal(alarm)
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
                            style={{color: alarm["enabled"] ? '#374151' : '#9CA3AF'}}>
                            {alarm["time"]}
                        </Text>
                        <Switch
                            className='self-center'
                            trackColor={{false: '#D1D5DB', true: '#1C64F2'}}
                            thumbColor={alarm["enabled"] ? '#f4f4f4' : '#f4f4f4'}
                            ios_backgroundColor='#D1D5DB'
                            value={alarm["enabled"]}
                            onValueChange={toggleSwitch}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        </>
    )
}

export default Alarm