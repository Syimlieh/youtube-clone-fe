import Category from "./components/Category";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";


function App() {
  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Category />
      </div>
    </div>
  )
}

export default App;
