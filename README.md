# Notes App

The app allows to create and edit notes, with a user mention feature, a separate sessions for different users (without authentication).

## How to run the app locally

In the project directory, run the following command in a terminal to install the dependencies (only needed the first time):

```bash
yarn
```

Then, to run the app locally, run the following command, it will be available at URL [http://localhost:3000](http://localhost:3000):

```bash
yarn start
```

To run the tests use the following command:

```bash
yarn test
```

## How to use the app

Navigate to http://localhost:3000/SESSION in a browser where SESSION can be any string you want. This string represents a persistent work “session” for a user. You can therefore switch between users by changing the SESSION string.

You will be presented with a list of notes, and a button to add new ones. By clicking on a note, the editor will open. 
In the editor, you can:
- Change the text content of a note.
- Add mentions to users by drag and dropping them from the list of users on the top 
- Add mentions to users by typing the character @... and choosing one user from list of names that will appear.
- Delete the note by clicking on the "Delete" button on the top right corner

To return back to the note list, click on the "Back" button on the top right corner.

## Challenge README
Please find the [README](https://github.com/nourtalaat/surfe-challenge/blob/main/__tests__) for the Surfe challenge inside the `./__tests__` directory.
