import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from "react-native-vision-camera";

export default function App() {
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices[0];
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    Camera.requestCameraPermission().then((p) =>
      setHasPermission(p === "granted")
    );
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    // console.log(`Received a ${frame.width} x ${frame.height} Frame!`);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!hasPermission && <Text>No Camera Permission.</Text>}
      {device != null && (
        <Camera
          ref={cameraRef}
          video={true}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
