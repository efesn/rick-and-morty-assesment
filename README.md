# Rick and Morty Character Explorer

A React application that allows users to explore characters from the Rick and Morty universe using the [Rick and Morty API](https://rickandmortyapi.com/).

## See it live:
https://efesn.github.io/rick-and-morty-assesment/

## Features

- **Character Grid/List View**
  - Responsive grid layout
  - Character thumbnails with basic information
  - Status indicators with color coding
  - Species and location information

- **Search & Filtering**
  - Name search
  - Status filter (Alive, Dead, Unknown)
  - Species filter
  - Sorting by name and ID
  - URL-based filtering for shareable states

- **Pagination**
  - Page navigation
  - Results count display
  - Smooth loading states

- **Character Details**
  - Full-size character image
  - Complete character information
  - Episode appearance count
  - Origin and current location
  - Navigation back to list

## Technologies Used

- React.js

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/efesn/rick-and-morty-assesment.git
   cd rick-and-morty-assesment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

This project uses the [Rick and Morty API](https://rickandmortyapi.com/). The main endpoints used are:

- `GET /api/character` - Get list of characters with optional filters
- `GET /api/character/{id}` - Get detailed information about a specific character

