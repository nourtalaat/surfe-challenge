import puppeteer, { Browser, ElementHandle, HTTPRequest, Page } from 'puppeteer'

describe('Note Editing', () => {
  let browser: Browser
  let page: Page
  let baseUrl: string
  let session: string
  let noteId: number
  let textArea: ElementHandle
  let clearText: (e: ElementHandle) => Promise<void>

  beforeAll(async () => {
    baseUrl = 'http://localhost:3000'
    session = 'test'
    noteId = 0
    browser = await puppeteer.launch()
    clearText = async (elementHandle: ElementHandle | null) => {
      await elementHandle?.click({ clickCount: 3 })
      await elementHandle?.press('Backspace')
    }
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()
    await page.setJavaScriptEnabled(true)
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(`${baseUrl}/${session}/notes/${noteId}`)
    await page.waitForSelector('.state', {
      hidden: true,
      timeout: 10000,
    })
    textArea = (await page.$('#textArea'))!
    expect(textArea).toBeDefined()
    await clearText(textArea)
    await expect(textArea.evaluate((textArea) => textArea.textContent)).resolves.toStrictEqual('')
  }, 30000)

  afterEach(async () => {
    await page.close()
  })

  it('accepts and saves text', async () => {
    await page.setRequestInterception(true)
    const requests: HTTPRequest[] = []
    page.on('request', (request) => {
      requests.push(request)
      request.continue()
    })

    const text = 'Hello there, Surfe team!'
    await textArea.type(text)
    await expect(textArea.evaluate((textArea) => textArea.textContent)).resolves.toStrictEqual(text)
    await page.waitForSelector('.updating')
    await page.waitForSelector('.updating', {
      hidden: true,
    })
    await page.waitForSelector('.success')

    const textSavingRequest = requests.filter(
      (request) =>
        request.url() === `https://challenge.surfe.com/${session}/notes/${noteId}` &&
        request.method().toLowerCase() === 'put' &&
        JSON.parse(request.postData()!).body === text,
    )
    expect(textSavingRequest.length).toStrictEqual(1)
  })

  it('finds the same text when accessing the same note from a different tab', async () => {
    const text = 'Hello again!'
    await textArea.type(text)
    await expect(textArea.evaluate((textArea) => textArea.textContent)).resolves.toStrictEqual(text)
    await page.waitForSelector('.updating')
    const updatingStatus = await page.$('.updating')
    await expect(updatingStatus?.evaluate((e) => e.textContent)).resolves.toStrictEqual('Saving')

    await page.waitForSelector('.updating', {
      hidden: true,
    })
    await page.waitForSelector('.success')
    const successStatus = await page.$('.success')
    await expect(successStatus?.evaluate((e) => e.textContent)).resolves.toStrictEqual('Saved')

    await page.close()
    page = await browser.newPage()
    await page.goto(`${baseUrl}/${session}/notes/${noteId}`)

    await page.setJavaScriptEnabled(true)
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(`${baseUrl}/${session}/notes/${noteId}`)
    await page.waitForSelector('.state', {
      hidden: true,
      timeout: 10000,
    })
    textArea = (await page.$('#textArea'))!
    expect(textArea).toBeDefined()
    await expect(textArea.evaluate((e) => e.textContent)).resolves.toStrictEqual(text)
  })

  it('has an indicator for when saving fails', async () => {
    const blockRequest = (url: string, method: string) => {
      if (url === `https://challenge.surfe.com/${session}/notes/${noteId}` && method.toLowerCase() === 'put') {
        return true
      }
      return false
    }
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      if (blockRequest(request.url(), request.method())) {
        console.log(`request to ${request.url()} aborted`)
        request.abort()
        return
      }

      request.continue()
    })

    await textArea.type('Oh no, this fails to save!')
    await page.waitForSelector('.updating')
    await page.waitForSelector('.updating', {
      hidden: true,
    })
    await page.waitForSelector('.error')
    const errorStatus = await page.$('.error')
    await expect(errorStatus?.evaluate((e) => e.textContent)).resolves.toStrictEqual('Not saved')
  })

  it('has a back button that returns the user to their session', async () => {
    const actions = await page.$('.note-details__actions')
    const buttons = await actions?.$$('button')
    expect(buttons?.[0]).toBeDefined()
    await expect(buttons?.[0]?.evaluate((button) => button.textContent)).resolves.toStrictEqual('Back')

    await buttons?.[0].click()
    await page.waitForSelector('.state', {
      hidden: true,
    })
    await page.waitForSelector('.notes-list')

    expect(page.url()).toStrictEqual(`${baseUrl}/${session}`)
  })

  it('has a delete button that deletes and returns the user to their session', async () => {
    const actions = await page.$('.note-details__actions')
    const buttons = await actions?.$$('button')
    expect(buttons?.[1]).toBeDefined()
    await expect(buttons?.[1]?.evaluate((button) => button.textContent)).resolves.toStrictEqual('Delete')

    await buttons?.[1].click()
    await page.waitForSelector('.state', {
      hidden: true,
    })
    await page.waitForSelector('.notes-list')
    expect(page.url()).toStrictEqual(`${baseUrl}/${session}`)
  })

  describe('Mentioning Users', () => {
    let mostMentionedUsersActual: string[]
    let mostMentionedUsersShown: ElementHandle[]

    beforeEach(async () => {
      const mostMentionedUsersEndpoint = 'https://challenge.surfe.com/users/mostMentioned'
      const userDataFormatter = (firstName: string, lastName: string, userName: string) =>
        `${firstName} ${lastName} | @${userName}`
      const result = await fetch(mostMentionedUsersEndpoint)
      mostMentionedUsersActual = (await result.json()).map(
        (user: { first_name: string; last_name: string; username: string }) => {
          return userDataFormatter(user.first_name, user.last_name, user.username)
        },
      )
      await page.waitForSelector('.note-details__mentioned-users-item')
      mostMentionedUsersShown = (await page.$$('.note-details__mentioned-users-item'))!
      expect(mostMentionedUsersShown.length).toBeGreaterThan(0)
    })

    it('should have the top 5 most mentioned users above the editor', async () => {
      const mostMentionedContainer = await page.$('.note-details__mentioned-users-container')
      expect(mostMentionedContainer).toBeDefined()
      await expect(mostMentionedContainer?.evaluate((container) => container.children.length)).resolves.toStrictEqual(5)

      const userNodes = await page.$$('.note-details__mentioned-users-item')
      for (let i = 0; i < 5; i++) {
        const userContent = await userNodes?.[i].evaluate((node) => node.textContent)
        expect(mostMentionedUsersActual).toContain(userContent)
      }
    })

    it('ensures that the most mentioned users are draggable', async () => {
      for (const someMostMentionedUser of mostMentionedUsersShown) {
        await expect((await someMostMentionedUser.getProperty('draggable')).jsonValue()).resolves.toStrictEqual(true)
      }
    })

    it('appends username to the note text when a most mentioned user is drag/dropped into the editor', async () => {
      await page.setDragInterception(true)
      const textBefore = 'Some important note, cc:'
      await textArea.type(textBefore)
      await mostMentionedUsersShown[0].dragAndDrop(textArea)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const textAfter = await textArea.evaluate((e) => e.textContent)
      expect(textAfter).toStrictEqual(
        `${textBefore} @${await mostMentionedUsersShown[0].evaluate((e) => e.textContent?.split('@')[1])}`,
      )
    })

    it('shows a dropdown list that contains the top 5 most mentioned users', async () => {
      await textArea.type('@')
      await page.waitForSelector('#dropdownLeftStart > ul > li')
      const usernameNodes = await page.$$('#dropdownLeftStart > ul > li')
      expect(usernameNodes).toBeDefined()
      expect(usernameNodes.length).toStrictEqual(5)
      for (const node of usernameNodes) {
        const userData = await node.evaluate((node) => node.textContent)
        expect(mostMentionedUsersActual).toContain(userData)
      }
    })

    it('displays only the matching usernames in the dropdown list based on the input', async () => {
      await textArea.focus()
      const searchCharacter = 'p'
      await page.keyboard.type('@')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await page.waitForSelector('#dropdownLeftStart > ul > li')
      await page.keyboard.type(searchCharacter)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const usernameNodes = await page.$$('#dropdownLeftStart > ul > li')
      for (const node of usernameNodes) {
        await node.evaluate((e) => e.textContent)
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      expect(usernameNodes).toBeDefined()
      expect(usernameNodes.length).toStrictEqual(5)
      for (const node of usernameNodes) {
        const nodeText = await node.evaluate((e) => e.textContent)
        expect(nodeText).toContain(searchCharacter)
      }
    })

    it("appends the chosen user's username to the note text upon selection from the dropdown menu", async () => {
      const textBefore = await textArea.evaluate((e) => e.textContent)
      await textArea.press('@')
      await page.waitForSelector('#dropdownLeftStart > ul > li')
      await page.waitForFunction('document.querySelectorAll("#dropdownLeftStart > ul > li").length === 5')
      const usernameNodes = await page.$$('#dropdownLeftStart > ul > li')
      usernameNodes[0].click()
      await page.waitForSelector('#dropdownLeftStart', {
        hidden: true,
      })
      const textAfter = await textArea.evaluate((e) => e.textContent)
      expect(textAfter).toStrictEqual(
        `${textBefore}@${await usernameNodes[0].evaluate((e) => e.textContent?.split('@')[1])} `,
      )
    })
  })
})
