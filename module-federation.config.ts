export const mfConfig = {
  name: "tansaApp",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/RemoteApp.tsx",
    "./metaData": "./meta-data.json",
  },
  shared: ["react", "react-dom"],
};
