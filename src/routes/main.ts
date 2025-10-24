import { Router } from 'express';
import { createUser, createUsers, getAllUsers, getUserByEmail, updateUser } from '../services/user';
import { json } from 'stream/consumers';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
   const user = await createUser({
        name: 'Teste5',
        email: 'teste5@email.com'
   });
   if(user) {
        res.status(201).json({user});
   } else {
        res.status(500).json({error: "Email já cadastrado"})
   }
   res.json({user});
})

mainRouter.post('/users', async (req, res) => {
     const result = await createUsers([
          {name: 'João', email: 'joao@hotmail.com'},
          {name: 'João2', email: 'joao@hotmail.com'},
          {name: 'Fulano', email: 'fulano@hotmail.com'},
          {name: 'Ciclano', email: 'ciclano@gmail.com'}
     ]);
     res.json({result});
})

mainRouter.get('/users', async (req, res) => {
     const result = await getAllUsers();
     res.json({result})
})

mainRouter.get('/user', async (req, res) => {
     const result = await getUserByEmail("teste2@email.com");
     res.json({result});
})

mainRouter.put('/user', async (req, res) => {
     const result = await updateUser();
     res.json({result});
})