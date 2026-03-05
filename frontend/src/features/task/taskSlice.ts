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
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

// Fetch Tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const response = await API.get("/");
  return response.data as Task[];
});

// Add Task
export const addTask = createAsyncThunk(
  "tasks/add",
  async (taskData: { title: string; priority: string; projectId: string }) => {
    const response = await API.post("/", taskData);
    return response.data as Task;
  },
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async (taskData: {
    id: string;
    title?: string;
    priority?: string;
    status?: string;
  }) => {
    const response = await API.patch(`/${taskData.id}`, taskData);
    return response.data as Task;
  },
);

// Delete Task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await API.delete(`/${id}`);
    return id;
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => {
      state.tasks = [];
      state.loading = false;
      state.error = null;
    },
  },
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
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});


export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
