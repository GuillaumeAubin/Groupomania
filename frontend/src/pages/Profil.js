import React, { useContext, useState, useEffect } from "react";
import DataContext from "../DataContext";
import "../style/profil.css";
import DeleteAccModal from "../components/DeleteAccModal";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function Profil() {
  const history = useHistory();

  const [isOpenDeleteAccModal, setIsOpenDeleteAccModal] = useState(false);
  const [isprofilDeleted, setisprofilDeleted] = useState(false);

  const { dataUser, LStoken } = useContext(DataContext);

  // redirection if user is not logged //

  function redirectLogin() {
    history.push("/login");
  }

  useEffect(() => {
    if (!LStoken) {
      redirectLogin();
    }
  }, []);

  /////////////////////////////////////

  function deleteAccount() {
    //  function deleteAccount(id) {
    Axios.delete(`http://localhost:4200/api/user/delete/${dataUser.id}`).then(
      (response) => {
        //console.log(response + "utilsateur supprimé");
        setisprofilDeleted(true);
        localStorage.setItem("token", "");
        localStorage.setItem("id", "");
      }
    );
  }

  if (isprofilDeleted) {
    return (
      <div className="main-container">
        <div className="delete-profil-msg">profil supprimé</div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1 className="hidden-h1">profil</h1>
      <div className="info-container">
        <div className="info">
          <h2>Votre profil</h2>
          <div className="underline" />
          <table>
            <thead className="thead">
              <tr>
                <th className="column title" colSpan="1">
                  champs
                </th>
                <th className="column date" colSpan="1">
                  infos utilisateur
                </th>
              </tr>
            </thead>

            <tr>
              <td>
                {" "}
                <p className="profil-info-input">
                  Nom d&apos;utilisateur
                </p>{" "}
              </td>
              <td>
                {" "}
                <p className="profil-line-data"> {dataUser.name}</p>{" "}
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <p className="profil-info-input">E-mail</p>{" "}
              </td>
              <td>
                {" "}
                <p className="profil-line-data">{dataUser.email}</p>{" "}
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <p className="profil-info-input">Compte créé le</p>{" "}
              </td>
              <td>
                {" "}
                <p className="profil-line-data">{dataUser.createdAt}</p>{" "}
              </td>
            </tr>
          </table>

          {dataUser.moderator === true ? (
            <div className="card-status admin">ADMINISTRATEUR</div>
          ) : (
            <div className="card-status user">UTILISATEUR</div>
          )}
        </div>
      </div>
      <button
        className="delete-account-button"
        onClick={() => setIsOpenDeleteAccModal(true)}
      >
        Supprimer mon compte
      </button>
      <DeleteAccModal
        open={isOpenDeleteAccModal}
        onClose={() => setIsOpenDeleteAccModal(false)}
      >
        Voulez-vous vraiment supprimer votre compte ?
        <div className="answer-btn-box">
          <button
            className="btn-answer yes"
            onClick={() => deleteAccount(dataUser.id)}
          >
            Oui
          </button>
        </div>
      </DeleteAccModal>
    </div>
  );
}
