import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Inscription() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');

    const valider = async (event) => {
        event.preventDefault();
        const resultat = await axios.post('http://localhost:80/connexion.php', { username, password, mail });
        console.log(resultat.data);
    };

    return (
        <div className="Inscription">
            <h1>Inscription</h1>
            <form onSubmit={valider}>
                <table align="center">
                    <tr>
                        <td colSpan="2">Inscription</td>
                    </tr>
                    <tr>
                        <td><label htmlFor="Nom">Nom</label></td>
                        <td>
                            <input
                                type="text"
                                name="Nom"
                                id="Nom"
                                onChange={(e) => { setUsername(e.target.value) }}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="Prenom">Prenom</label></td>
                        <td><input type="text" name="Prenom" id="Prenom" required /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="Sexe">Sexe</label></td>
                        <td>
                            H <input type="radio" name="Sexe" id="SexeH" value="H" required />
                            F <input type="radio" name="Sexe" id="SexeF" value="F" required />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email">E_mail</label></td>
                        <td>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => { setMail(e.target.value) }}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="mot_de_passe">M.P</label></td>
                        <td>
                            <input
                                type="password"
                                name="mot_de_passe"
                                id="mot_de_passe"
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="date">date.N</label></td>
                        <td><input type="datetime-local" name="date" id="date" required /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="address">Adresse postale</label></td>
                        <td><textarea name="address"></textarea></td>
                    </tr>
                    <tr>
                        <td><button type="submit">Confirmer</button></td>
                        <td><button type="reset">R.A.Z</button></td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">
                            <span>Vous avez déjà un compte? <Link to="/login">S'identifier</Link></span>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default Inscription;
