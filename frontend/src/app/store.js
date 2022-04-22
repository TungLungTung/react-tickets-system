import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';
import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer
  }
});
