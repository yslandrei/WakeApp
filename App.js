import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, View, Text } from 'react-native'
import Header from './components/Header'
import Alarm from './components/Alarm'
import Modal from './components/Modal'

export default function App() {
    const [visible, setVisible] = useState(false)

    const openModal = () => {
        console.log('Open Modal')
        setVisible(true)
    }
    
    const closeModal = () => {
        console.log('Close Modal')
        setVisible(false)
    }

    return (
        <>
            <StatusBar style='light'/>
            <Header title='WakeApp' openModal={openModal}/>
            <ScrollView>
                <View className=''>
                    <Text className='text-gray-700 font-semibold text-2xl mx-4 mt-6 mb-2'>Alarms</Text>
                    <Alarm time='10:00'/>
                    <Alarm time='12:00'/>
                    <Alarm time='14:00'/>
                    <Alarm time='16:00'/>
                    <Alarm time='16:00'/>
                    <Alarm time='16:00'/>
                    <Alarm time='16:00'/>
                    <Alarm time='16:00'/>
                    <Alarm time='16:00'/>
                </View>
            </ScrollView>
            <Modal
                title='Add Alarm'
                visible={visible}
                options={{ type: 'slide', from: 'bottom' }}
                duration={500}
                onClose={closeModal}
            />
        </>
    )
}