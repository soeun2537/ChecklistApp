import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./color";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
const WORKING_KEY = "@working";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  useEffect(() => {
    loadToDos();
    loadWorking();
  }, []);
  const travel = async () => {
    setWorking(false);
    await saveWorking(false);
  };
  const work = async () => {
    setWorking(true);
    await saveWorking(true);
  };
  const onChangeText = (payload) => setText(payload);
  const saveWorking = async (toWork) => {
    await AsyncStorage.setItem(WORKING_KEY, JSON.stringify(toWork));
  };
  const loadWorking = async () => {
    const value = await AsyncStorage.getItem(WORKING_KEY);
    if (value) {
      setWorking(JSON.parse(value));
    }
  };
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value) {
      setToDos(JSON.parse(value));
    }
  };
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, working, done: false },
    });
    //save to do
    setToDos(newToDos); //toDos에 저장
    await saveToDos(newToDos); //AsyncStorage에 저장
    setText("");
  };
  const deleteToDo = async (key) => {
    Alert.alert("체크 리스트 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "Delete",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos); //toDos에 저장
          await saveToDos(newToDos); //AsyncStorage에 저장
        },
      },
      { text: "Cancel" },
    ]);
  };
  const complete = (key) => {
    const newToDos = { ...toDos };
    const todo = newToDos[key];
    if (todo && todo.done === true) {
      todo.done = false;
    } else if (todo && todo.done === false) {
      todo.done = true;
    }
    newToDos[key] = todo;
    setToDos(newToDos);
    saveToDos(newToDos);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          value={text}
          returnKeyType="done"
          placeholder={working ? "Add a To Do" : "What To Take"}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              {toDos[key].done === true ? (
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => complete(key)}
                >
                  <Fontisto name="checkbox-active" size={18} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => complete(key)}
                >
                  <Fontisto name="checkbox-passive" size={18} color="white" />
                </TouchableOpacity>
              )}
              <Text
                style={{
                  ...styles.toDoText,
                  textDecorationLine:
                    toDos[key].done === true ? "line-through" : "none",
                }}
              >
                {toDos[key].text}
              </Text>
              <View>
                <TouchableOpacity
                  style={styles.trash}
                  onPress={() => deleteToDo(key)}
                >
                  <Fontisto name="trash" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 34,
    fontWeight: 600,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  checkbox: {
    width: 25,
  },
  toDoText: {
    width: "75%",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  trash: {
    marginLeft: 15,
  },
});
