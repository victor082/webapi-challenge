const express = require('express');
const Actions = require('./actionModel.js');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The action could not be retrieved"})
    })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    Actions.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The action could not be retrieved"})
    })
})

router.post('/', async (req, res) => {
    const newAction = req.body
    if( !newAction.project_id || !newAction.description || !newAction.notes) {
        res.status(400).json({ message: "please fill project id, description, and notes" })
    } else {
        await Actions.insert(newAction)
        .then(action => {
            res.json(action)
        })
        .catch(error => {
            res.status(500).json({ error: "failed adding the new action"})
        })
    }
})

// router.post('/', async (req, res) => {
//     try {
//       const action = await Actions.insert(req.body);
//       res.status(201).json(action);
//     } catch (error) {
//       // log error to server
//       console.log(error);
//       res.status(500).json({
//         message: 'Error adding the action',
//       });
//     }
//   });


router.put('/:id', (req, res) => {
    const updateAction = req.body;
    const id = req.params.id;
    Actions.update(id, updateAction)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Could not update the action"})
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const count = await Actions.remove(id);
    if (count > 0) {
        res.status(200).json({ message: 'The action has been deleted' });
    } else {
        res.status(404).json({ message: 'The action could not be found' });
    }
})

module.exports = router;