import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

const routes = new Router()

const projects = []


const logRequest = (request, response, next) => {
  const { method, url } = request

  const logLabel = `${method} - ${url}`

  console.log(logLabel);

  return next()
}

routes.use(logRequest)

routes.post('/projects', (request, response) => {
  const { title, owner } = request.body

  const project = {
    id: uuidv4(),
    title,
    owner,
  }

  projects.push(project)

  return response.json(project)
})

routes.get('/projects' , (request, response) => {
  return response.json(projects)
})

routes.put('/projects/:id', (request, response) => {
  const { id } = request.params

  const { title, owner } = request.body

  const projectExist = projects.findIndex(proj => proj.id === id)

  if (projectExist < 0) {
    return response.status(400).json({ error: 'Project not fond.' })
  }

  const newProject = {
    id,
    title,
    owner,
  }

  projects[projectExist] = newProject

  return response.json(newProject)

})

routes.delete('/projects/:id', (request, response) => {
  const { id } = request.params

  const projectExist = projects.findIndex(proj => proj.id === id)

  if (projectExist < 0) {
    return response.status(400).json('Project not fond.')
  }

  projects.splice(projectExist, 1)

  return response.status(204).send()
})

export default routes