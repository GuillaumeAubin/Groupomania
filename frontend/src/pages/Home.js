import "../style/home.css";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import DataContext from "../DataContext";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  // redirection if user is not logged //

  function redirectLogin() {
    history.push("/login");
  }

  useEffect(() => {
    if (!LStoken) {
      redirectLogin();
    }
  }, []);

  const { dataUser, LStoken } = useContext(DataContext);
  const [latestPosts, setLatestPosts] = useState([]);
  const [hour, setHour] = useState([]);
  const [day, setDay] = useState([]);
  //console.log(dataUser);

  //console.log(dataUserId)

  //2021-12-14T10:32:12.000Z
  function formateDate(data) {
    for (let i = 0; i < data.length; i++) {
      const str = data[i].createdAt.slice(0, 10);
      const day = str.replaceAll("-", "/");
      setDay(day);
      const hour = data[i].createdAt.slice(11, 19);
      setHour(hour);
    }
  }

  useEffect(() => {
    // useEffect((dataUserId) => {

    Axios.get(
      "http://localhost:4200/api/post/lastactivitypost",

      {
        headers: {
          Authorization: LStoken,
        },
      }
    ).then((response) => {
      setLatestPosts(response.data);
      const data = response.data;
      formateDate(data);
    });
  }, [LStoken]);

  return (
    <div>
      <div className="home-container">
        <h1>Bienvenue {dataUser.name} !</h1>
        <div className="wrap-container">
          <div className="last-activities-container">
            <h2>Derniers posts du forum</h2>
            <div className="underline" />

            <table className="table-last-activities">
              <thead>
                <tr>
                  <th className="column autor" colSpan="2">
                    Auteur
                  </th>
                  <th className="column title" colSpan="1">
                    Titre
                  </th>
                  <th className="column date" colSpan="1">
                    Date de publication
                  </th>
                </tr>
              </thead>
              <tbody>
                {latestPosts.map((post) => {
                  const day = new Date(post.createdAt);
                  return (
                    <tr key={post.id}>
                      <td className="col-body">
                        <img src="../profil.png" alt="profil" id="profilPic"/>
                      </td>
                      <td className="col-body">{post.userName}</td>
                      <td className="col-body">{post.title}</td>
                      <td className="col-body" id={post.id}>
                        le {day.getDate()}/{day.getMonth()}/{day.getFullYear()}{" "}
                        à {day.getHours()}:{day.getMinutes()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
