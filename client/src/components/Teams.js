import React,{useEffect, Fragment} from 'react'

//redux
import {useDispatch, useSelector} from 'react-redux';
import {getTeams} from '../actions/teamsAction';

const Teams = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeams())
    },[])

    const teams = useSelector(state => state.teams.teams),
          error = useSelector(state => state.teams.error);

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12 my-5">
                    <h3>Teams</h3>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {(error) ? <div> Hubo un error al cargar los equipos</div> : null}
                    {teams.map(team => (
                        <div className="row">
                            <div className="col text-center box-standard">
                                <span className="info-span">{team.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}
 
export default Teams;