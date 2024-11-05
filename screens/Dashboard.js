import { signOut} from "firebase/auth"
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native"
import auth from "../services/firebaseAuth"
import { useState } from "react"
export default function DashboardScreen({navigation}) {
  const [task, setTask]=useState("");
  const [tasks, setTasks]=useState([]);
  const [editIndex, setEditIndex]=useState(-1);

  const handleAddTask = () => {
    if (task){
      if(editIndex !== -1){
        //edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      }else{
        //Add New TaSK
    setTasks([...tasks, task])

    }
    setTask("");

    }
    
  }
  const renderItem =({item, index}) => {
    return <View style={styles.task}>
      <Text style={styles.taskText}>{item}</Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>

    </View>
  }
  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  }
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index,1);
    setTasks(updatedTasks);
  }
    const handleLogout =() => {
        signOut(auth)
        .then (() => {
          navigation.navigate('login')
        })

        

    }
    return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ganesh</Text>
      <Text style={styles.title}>ToDoApp</Text>
      <TextInput
       style={styles.input}
       placeholder='Enter Task'
       value={task}
       onChangeText={(text)=> setTask(text)}
       />
       <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}
        >
          <Text style={styles.addButtonText}>{editIndex !== -1 ? "Update Task": "Add Task"}</Text>
       </TouchableOpacity>
       <FlatList
       data={tasks}
       renderItem={renderItem}
       keyExtractor={(item, index)=> index.toString()}
       />
        <Button onPress={handleLogout} title="Logout"/>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "dodgerblue",
  },
  title: {
    fontSize: 25,
    fontWeight:"bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginBottom: 10,
    },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,

  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  taskActions: {
    flexDirection: "row",
  },
  editButton: {
    color: "dodgerblue",
    fontWeight: "bold",
    fontsize: 18,
    marginRight: 15,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontsize: 18,
  },
  taskText: {
    fontSize: 19,


  }

})
