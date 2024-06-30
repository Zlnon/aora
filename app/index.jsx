import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

export default function app() {
  return (
    <View className="flex-1 items-Center justify-center bg-white" >
      <Text className="text-3xl font-pblack" >app</Text>
      <StatusBar style='auto'/>
      <Link href="/home" style={{color:'blue'}}>go to home</Link>
    </View>
  )
}