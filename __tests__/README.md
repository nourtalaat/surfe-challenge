## Surfe Challenge
This project serves as an answer to the technical assessment as requested by Surfe.

### Problem Statement
Given the sample notes app we need to perform 3 exercises as shown in the [task description](https://work.surfe.com/testing-qa-challenge).

### Exercise #1
Below is a list of test cases for **note editing**:
- Saving:
  - Writing text in the editor should save the note's content automatically
  - Accessing the same note from another tab should retrieve the same content
  - We should have a "saving" indicator that is:
    - Green when saved correctly with the text: "Saved"
    - Yellow when in the process of saving with the text: "Saving"
    - Red when saving fails with the text: "Not saved"
- Leaving the note:
  - We should have a "back" button above the "saving" indicator that has the text: "Back" and when clicked takes the user to their session
- Deleting a note:
  - We should have a "delete" button above the "back" button that has the text: "Delete" and when clicked deletes the current note and takes the user back to their session page
- Mentioning users:
  - The user should be able to mention any user by writing their username prefixed with an `@`
  - The top 5 most mentioned users should be shown above the text editor in the format: `first_name last_name | @username`
  - When mentioning a user a dropdown list should show up above the writing indicator when the `@` is written showing the top 5 most mentioned users the same format used for showing them above the editor
  - Characters entered directly after the `@` character should change the items inside the dropdown menu by showing the matching usernames based on the given input with case insensitive substring matching, we should show at most the first 5 matching usernames, we should follow the same format for the users as the above 2 points
  - The user should be able to drag/drop any of the usernames shown above the note into the editor to mention that user in the note
  - If a user drags/drops a username into the text editor it should be appended at the end of the note's text
  - If a user drags/drops a username into the text editor it should be prefixed with a space if the note is not empty and the last character is not a space, otherwise if the note is empty we shouldn't prefix the username mention with a space, additionally, it should be suffixed with a space
  - Choosing from the dropdown menu or dragging/dropping a username from the most mentioned list should add the user's username in the following format: `@username`, besides this we should follow the exact specifications for spacing as detailed in other test cases

### Exercise #2
The list of issues has been created in [GitHub Issues](https://github.com/nourtalaat/surfe-challenge/issues).

### Exercise #3
The test cases in #1 have been implemented using **Puppeteer**, to get started you need:

0. Make sure you're in the app's root directory
1. Install the dependencies with: `yarn`
2. Have the app running with: `yarn start`
3. In a separate terminal, run the tests with `yarn test`

Notes:
- Some of the tests are intentionally failing because they don't meet the criteria specified in Exercise #1, and as such I thought they could be used as a measure of correctness when resolving the related issues, just like in red-green TDD cycles 
- I've decided to go with **Puppeteer** because I wanted to showcase my ability to ramp up with a tool I'm entirely unfamiliar with