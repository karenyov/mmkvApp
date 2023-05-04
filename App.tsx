import { Button, Text, TextInput, View } from "react-native";

import { MMKV, useMMKVObject, useMMKV } from "react-native-mmkv";

import { styles } from "./styles";
import { useEffect, useState } from "react";

const storage = new MMKV({ id: "myapp" });

type User = {
  name: string;
  email: string;
}

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useMMKVObject<User>('user');
  const storage = useMMKV({ id: 'myapp'});

  function handleSave() {
    setUser({
      name, email
    });
  }

  function fetchUser() {
    const data = storage.getString('user');
    setUser(data? JSON.parse(data) : {});

  }

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((changedKey) => {
      const newValue = storage.getString(changedKey);

      fetchUser();

    });
    return () => listener.remove();
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome..."
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      <TextInput
        placeholder="E-mail..."
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />

      <Button title="Salvar" onPress={handleSave} />

      <Text style={styles.text}>
        {user?.name} - {user?.email}
      </Text>
    </View>
  );
}
