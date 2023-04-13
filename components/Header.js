import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'

const Header = ({ title, openModal, setModalTitle, alarms, setAlarms }) => {
    const addNewAlarm = () => {
        setModalTitle('Add Alarm')
        date = new Date()
        openModal({
            time: (new Date().getHours() <= 9 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() <= 9 ? '0' + new Date().getMinutes() : new Date().getMinutes()),
            enabled: true,
            oneTime: true,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        })
    }

    return (
        <>
            <View className='bg-blue-600'>
                <SafeAreaView className='flex-row justify-between'>
                    <Text className='font-bold text-3xl text-white mt-2 mb-6 mx-4'>{title}</Text>
                    <TouchableOpacity onPress={addNewAlarm}>
                        <Text className='font-light text-4xl text-white mt-2 mx-4'>+</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </>
    )
}

export default Header