/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/alas', 'AlasController.list')
Route.post('/alas', 'AlasController.create')
Route.delete('/alas/:id', 'AlasController.delete')

Route.get('/members', 'MembersController.list')
Route.post('/members', 'MembersController.create')
Route.delete('/members/:id', 'MembersController.delete')

Route.get('/skills', 'SkillsController.list')

Route.get('/professions', 'ProfessionsController.list')
