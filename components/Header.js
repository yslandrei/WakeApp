import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'

const Header = ({ title, openModal }) => {
    const addNewAlarm = () => {
        openModal()
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