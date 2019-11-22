import {combineReducers} from 'redux';
import gamesReducer from '../reducers/gamesReducer';
import usersReducer from '../reducers/usersReducer';
import userReducer from '../reducers/userReducer';
import teamsReducer from '../reducers/teamsReducer';
import differenceReducer from '../reducers/differenceReducer';


export default combineReducers({
    games: gamesReducer,
    users: usersReducer,
    teams: teamsReducer,
    user: userReducer,
    differences: differenceReducer
})