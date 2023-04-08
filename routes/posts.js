const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

const axios = require('axios');


/**
 * INDEX POSTS
 */
router.post('/', [
    //validation
    body('url').notEmpty(),

],  (req, resp) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return resp.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        url: req.body.url,

    }

    axios.post('https://ssyoutube.com/api/convert',  {
        url: formData.url
      })
    .then(res => {
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);

        const posts = res.data;

        /* for(user of users) {
        console.log(`Got user with id: ${user.id}, name: ${user.name}`);
        } */

        let datas = [];
        
        posts.forEach(post => {
            let data = {};

            data["thumbnail"]=post.thumb;

            data["media"]=post.url;

            datas.push(data);
        });

        return resp.status(200).json({
            status: true,
            message: 'List Data',
            /* data: posts */
            data: datas
        })
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });

    
    //query
    /* connection.query('SELECT * FROM posts ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: json({
                    hehe: "ehehe"
                })
            })
        }
        
    }); */
});

module.exports = router;