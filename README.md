# Point of Sale Application

## Date
This README was last updated on: October 16, 2024

## Overview

This is a simple Point of Sale (POS) application that allows users to view products, add them to a shopping cart, and manage their purchases. The application features a responsive design using Bootstrap and interacts with a local JSON database.

## Features

- View a list of products with details including name, description, price, and image.
- Add products to a shopping cart with quantity management.
- Delete products from the list.
- A modal for adding new products.
- Real-time updates of the shopping cart total.
- User-friendly interface with a Bootstrap navbar.

## Technologies Used

- HTML
- CSS (Bootstrap)
- JavaScript
- JSON (for local database)

## Getting Started

### Prerequisites

- A local server running at `http://localhost:8000` to serve the `database.json` file.
- Ensure you have a JSON server setup (e.g., using [json-server](https://github.com/typicode/json-server)).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>

## Start your JSON server:
json-server --watch database.json

### Open the index.html file in a web browser.
Usage
1.On loading, the application fetches products from the JSON server.
2.Click "Add" to launch the modal and add new products.
3.View products and add them to your cart.
4.The cart displays the selected items with quantities and subtotals.
5.Use the "Delete" button to remove products from the list.

### Sample Product Data
{
  "products": [
    {
      "id": "1",
      "name": "Nike Air Max",
      "description": "Experience ultimate comfort and style with these iconic Nike Air Max sneakers.",
      "price": 149.99,
      "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
    },
    {
      "id": "2",
      "name": "Adidas Ultraboost",
      "description": "The perfect blend of style and performance.",
      "price": 179.99,
      "image": "/path/to/image.jpg"
    },
    
  "cart": []
}

### Project Structure
/project-root
│
├── index.html          # Main HTML file
├── index.js            # JavaScript for application logic
├── style.css           # Custom styles
└── database.json       # JSON file with product data

### License
This project is licensed under the MIT License. See the LICENSE file for details.
### Author
Name:Anthony mwaura
Contact:0715284708
Email:mwauraa.gmail.com

### Acknowledgments
Bootstrap for the responsive design.
json-server for the quick setup of a mock REST API.

