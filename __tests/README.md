## Surfe Challenge
This project serves as an answer to the technical assessment as requested by Surfe.

### Problem Statement
Given the sample notes app we need to perform 3 exercises as shown in the [task description](https://work.surfe.com/testing-qa-challenge).

### Exercise #1
Below is a list of test cases for **note editing**:
- Prerequisites:
  - A new note should be empty
  - A new note should be linked to the current user's session
- Saving:
  - Writing text in the editor should save the note's content remotely automatically
  - Accessing the same note from anywhere should retrieve the same content
  - We should have a "saving" indicator that is:
    - Green when saved correctly with the text: "Saved"
    - Yellow when in the process of saving with the text: "Saving"
    - Red when saving fails with the text: "Not Saved"
- Leaving the note:
  - We should have a "back" button above the "saving" indicator that has the text: "Back" and when clicked takes the user to their session
- Deleting a note:
  - We should have a "delete" button above the "back" button that has the text: "Delete" and when clicked deletes the current note and takes the user back to their session page
- Mentioning users:
  - The user should be able to mention any user by writing their username prefixed with an `@`
  - When mentioning a user a dropdown list should show the top 5 most mentioned users when the `@` character is entered
  - The top 5 most mentioned users should be shown above the text editor in the format: `firstName lastName | @userName`
  - The user should be able to drag/drop any of the usernames shown above the note into the editor to mention that user in the note
  - If a user drags/drops a username into the text editor it should be prefixed with a space if the note is not empty and the last character is not a space, otherwise if the note is empty we shouldn't prefix the username mention with a space
  - If a user drags/drops a username into the text editor it should be appended at the end of the note's text
  - When mentioning a user a dropdown list should show up above the writing indicator when the `@` is written showing the matching usernames based on the given input with case insensitive substring matching, we should show at most the first 5 matching usernames

### Exercise #2
The list of issues have been created as [GitHub Issues](https://github.com/nourtalaat/surfe-challenge/issues)

### Exercise #3
WIP: Implement the test cases in #1 w/ Puppeteer