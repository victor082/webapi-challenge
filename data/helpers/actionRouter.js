const express = require('express');

const Actions = require('./actionModel.js');
const router = express.Router();
router.use(express.json());

router.get('.', async (req, res) => {
    try {
        const actions = await Actions.get(req.query);
        res.status(200).json(actions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the action',
        }) 
    }
})
