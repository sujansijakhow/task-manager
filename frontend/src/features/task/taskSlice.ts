import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import API from "../../api/taskApi";

interface Task {
  id: string;
  title: string;
  projectId: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

// Fetch Tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const response = await API.get("/");
  return response.data;
});

// Add Task
export const addTask = createAsyncThunk(
  "tasks/add",
  async (title: string) => {
    const response = await API.post("/", { title });
    return response.data;
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await API.delete(`/${id}`);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
      });
  },
});

export default taskSlice.reducer;