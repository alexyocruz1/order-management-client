# Customer Order Management System

This is a React-based Customer Order Management System that allows users to retrieve and view order details by entering an order number. The application uses Materialize CSS for styling and Axios for making HTTP requests to a backend API.

## Features

- Retrieve order details by entering an order number.
- Display order owner, order name, estimated date of delivery, and order description.
- Show order status with corresponding icons and descriptions.
- Use Materialize CSS for a responsive and modern UI.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- A backend API to retrieve order details. The API URL should be set in the `.env` file.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/alexyocruz1/order-management-client.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd order-management-client
   ```

3. **Install the dependencies:**

   ```sh
   npm install
   ```

4. **Create a `.env` file in the root directory and add your API URL:**

   ```env
   REACT_APP_API_URL=http://your-api-url.com
   ```

### Running the Application

1. **Start the development server:**

   ```sh
   npm start
   ```

2. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

## Usage

1. Enter an order number in the input field.
2. Click the "Get Order" button to retrieve the order details.
3. View the order details, including the order owner, order name, estimated date of delivery, and order description.
4. Expand the collapsible sections to see the order status with corresponding icons and descriptions.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.