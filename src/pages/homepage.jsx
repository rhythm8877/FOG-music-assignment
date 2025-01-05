import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  TrendingUp,
  Library,
  Disc,
  Radio,
  Mic,
  LogOut,
  Play,
  Clock,
} from "lucide-react";
import MichaelJackson from "../asset/MichaelJackson.png"
const HomePage = ({ isLogin, setIsLogin }) => {
  const [currentTab, setCurrentTab] = React.useState("Music");
  const [songs, setSongs] = React.useState([]);
  const navigate = useNavigate();

  const fetchSongs = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/musicx/song",
        {
          headers: {
            accept: "application/json",
            projectID: "f104bi07c490",
          },
        }
      );
      const data = await response.json();
      setSongs(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <main className="flex h-screen bg-black text-white">
      {/* Left Column - Navigation */}
      <div className="w-1/4 p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold mb-8">DreamMusic</h1>

        <p className="m-4">Menu</p>

        <nav className="space-y-6 ">
          <button className="flex items-center space-x-3 w-full text-white">
            <Home size={20} />
            <span className="text-white ">Home</span>
          </button>
          <button className="flex items-center space-x-3 w-full ">
            <TrendingUp size={20} />
            <span className="text-white ">Trends</span>
          </button>
          <button className="flex items-center space-x-3 w-full ">
            <Library size={20} />
            <span className="text-white ">Library</span>
          </button>
          <button className="flex items-center space-x-3 w-full ">
            <Disc size={20} />
            <span className="text-white ">Discover</span>
          </button>
        </nav>

        <button
          className="flex items-center space-x-3 mt-auto absolute bottom-6 "
          onClick={() => setIsLogin(false)}
        >
          <LogOut size={20} />
          <span className="text-white ">Logout</span>
        </button>
      </div>

      {/* Middle Column - Content */}
      <div className="w-2/4 p-6 overflow-y-auto">
        <nav className="flex space-x-6 mb-6">
          <button
            className={`${
              currentTab === "Music" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setCurrentTab("Music")}
          >
            Music
          </button>
          <button
            className={`${
              currentTab === "Podcast" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setCurrentTab("Podcast")}
          >
            <Mic className="inline mr-1" size={16} />
            Podcast
          </button>
          <button
            className={`${
              currentTab === "Radio" ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setCurrentTab("Radio")}
          >
            <Radio className="inline mr-1" size={16} />
            Radio
          </button>
        </nav>

        <div className="relative mb-8">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for songs, artists..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <img
            src={MichaelJackson}
            alt="Michael Jackson"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="">
          <h2 className="text-xl font-bold ">Michael Jackson</h2>
          <p className="text-gray-400">27,852,501 monthly listeners</p>
          </div>
        </div>

        <div className="space-y-4">
          {songs.map((song, index) => (
            <div
              key={song._id}
              className="flex items-center p-2 rounded"
            >
              <span className="w-8 text-gray-400">{index + 1}</span>
              <Play size={16} className="mr-4 text-gray-400" />
              <div className="flex-grow">
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-gray-400 text-sm">
                  {song.artist.map((a) => a.name).join(", ")}
                </p>
              </div>
              <span className="text-gray-400 w-20 text-right">3:45</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Now Playing */}
      <div className="w-1/4 p-6 border-l border-gray-800">
        <h2 className="text-xl font-bold mb-4">Now Playing</h2>
        {songs[0] && (
          <div>
            <img
              src={songs[0].thumbnail}
              alt={songs[0].title}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <h3 className="font-medium">{songs[0].title}</h3>
            <p className="text-gray-400 text-sm">
              {songs[0].artist.map((a) => a.name).join(", ")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;