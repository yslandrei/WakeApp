import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from './components/Header'
import Alarm from './components/Alarm'
import Modal from './components/Modal'

export default function App() {
    console.log('\n\n\n')

    const [visible, setVisible] = useState(false)

    const [modalTitle, setModalTitle] = useState('Add Alarm')

    const openModal = (alarm) => {
        setSelectedAlarm(alarm)
        setIsChecked(alarm['oneTime'])
        setDate(new Date(`2003-10-17T${alarm['time']}:00`))
        setTime(alarm['time'])
        setVisible(true)
    }
    
    const closeModal = () => {
        setVisible(false)
    }

    const storeAlarms = async (alarms) => {
        try {
            const jsonValue = JSON.stringify(alarms)
            //console.log("Stored: " + jsonValue  + "\n")
            await AsyncStorage.setItem('@alarms', jsonValue)
        } catch (e) {
            console.log("Error storage: ")
            console.log(e)
        }
    }

    const loadAlarms = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@alarms')
            //console.log("Fetched: " + jsonValue  + "\n")
            setAlarms(jsonValue != null ? JSON.parse(jsonValue) : null)
        } catch(e) {
            console.log("Error getter: ")
            console.log(e)
        }

    }

    const [alarms, setAlarms] = useState()

    const [isChecked, setIsChecked] = useState(false)

    const [selectedAlarm, setSelectedAlarm] = useState({
        time: '00:00',
        enabled: false,
        oneTime: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    })

    const sortedAlarms = (alarms) => {
        let tempAlarms = alarms
        return tempAlarms.sort((a, b) => {
            return a['time'] > b['time']? 1 : -1 
        })
    }

    const [time, setTime] = useState(selectedAlarm['time'])
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        loadAlarms()
    }, []);

    const [firstStore, setFirstStore] = useState(true)
    useEffect(() => {
        if(firstStore == true) // Don't store the alarms if they just loaded
            setFirstStore(false);
        else
            storeAlarms(alarms)
    }, [alarms]);
    
    return (
        <>
            <StatusBar style='light'/>
            <Header 
                title='WakeApp' 
                openModal={openModal}
                setModalTitle={setModalTitle}
                alarms={alarms}
                setAlarms={setAlarms}
            />
    
            <ScrollView>
                <View>
                    <Text className='text-gray-700 font-semibold text-2xl mx-4 mt-6 mb-2'>Alarms</Text>
                    {typeof alarms == 'object'? sortedAlarms(alarms).map((alarm, i) => (
                        <Alarm
                            openModal={openModal}
                            setModalTitle={setModalTitle}
                            key={i} 
                            alarm={alarm}
                            alarms={alarms}
                            setAlarms={setAlarms}
                        />
                    )) : <Text className='text-gray-700 text-sm mx-4 mb-2'>No Alarms Set</Text>}
                    
                </View>
            </ScrollView>

            <Modal
                title={modalTitle}
                visible={visible}
                duration={400}
                onClose={closeModal}
                alarms={alarms}
                setAlarms={setAlarms}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                selectedAlarm={selectedAlarm}
                setSelectedAlarm={setSelectedAlarm}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
            />
        </>
    )
}