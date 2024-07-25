/* eslint-disable no-unused-vars */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { useState } from "react";
import PostListProvier from "./store/post-list-store";

function App() {

  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvier>
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="content">
          <Header />
          {selectedTab === "Home" ? (
            <PostList />
          ) : (
            <CreatePost />
          )}
          <Footer />
        </div>
      </div>
    </PostListProvier>
  )
}

export default App


// TIMING TO START VDEO AGAIN : 10:47:00 