import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "wagmi/chains";

import Signin from "./signin";
import User from "./user";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/",
    element: <h1>Home Component</h1>,
  },
]);

function App() {
  return (
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>
  );
}

export default App;
