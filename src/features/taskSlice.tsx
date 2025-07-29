import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Task {
  id?: number;
  title: string;
  description: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

const API_URL = 'http://localhost:3001/tasks';


export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addTask = createAsyncThunk('tasks/add', async (task: Task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updateTask = createAsyncThunk('tasks/update', async (task: Task) => {
  const res = await axios.put(`${API_URL}/${task.id}`, task);
  return res.data;
});


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      });
  },
});

export default taskSlice.reducer;
