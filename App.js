import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import React, { Component, useEffect, useState } from 'react';

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderDates, setOrderDates] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [revList, setRevList] = useState([]);
  let curIndex = 0;

 
  const getProducts = async () => {

    const response = await fetch('https://raw.githubusercontent.com/MichiganLabs/Queenmas-Interview-Project/main/products.json' , {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setProducts(responseJson);
        //console.log(responseJson);
      })
      .catch((error) => {
        //console.error(error);
      })
      .finally(() => {
      });
      
  }

  const getOrders = async () => {

    const response = await fetch('https://raw.githubusercontent.com/MichiganLabs/Queenmas-Interview-Project/main/orders.json' , {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setOrders(responseJson);
        //console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {    
      });
      
  }

  const getUsedDates  = async() => {
    for(let i = 0; i < orders.length; i++)
    {
      let curDate = orders[i].date;
      if(!orderDates.includes(curDate))
      {
        await orderDates.push(curDate);
      }
    }
  }

  const getRevenue = async() => {
    
    let cur_date;
    let date_index = 0;

    if(isLoading)
    {
    for(let i = 0; i < orders.length; i++)
    {      

      let cur_order =  orders[i];
      let cur_product;

      if(cur_date != cur_order.date)
      {       
        cur_date = cur_order.date;

        for(let j = 0; j < products.length; j++)
        {
          let cur_product = products[j];
          await orderList.push(cur_product.product);
          await revList.push(0);
        }

        if(i != 0)
        {
          date_index += products.length;
        }
      }

      for(let j = 0; j < products.length; j++)
      {
        let prodIter = products[j];
        if(prodIter.sku == cur_order.sku)
        {
          cur_product = prodIter;
        }
      }

      for(let j = date_index; j < date_index + products.length; j++)
      {
        if(orderList[j] == cur_product.product)
        {
          revList[j] += cur_order.salePrice;
        }
      }
      setLoading(false);
    }
  }

    for(let i = 0; i < revList.length; i++)
    {
      revList[i] = await Math.ceil(revList[i] * 100) / 100;
      revList[i] = Math.round(revList[i]).toFixed(2);
    }
}


  useEffect(() => {
 
    getProducts();
    getOrders();
    getUsedDates();
    getRevenue();

  }, []);


  return (

    <View style={styles.containerNew}>
      <ScrollView >

      <Header
        paddingTop = {60}
        centerComponent={{ text: 'Daily Product Summary', style: {fontWeight: 'bold'} }}
        backgroundColor = {'#e3e3e3'}
      />

      { orderDates.map((key, index)=>(
          < View style={styles.item}>
            <Text style={styles.textStyle}>
            {orderDates[index] + "\n"}
            { orderList.slice(curIndex,curIndex + products.length).map((key1, index1)=>(
              <Text style={styles.textStyle1}>
                { orderList[curIndex + index1] + '\t\t\t\t\t$' + revList[curIndex + index1] + "\n"}
              </Text>
            ))
            }
            </Text>
            <Text style={{fontSize:1}}>{curIndex = curIndex + products.length}</Text>
          </View>
          )
        )
      }

      <StatusBar style="auto" />
      </ScrollView>
    </View>

    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    paddingLeft: 10,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 30,

  },
  textStyle1: {
    paddingLeft: 10,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,

  },

  containerNew: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },

  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },

  container1: {
    flex: 1,
    padding: 50,
  },
  item1: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
  viewList:{
    flexDirection:"row",
    flexWrap:"wrap",
    },
    cap:{
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:10,
    paddingHorizontal:15,
    margin:5,
    borderRadius:20
    }

});
