import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import hannaServer from "../api/hannaServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  add_minutes,
  diff_minutes,
  showSuccess,
} from "../constants/helpers/helperFunctions";
import FindDestination from "../components/FindDestination";
import NumericInput from "react-native-numeric-input";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import {
  changeParkingAvailable,
  selectTransaction,
} from "../features/transaction/transactionSlice";
import { selectLocation } from "../features/location/locationSlice";
import { selectRoleMode } from "../features/mode/roleModeSlice";

const ShareParkingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isParkingAvail } = useSelector(selectTransaction);
  const myLocation = useSelector(selectLocation);

  const { width, height } = useWindowDimensions();
  const [carDetails, setCarDetails] = useState();
  const [expectedDepartureTime, setExpectedDepartureTime] = useState();
  const [diffMins, setDiffMins] = useState(0);

  const USER_MODE = useSelector(selectRoleMode);
  console.log("user mode share screen: ", USER_MODE.state);

  const handleShareBtn = async () => {
    console.log("shared parking", carDetails);

    try {
      let userToken = await AsyncStorage.getItem("userToken");
      let userTokenJson = JSON.parse(userToken);

      let carDetail = await AsyncStorage.getItem("carDetails");
      let carDetailJson = JSON.parse(carDetail);
      let carNumber = carDetailJson[0].registrationNumber;

      let durationArrivedTime = add_minutes(
        carDetails.timeStamp,
        expectedDepartureTime
      );
      setDiffMins(diff_minutes(durationArrivedTime, new Date()));
      const userParking = {
        userToken: userTokenJson.refreshToken,
        specificLocation: {
          latitude: carDetails.latitude,
          longitude: carDetails.longitude,
        },
        genralLocation: carDetails.generalLoc,
        timeStamp: carDetails.timeStamp,
        registrationNumber: carNumber,
        myLoc: myLocation.src,
      };
      hannaServer
        .post("/share-parks", userParking)
        .then((res) => {
          console.log(res.data);
          dispatch(changeParkingAvailable(true));
          const userParkingId = res.data.userParkingId;
          console.log("userParkingId-SHARE", userParkingId);
          navigation.navigate("Home", { userId: userParkingId });
          showSuccess("Thanks for sharing");
        })
        .catch((e) => console.log("failed connect share parking", e));
    } catch (e) {
      console.log("failed connect share parking", e);
    }
  };

  React.useEffect(() => {
    if (!carDetails) return;
    let durationArrivedTime = add_minutes(
      carDetails.timeStamp,
      expectedDepartureTime
    );
    setDiffMins(diff_minutes(durationArrivedTime, new Date()));
  }, [expectedDepartureTime]);

  return (
    <View style={styles.SharingContainer}>
      <View style={styles.findDes}>
        <FindDestination
          placeholderText={"Where is your car at?"}
          handleSearch={() => console.log("stay in the same page")}
        />
        <Map
          width={width}
          height={height / 1.25}
          request={"SHARE"}
          setCarDetails={setCarDetails}
          isParking={false}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <View
          style={{
            display: "flex",
            marginBottom: 15,
          }}
        >
          <View style={styles.SharedParkingDetails}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              Expected Departure Time:
            </Text>
            <NumericInput
              minValue={0}
              totalHeight={30}
              totalWidth={70}
              onChange={setExpectedDepartureTime}
            />
          </View>
          <View style={styles.SharedParkingDetails}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              Expected Arrived Time: {diffMins}
            </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Pressable
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textBtn}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.shareBtn} onPress={handleShareBtn}>
            <Text style={styles.textBtn}>Share</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ShareParkingScreen;

const styles = StyleSheet.create({
  SharingContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  SharedParkingDetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
  cancelBtn: {
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: "red",
  },
  shareBtn: {
    borderRadius: 10,
    backgroundColor: "green",
  },
  textBtn: {
    padding: 8,
    color: "white",
  },
  findDes: {
    flex: 2,
  },
  map: {
    flex: 2,
  },
});
