import { lazy, Suspense } from "react";
import "./App.css";

const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#060a13', color: '#fff', fontFamily: 'sans-serif' }}>Loading...</div>}>
          <MainContainer />
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
