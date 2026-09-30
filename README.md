# Petlove

Petlove is a responsive web application for pet owners and people who want to find, adopt, sell, or help animals.

The application provides pet-related news, partner organizations, searchable notices, user authentication, personal profiles, favorite notices, viewed notices, and management of the user's pets.

## Features

- User registration and login
- Session restoration after page reload
- Public and private routes
- Responsive navigation and mobile menu
- Pet-related news with server pagination and search
- Partner organizations with contact information
- Notices with:
  - keyword search
  - category filtering
  - gender filtering
  - species filtering
  - location search
  - sorting by popularity and price
  - server pagination
- Adding and removing favorite notices
- Detailed notice modal with contact links
- User profile editing
- Adding and deleting user pets
- Favorite and viewed notices tabs
- Notifications for successful and failed operations
- Responsive images for mobile, tablet, desktop, and Retina displays
- Accessible modal windows and navigation

## Technologies

- Next.js 16
- React 19
- TypeScript
- Redux Toolkit
- React Redux
- Axios
- Formik
- Yup
- React Select
- React Hot Toast
- Lucide React
- CSS Modules
- ESLint
- Prettier

## Responsive breakpoints

- Mobile: from 320px
- Adaptive mobile layout: from 375px
- Tablet: from 768px
- Desktop: from 1280px

## Routes

| Route       | Access     | Description             |
| ----------- | ---------- | ----------------------- |
| `/home`     | Public     | Home page               |
| `/news`     | Public     | Pet-related news        |
| `/notices`  | Public     | Pet notices and filters |
| `/friends`  | Public     | Partner organizations   |
| `/register` | Guest only | Registration            |
| `/login`    | Guest only | Login                   |
| `/profile`  | Private    | User profile            |
| `/add-pet`  | Private    | Add a pet               |

## Design

[Figma design](https://www.figma.com/design/2INync0MILh0OdzkDzDqfs/Petl%25F0%259F%2592%259Bve--Copy-?node-id=0-1)

## Backend

[Petlove API documentation](https://petlove.b.goit.study/api-docs/)

Base API URL:

```text
https://petlove.b.goit.study/api
```

git clone https://github.com/realisticsergio/Petlove.git
