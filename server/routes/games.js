const express = require('express'),
      app = express(),
      db = require('../database');  

    app.get('/games', (req, res) => {

        const query = `SELECT * FROM games`;

        db.query(query, (error, results, fields) => {
        
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.status(200).json({
                    state:true,
                    games: results
                })
            }

        });
    
    });

    app.get('/games/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql
        const query = `SELECT * FROM games WHERE id_game = ${id}`;

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
                    game: result
                })
            
            }

        });
    
    });

    app.post('/games', (req, res) => {
        
        const data = req.body; //info of form
        const d = new Date();
        
        let min = d.getMinutes();
        if(min < 10){min = '0' + min;}

        //info create game
        const date = `${d.getDate()}/${(d.getMonth() +1)}/${d.getFullYear()}  ${d.getHours()}:${min} hs.`,
              query = `INSERT INTO games(date) VALUES('${date}')`;

        //function that create user_by_game      
        const saveUserGame = (data,id_game) => {
            const {goals_1, user_1, team_1, goals_2, user_2, team_2} = data;
            const query_user_1 = `INSERT INTO user_by_game (fk_id_user, fk_id_team, fk_id_game, goals) VALUES (${db.escape(user_1)},${db.escape(team_1)},${db.escape(id_game)},${db.escape(goals_1)})`
            const query_user_2 = `INSERT INTO user_by_game (fk_id_user, fk_id_team, fk_id_game, goals) VALUES (${db.escape(user_2)},${db.escape(team_2)},${db.escape(id_game)},${db.escape(goals_2)})`

            db.query(query_user_1, (error, results, fields) => {
                if(error) {
                    res.json({
                        ok: false,
                        error: 'user_game_1 error'
                    })
                }
            })
            
            db.query(query_user_2, (error, results, fields) => {
                if(error) {
                    res.json({
                        ok: false,
                        error: 'user_game_2 error'
                    })
                }
            })
        }   

        db.query(query, (error, results, fields) => {
            if (error) {
                res.status(400).json({
                    state:false,
                    error: 'create game error'
                })
            }else {
                
                saveUserGame(data,results.insertId);
                
                res.status(200).json({
                    state:true,
                    game: 'Saved game successfully'
                })
            
            }
        });
    
    });

    app.put('/games/:id', (req, res) => {
        
        const date = db.escape(req.body.date); //avoid injecting sql
        const id = db.escape(req.params.id); //avoid injecting sql

        const query = `UPDATE games SET date = ${date} WHERE id_game = ${id}`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.json({
                    state:true,
                    game: 'Modified date'
                })
            }
        });
    });

    app.delete('/games/:id', (req, res) => {
        
        const id = db.escape(req.params.id); //avoid injecting sql

        const query = `DELETE FROM games WHERE id_game = ${id}`;

        db.query(query, (error, results, fields) => {
            
            if (error) {
                res.status(400).json({
                    state:false,
                    error
                })
            }else{
                res.json({
                    state:true,
                    game: 'Deleted successfully'
                })
            }
        });
    });
    
module.exports = app;