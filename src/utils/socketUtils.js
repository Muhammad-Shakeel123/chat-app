// utils/socketUtils.js
let ioInstance = null;

// ✅ Store socket instance globally
export const setSocketInstance = io => {
  ioInstance = io;
};

// ✅ Get socket instance from anywhere
export const getSocketInstance = () => {
  if (!ioInstance) {
    throw new Error('Socket.io instance has not been initialized.');
  }
  return ioInstance;
};
