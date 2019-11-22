import React, {useState, useEffect, Fragment} from 'react';

//redux
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../actions/usersAction';
import {getTeams} from '../actions/teamsAction';
import {newGame} from '../actions/gamesAction';

const NewGame = ({history}) => {

    const [goals_1, saveGoals1] = useState(0),
          [user_1, saveUser1] = useState(''),
          [team_1, saveTeam1] = useState(''),
          [goals_2, saveGoals2] = useState(0),
          [user_2, saveUser2] = useState(''),
          [team_2, saveTeam2] = useState('');
  
    const dispatch = useDispatch(),
          users = useSelector(state => state.users.users),
          teams = useSelector(state => state.teams.teams);
    
    useEffect(() => {
            dispatch(getUsers())
            dispatch(getTeams())
    },[]);

    const submitGame = e => {
        e.preventDefault();

        dispatch(newGame({
            goals_1,
            user_1,
            team_1,
            goals_2,
            user_2,
            team_2
        }));

        history.push('/')    

    }   

    return (
        <Fragment>
            <div className="row">
                <div className="col d-flex justify-content-center my-5">
                    <h3>New Game</h3>
                </div>
            </div>
            <div className="row">
                <div className="col text-uppercase text-light box-standard">
                        <form onSubmit={submitGame}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-6 p-4">
                                    <div class="form-group d-flex justify-content-around">
                                        <label for="goals_1" className="col-sm-5 text-center col-form-label">Goals:</label>
                                        <div className="col-sm-6">
                                            <input type="number" className="form-control-plaintext text-light text-center" id="goals_1" value={goals_1} onChange={e => saveGoals1(e.target.value)} required></input>
                                        </div>
                                    </div>
                                    <div class="form-group d-flex justify-content-around">
                                        <label for="user" className="col-sm-5 text-center col-form-label">User:</label>
                                        <div className="col-sm-6">
                                            <select class="form-control select-transparent" id="user" onChange={e => saveUser1(e.target.value)} required>
                                            <option value=''>User</option>
                                                {users.map(user => (
                                                   <option value={user.id_user}>{user.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group d-flex justify-content-around">
                                        <label for="team" className="col-sm-5 text-center col-form-label">Team:</label>
                                        <div className="col-sm-6">
                                            <select class="form-control select-transparent" id="team" onChange={e => saveTeam1(e.target.value)} required>
                                                <option value=''>Team</option>
                                                {teams.map(team => (
                                                    <option value={team.id_team}>{team.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>    
                                </div>
                                <div className="col-md-6 p-4">
                                    <div class="form-group d-flex justify-content-around">
                                        <label for="goals_against" className="col-sm-5 text-center col-form-label">Goals against:</label>
                                        <div className="col-sm-6">
                                            <input type="number" className="form-control-plaintext text-light text-center" id="goals_against" value={goals_2} onChange={e => saveGoals2(e.target.value)} required></input>
                                        </div>
                                    </div>
                                    <div class="form-group d-flex justify-content-around">
                                        <label for="opponent" className="col-sm-5 text-center col-form-label">Opponent:</label>
                                        <div className="col-sm-6">
                                        <select class="form-control select-transparent" id="opponent" onChange={e => saveUser2(e.target.value)} required>
                                                <option value=''>User</option>
                                                {users.map(user => (
                                                   <option value={user.id_user}>{user.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group d-flex justify-content-around">
                                        <label for="team_opponent" className="col-sm-5 text-center col-form-label">Team opponent:</label>
                                        <div className="col-sm-6">
                                            <select class="form-control select-transparent" id="team_opponent" onChange={e => saveTeam2(e.target.value)} required>
                                                <option value=''>Team</option>
                                                {teams.map(team => (
                                                    <option value={team.id_team}>{team.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center my-2">
                                    <button type="submit" className="border-0 link-new-game">LOAD</button>
                            </div>
                        </form>
                </div>
            </div>
        </Fragment>
    );
}
 
export default NewGame;