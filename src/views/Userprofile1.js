import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import UserAvatar from "react-native-user-avatar";

import COLORS from "../consts/colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shared from "../../components/Shared";
import { Avatar } from "react-native-paper";

const UserProfile1 = ({route, navigation }) => {
  const {totalPrice,tourId,seats} = route.params;
  console.log(totalPrice,tourId,seats);
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

 

  async function getValueFor(token) {
    return await SecureStore.getItemAsync(token);
  }
  useEffect(async () => {
    const token = await getValueFor("token");

   
    const axiosPosts = async () => {
      const response = await axios.get(
        "https://tourbook-backend.herokuapp.com/user/mydetails",
        { headers: { "x-auth-token": token } }
      );
      setPosts(response.data.data);
      console.log(response.data.data);
    };
    axiosPosts();
  }, []);

  const PayNow = async () =>{
    const token = await getValueFor("token");
    console.log(tourId,seats,totalPrice,token);
   await axios.post(
      "https://tourbook-backend.herokuapp.com/order/create",{
        tourID:tourId,
        seats:seats,
        amount:totalPrice
      },
      { headers: { "x-auth-token": token } }
    ).then(response =>{console.log(response.data)}).catch(error => console.log(error));
  }

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
      
       
      

       
       {posts.balance < totalPrice ?(<><View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
           // borderRadius: 10,
           // shadowopacity: 80,
           // elevation: 15,
            marginTop: 20,
          }}
        >
          <Text> {posts.balance}</Text>
        </View>
        <Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
          Don't Have payment, purchase credit now
        </Text>

        <Button
          title="Purchase Credit"
          onPress={() => navigation.navigate("Purchasecredit")}
        />

<Text
            style={{color: COLORS.black,fontWeight: 'bold',textAlign: 'center',fontSize: 12,
            }}>
            Click Purchase Credit to buy the Credit
          </Text>
       </>):(<>

{/* <Text style={{color: COLORS.black, fontSize: 25, fontWeight: 'bold'}}>
          Or
        </Text> */}
     

        
      
   
        <View style={{marginVertical: 20}}>
          
          
           <View style={{flex:1, flexDirection: 'row', }}>
        

        
      </View>

      <Text style={{color: COLORS.black,fontWeight: 'bold',fontSize: 18, marginVertical: 10}}>
          Got credits then Pay now.
        </Text> 

      <Text style={{color: COLORS.black,fontWeight: 'bold',fontSize: 18, marginVertical: 10}}>
          You have to pay : {totalPrice}
        </Text> 


          <Button title="Pay Now" onPress={PayNow} />
          <Text
            style={{color: COLORS.black,fontWeight: 'bold',textAlign: 'center',fontSize: 12,
            }}>
            Click pay now to pay the payment
          </Text>
        </View>
       

     


       </>)}
      </ScrollView>
    </View>
  );
};

export default UserProfile1;
