import AuthInitializer from "./components/auth/AuthInitializer";
import Category from "./components/Category";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import ShortsList from "./components/ShortsList";
import VideoList from "./components/VideoList";

function App() {
  return (
    <div className="">
      <AuthInitializer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col gap-12 px-4">
          <Category />
          <VideoList />
          <ShortsList />
        </div>
      </div>
    </div>
  )
}

export default App;
