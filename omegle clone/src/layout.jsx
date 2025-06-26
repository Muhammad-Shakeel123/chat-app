import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Blogs from './Pages/Blogs.jsx';
import About from "./Pages/About.jsx";
import Support from "./Pages/Support.jsx";
import Stcall from "./Pages/Startcall.jsx";
import Textchat from "./Pages/Textchat.jsx";
import Navbar from "./Pages/Navbar.jsx";
import Search from "./Pages/Search.jsx";
import UpdatePassword from './Pages/UpdatePassword.jsx';
import ChangeAvatar from './Pages/Changeavatar.jsx';
import UpdateAccount from './Pages/UpdateAccount.jsx';
import VideoCall from './Pages/VideoCall.jsx';


const Layout = () => {
    return (
        <>
            <Navbar />
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/about" element={<About />} />
                <Route path="/support" element={<Support  />} />
                <Route path="/search" element={<Search />} />
                <Route path="/startcall" element={<Stcall />} />
                <Route path="/textchat" element={<Textchat />} />
                <Route path="/updatepassword" element={<UpdatePassword />} />
                <Route path="/changeavatar" element={<ChangeAvatar />} />
                <Route path="/updateaccount" element={<UpdateAccount/>}/>
                <Route path="/videocall" element={<VideoCall />} />
                {/* <Route path="/changeavatar" element={<ChangeAvatar/>}/> */}
            </Routes>
        </>
    );
};

export default Layout;
