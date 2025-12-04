import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import dawn from "./assets/dawn.jpg";
import hill from "./assets/hill.jpg";
import leaf from "./assets/leaf.jpg";
import new2 from "./assets/new2.png";
import puppy from "./assets/puppy.jpg";
import road from "./assets/road.jpg";
import rose from "./assets/rose.jpg";
import sky from "./assets/sky.jpg";
import st from "./assets/st.jpeg";


const Gallary = () => {
  const [images] = useState([
    { loc: dawn, name: "Dawn", tags: ["Free"] },
    { loc: hill, name: "Hill", tags: ["Free"] },
    { loc: leaf, name: "Leaf", tags: ["Free"] },
    { loc: new2, name: "New2", tags: ["2$"] },
    { loc: puppy, name: "Puppy", tags: ["Free"] },
    { loc: road, name: "Road", tags: ["Free"] },
    { loc: rose, name: "Rose", tags: ["Free"] },
    { loc: sky, name: "Sky", tags: ["Free"] },
    { loc: st, name: "Steve", tags: ["Free"] },
  ]);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { saveImage, savedImages } = useUser();

  const goroom = (img) => {
    navigate("/room", { state: img });
  };

  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  const isSaved = (imgName) => savedImages.some((img) => img.name === imgName);

  return (
    <>
      <Nav />

      <section className="bg-gray-50 min-h-screen py-10 px-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow
                      focus:outline-none focus:border-cyan-400 focus:ring-1 
                      focus:ring-cyan-400 transition"
          />
        </div>

        {/* Gallery Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.length > 0 ? (
            filteredImages.map((i, index) => (
              <div
                key={index}
                className="rounded overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <img
                  src={i.loc}
                  alt={i.name}
                  className="w-full h-64 object-cover"
                  onClick={() => goroom(i)}
                />

                <p className="text-center py-2 font-semibold text-gray-800 bg-gray-100">
                  {i.name}
                </p>

                {/* Save Button */}
                <div className="flex justify-center p-3">
                  <button
                    onClick={() => saveImage(i)}
                    disabled={isSaved(i.name)}
                    className={`px-4 py-2 rounded-full font-semibold text-white ${
                      isSaved(i.name) ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"
                    } transition`}
                  >
                    {isSaved(i.name) ? "Saved" : "Save"}
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 p-3">
                  {i.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm font-semibold px-2 py-1 bg-cyan-300 text-gray-900 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 text-lg">
              No images found.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallary;
