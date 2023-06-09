import { Text, Modal, StyleSheet, View, Image, Pressable } from "react-native";
import Icon from "./Icon";
import React, { useEffect, useState } from "react";
import imagePath from "../constants/imagePath";
import Button from "./Button";
import { useSelector } from "react-redux";
import { selectCarDetail } from "../features/car-detail/carDetailSlice";
import NavigatePopUp from "./NavigatePopUp";
import hannaServer from "../api/hannaServer";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CarDetailsModal(props) {
  const { modalVisible, setModalVisible, setIsParking } = props;

  const [showNavPopup, setShowNavPopup] = useState(false);

  const carDetail = useSelector(selectCarDetail);

  console.log(" carDetail: ", carDetail);

  const handleCloseBtn = async () => {
    // console.log("carDetail: ####", carDetail.userId)
    // hannaServer.post('/update-parking-status', carDetail.userId)
    // .then(() => {
    setIsParking(true);
    setModalVisible(false);
    // })
    // .catch(e => console.log(e.response))
  };

  useEffect(() => {
    console.log("modalVisible: ", modalVisible);
    console.log(" carDetail: ", carDetail);
  }, [modalVisible]);

  return (
    <>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.closeBtn}
          >
            <Icon name={"close"} size={35} color={"black"} />
          </TouchableOpacity>
          <View style={styles.content}>
            <View>
              <View style={styles.locationContainer}>
                <Text style={styles.title}>{carDetail.generalLoc ?? ""}</Text>
              </View>
              <View style={styles.locationContainer}>
                <Text style={{ fontWeight: "bold" }}>Car Details:</Text>
                <Text>brand: {carDetail.car.make}</Text>
                <Text>color: {carDetail.car.color}</Text>
                <Text>Number: {carDetail.car.registrationNumber}</Text>
              </View>
            </View>
            <View style={styles.imgContainer}>
              <Image
                source={imagePath.icProfile}
                resizeMode="center"
                style={{ height: 100, width: 100, borderRadius: 60 }}
              />
            </View>
          </View>
          <View>
            <Button title={"Park Me"} onPress={handleCloseBtn} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    height: 260,
    backgroundColor: "#48D1CC",
    marginTop: "50%",
    marginRight: "3%",
    marginLeft: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 5,
    borderRadius: 20,
  },
  locationContainer: {
    marginTop: 12,
    marginRight: 12,
    width: 140,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green",
  },
  imgContainer: {
    borderRadius: 20,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 30,
  },
});
