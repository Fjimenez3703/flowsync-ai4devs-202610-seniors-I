import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito homónimo de `openspec/specs/tasks/spec.md`: nombre e iniciales a
 * la vista, sin filtrar el email (ni en la lista ni en la tarea suelta), y el
 * caso de una cuenta registrada sin nombre.
 */
test.group('Tasks | responsable en la tarea', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any, attrs: { fullName: string | null; email: string }) {
    await User.create({
      fullName: attrs.fullName,
      email: attrs.email,
      password: 'secreto123',
    })
    const login = await client.post('/api/v1/auth/login').json({
      email: attrs.email,
      password: 'secreto123',
    })
    login.assertStatus(200)
    return { token: login.body().data.token as string }
  }

  test('el assignee trae nombre e iniciales del responsable', async ({ client, assert }) => {
    const { token } = await sesion(client, {
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
    })

    const created = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })

    created.assertStatus(201)
    const taskId = created.body().data.id

    const list = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    list.assertStatus(200)

    const fromList = list.body().data.find((t: { id: number }) => t.id === taskId)
    assert.exists(fromList)
    assert.equal(fromList.assignee.fullName, 'Ada Lovelace')
    assert.equal(fromList.assignee.initials, 'AL')

    const show = await client
      .get(`/api/v1/tasks/${taskId}`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today: '2026-11-09' })

    show.assertStatus(200)
    assert.equal(show.body().data.assignee.fullName, 'Ada Lovelace')
    assert.equal(show.body().data.assignee.initials, 'AL')
  })

  test('el assignee no incluye el email ni en la lista ni en la tarea suelta', async ({
    client,
    assert,
  }) => {
    const { token } = await sesion(client, {
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
    })

    const created = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })

    created.assertStatus(201)
    const taskId = created.body().data.id

    // La creación también serializa la tarea: el email no debería colarse ahí.
    assert.notProperty(created.body().data.assignee, 'email')
    assert.notInclude(JSON.stringify(created.body().data.assignee), 'ada@example.com')

    const list = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    list.assertStatus(200)

    const fromList = list.body().data.find((t: { id: number }) => t.id === taskId)
    assert.exists(fromList)
    assert.notProperty(fromList.assignee, 'email')
    assert.notInclude(JSON.stringify(fromList.assignee), 'ada@example.com')

    const show = await client
      .get(`/api/v1/tasks/${taskId}`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today: '2026-11-09' })

    show.assertStatus(200)
    assert.notProperty(show.body().data.assignee, 'email')
    assert.notInclude(JSON.stringify(show.body().data.assignee), 'ada@example.com')
  })

  test('sin nombre el assignee llega con fullName nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const { token } = await sesion(client, {
      fullName: null,
      email: 'sin-nombre@example.com',
    })

    const created = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Apuntar algo' })

    created.assertStatus(201)
    const taskId = created.body().data.id

    const list = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    list.assertStatus(200)

    const fromList = list.body().data.find((t: { id: number }) => t.id === taskId)
    assert.exists(fromList)
    assert.isNull(fromList.assignee.fullName)
    assert.isString(fromList.assignee.initials)
    assert.isNotEmpty(fromList.assignee.initials)

    const show = await client
      .get(`/api/v1/tasks/${taskId}`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today: '2026-11-09' })

    show.assertStatus(200)
    assert.isNull(show.body().data.assignee.fullName)
    assert.isString(show.body().data.assignee.initials)
    assert.isNotEmpty(show.body().data.assignee.initials)
  })
})
