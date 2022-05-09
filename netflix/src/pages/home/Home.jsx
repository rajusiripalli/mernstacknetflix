import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    getRandomLists();
  }, [type, genre])

  const getRandomLists = async () => {
    try {
      const res = await axios.get(
        `lists${type ? "?type=" + type : ""}${
          genre ? "&genre=" + genre : ""
        }`,
        {
          headers: {
            'Content-Type': "application/json; charset=utf-8",
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmZlOTc4MGUyYmExOGQ1ZTdkNWM2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MjA4NTgyOCwiZXhwIjoxNjU0Njc3ODI4fQ.8cVJF-PLrnB3FSHQzrimlTvaWd6oCfIAVnLtOGJJqaQ`,
            "Accept": "application/json"
          }
        }
      );
      console.log(res.data);
      setLists(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
    <Navbar />
    <Featured type={type} setGenre={setGenre} />
    {lists.map((list, i) => (
      <List list={list} key={i} />
    ))}
  </div>
  );
};

export default Home;
