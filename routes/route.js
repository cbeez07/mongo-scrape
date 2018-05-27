const express = require('express');
const db = require('./../models');
const axios = require('axios');
const cheerio = require('cheerio');



module.exports = function(app) {
    
    app.get('/scrape', (req, res) => {
        axios.get('https://www.mlssoccer.com/').then((response) => {
                // console.log(response);
                
            var $ = cheerio.load(response.data);
            // console.log(response.data);
            
            $("ul.item-list li").each(function(i, element) {
                // console.log('one');
                // console.log($(this).find('.row_text').find('a').text());
                // console.log($(this).find('.row_text').find('a').attr('href'));
                // console.log($(this).find('.row_image').find('img').attr('src'));
                
                var result = {};
                result.article = $(this)
                    .find('.row_text')
                    .find('a')
                    .text();
                result.link = 'https://www.mlssoccer.com/' + $(this)
                    .find('.row_text')
                    .find('a')
                    .attr('href');
                result.picture = $(this)
                    .find('.row_image')
                    .find('img')
                    .attr('src');
                console.log(result);
                
                db.Quote.create(result)
                    .then(function(dbQuote) {
                        console.log(dbQuote);
                        
                    })
                    .catch(function(err) {
                        return res.json(err);
                    });
                
            }); 
        });
        res.render('index');  

    });
    app.get('/articles', (req, res) => {
        db.Quote.find({})
            .then((dbQuote) => {
                console.log(dbQuote);
                res.json(dbQuote);
            })
            .catch((err) => {
                res.json(err);
            });
    });
    app.get('/articles/:id', (req, res) => {
        db.Quote.findOne({ _id: req.params.id })
            .populate('note')
            .then((dbQuote) => {
                res.json(dbQuote);
            })
            .catch((err) => {
                res.json(err);
            });
    });
    app.post("/articles/:id", (req, res) => {
        db.Note.create(req.body)
          .then((dbNote) => {
            return db.Quote.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
          })
          .then((dbQuote) => {
            res.json(dbQuote);
          })
          .catch((err) => {
            res.json(err);
          });
    })      
};
