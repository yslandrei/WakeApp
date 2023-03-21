import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, View, Text } from 'react-native'
import Header from './components/Header'
import Alarm from './components/Alarm'
import Modal from './components/Modal'

export default function App() {
    const [visible, setVisible] = useState(false)

    const [modalTitle, setModalTitle] = useState('Add Alarm')


    const openModal = (alarm) => {
        setAlarmIndex(alarm['id'])
        setIsChecked(alarm['oneTime'])
        setVisible(true)
    }
    
    const closeModal = () => {
        setVisible(false)
    }

    const [alarms, setAlarms] = useState([
        {
            id: 0,
            time: '10:00',
            enabled: true,
            oneTime: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            id: 1,
            time: '12:00',
            enabled: true,
            oneTime: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
        {
            id: 2,
            time: '14:00',
            enabled: true,
            oneTime: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
            sunday: false,
        }
    ])

    const [alarmIndex, setAlarmIndex] = useState(0)

    const [isChecked, setIsChecked] = useState(false)

    return (
        <>
            <StatusBar style='light'/>
            <Header 
                title='WakeApp' 
                openModal={openModal}
                setModalTitle={setModalTitle}
                alarms={alarms}
            />

            <ScrollView>
                <View>
                    <Text className='text-gray-700 font-semibold text-2xl mx-4 mt-6 mb-2'>Alarms</Text>
                    {alarms.map((alarm) => (
                        <Alarm
                            openModal={openModal}
                            setModalTitle={setModalTitle}
                            key={alarm["id"]} 
                            alarm={alarm}
                        />
                    ))}
                </View>
            </ScrollView>

            <Modal
                title={modalTitle}
                visible={visible}
                duration={400}
                onClose={closeModal}
                alarms={alarms}
                setAlarms={setAlarms}
                alarmIndex={alarmIndex}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
            />
        </>
    )
}