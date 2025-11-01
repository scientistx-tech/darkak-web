"use client";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Bounce, ToastContainer } from "react-toastify";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Suspense>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Suspense>
    </Provider>
  );
}

export default ReduxProvider;
