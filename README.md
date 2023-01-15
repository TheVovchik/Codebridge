# Single Page Application with React

## Used technologies

- TS
- SASS
- React
- Eslint (for making code more consistent and avoiding bugs)
- Material UI (input, icons)
- Axios for data request
- lodash.debouncer (wait delay for user input)
- React router v6 for navigation

[MOCK-UP](https://www.figma.com/file/h1veXmuEt84sT7PEZgF42K/Frontend_test?node-id=0%3A1&t=SWkoSGHxNg38rHqH-0)

[DEMO-LINK](https://thevovchik.github.io/Codebridge)

> Home page contain:
  1.  Cards with article titles for 70 characters.
  1.  Cards with article description for 100 characters.
  1.  A field to filter by keyword.

The user enters keywords into the field and the system displays all articles containing at least one of the keywords in the name or/and description.

The priority of fields: (1) names; and (2) description. The article with one match in the name is higher than the article with one match in the description.

The matched keywords are highlighted with yellow color.

The user can click on ```Read more``` button to go to an article page that contains the title and full description of the selected article.
