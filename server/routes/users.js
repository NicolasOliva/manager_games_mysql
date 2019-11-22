const express = require('express'),
      app = express(),
      db = require('../database');  

    app.get('/users', (req, res) => {

        const query = `SELECT * FROM users`;

        db.query(query, (error, results, fields) => {
        
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.status(200).json({
                    state:true,
                    users: results
                })
            }

        });
    
    });

    app.get('/users/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql
        const query = `SELECT * FROM users WHERE id_user = ${id}`;

        db.query(query, (error, results, fields) => {
            if (error) {
              
                res.status(400).json({
                    state:false,
                    error
                })
            
            }else{
            
                results.length === 0 ? result = 'not exists' : result = results[0];
            
                res.status(200).json({
                    state:true,
                    user: result
                })
            
            }

        });
    
    });

    app.post('/users', (req, res) => {
        
        const name = db.escape(req.body.name); //avoid injecting sql
        const query = `INSERT INTO users(name) VALUES(${name})`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.status(200).json({
                    state:true,
                    user: 'Saved user successfully'
                })
            }

        });
    
    });

    app.put('/users/:id', (req, res) => {
        
        const name = db.escape(req.body.name); //avoid injecting sql
        const id = db.escape(req.params.id); //avoid injecting sql

        const query = `UPDATE users SET name = ${name} WHERE id_user = ${id}`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.json({
                    state:true,
                    user: 'Modified name'
                })
            }
        });
    });

    app.delete('/users/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql

        const query = `DELETE FROM users WHERE id_user = ${id}`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.json({
                    state:true,
                    user: 'Deleted successfully'
                })
            }
        });
    });

    // all games by user
    app.get('/users/:id/games', (req, res) => {
    
        const id = db.escape(req.params.id),
            query =` SELECT ug.fk_id_game as game, teams.name as team, games.date, ug.goals,

                     (SELECT goals FROM user_by_game WHERE fk_id_game = ug.fk_id_game AND fk_id_user != ${id}) as goals_against,
                     (SELECT users.name FROM user_by_game INNER JOIN users ON user_by_game.fk_id_user = users.id_user  WHERE fk_id_game = ug.fk_id_game AND fk_id_user != ${id}) as opponent,
                     (SELECT teams.name FROM user_by_game INNER JOIN teams ON user_by_game.fk_id_team = teams.id_team  WHERE fk_id_game = ug.fk_id_game AND fk_id_user != ${id}) as team_opponent
                    
                     FROM user_by_game as ug 
                     INNER JOIN games ON ug.fk_id_game = games.id_game 
                     INNER JOIN teams ON ug.fk_id_team = teams.id_team
                     WHERE ug.fk_id_user = ${id}`;    

        db.query(query, (error, results, fields) => {

            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                results.length === 0 ? result = 'not exists' : result = results;
            
                res.status(200).json({
                    state:true,
                    user: result
                })
            
            }
        });

    });
    
    //opponents by user
    app.get('/users/:id/opponents', (req, res) => {
    
        const id = db.escape(req.params.id),
            query =`SELECT opponent.name as opponent
                    FROM user_by_game as ug 
                    INNER JOIN (SELECT users.name as name, user_by_game.fk_id_game as fk_id_game 
                                FROM user_by_game INNER JOIN users ON user_by_game.fk_id_user = users.id_user
                                WHERE user_by_game.fk_id_user != ${id}) as opponent
                    ON ug.fk_id_game = opponent.fk_id_game
                    WHERE ug.fk_id_user = ${id}
                    GROUP BY (opponent.name)`;    

        db.query(query, (error, results, fields) => {

            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                results.length === 0 ? result = 'not exists' : result = results;
            
                res.status(200).json({
                    state:true,
                    user: result
                })
            
            }
        });

    });

    // results between users
    app.get('/users/:id/difference/:id_opponent', (req, res) => {

        const id = db.escape(req.params.id),
              id_opponent = db.escape(req.params.id_opponent),
              query =`SELECT SUM(games.results) AS difference_games, 
                            SUM(IF(games.results = 1, 1, 0)) as games_win,
                            SUM(IF(games.results = -1, 1, 0)) as games_lost,
                            SUM(IF(games.results = 0, 1, 0)) as games_tied,
                            SUM(games.goals) AS goals, 
                            SUM(games.goals_against) AS goals_against, 
                            (SUM(games.goals) - SUM(games.goals_against)) AS difference_goals
       
                      FROM (SELECT ug.goals AS goals, o.goals AS goals_against, CASE WHEN ug.goals > o.goals THEN 1
                                                                                     WHEN ug.goals < o.goals THEN -1
                                                                                     ELSE 0
                                                                                     END AS results
                            FROM user_by_game AS ug INNER JOIN 
                            (SELECT * FROM user_by_game as u WHERE u.fk_id_user = ${id_opponent}) AS o ON o.fk_id_game = ug.fk_id_game
                            WHERE ug.fk_id_user = ${id}) as games`;    
              
        db.query(query, (error, results, fields) => {

            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                results.length === 0 ? result = 'not exists' : result = results;
            
                res.status(200).json({
                    state:true,
                    difference: result
                })
            
            }
        });

    });

module.exports = app;

