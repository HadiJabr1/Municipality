# Municipality Backend API

A complete C# .NET 8 backend API for the Municipality project, providing RESTful endpoints for managing municipal services, news, events, complaints, and contact inquiries.

## Features

- **Authentication & Authorization**: JWT-based authentication for admin users
- **News Management**: CRUD operations for news articles
- **Events Management**: CRUD operations for municipal events
- **Services Management**: CRUD operations for municipal services
- **Complaints System**: Public complaint submission and admin management
- **Contact System**: Public contact form and admin management
- **Database**: SQLite database with Entity Framework Core
- **API Documentation**: Swagger/OpenAPI documentation
- **CORS Support**: Cross-origin resource sharing enabled

## Architecture

The project follows a clean, layered architecture:

- **Municipality.API**: Web API layer with controllers and configuration
- **Municipality.Business**: Business logic layer with services and DTOs
- **Municipality.Data**: Data access layer with entities, repositories, and DbContext

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- SQLite (included with .NET)

### Installation

1. Extract the project files
2. Navigate to the project directory
3. Restore dependencies:
   ```bash
   dotnet restore
   ```
4. Build the solution:
   ```bash
   dotnet build
   ```
5. Run the API:
   ```bash
   cd Municipality.API
   dotnet run
   ```

The API will be available at `http://localhost:5000` (or `https://localhost:5001` for HTTPS).

### Database

The application uses SQLite and will automatically create the database file (`municipality.db`) on first run. The database includes:

- Default admin user (username: `admin`, password: `admin123`)
- Sample municipal services

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### News
- `GET /api/news` - Get published news
- `GET /api/news/{id}` - Get news by ID
- `GET /api/news/recent` - Get recent news
- `POST /api/news` - Create news (Admin only)
- `PUT /api/news/{id}` - Update news (Admin only)
- `DELETE /api/news/{id}` - Delete news (Admin only)
- `GET /api/news/admin/all` - Get all news for admin (Admin only)

### Events
- `GET /api/events` - Get active events
- `GET /api/events/{id}` - Get event by ID
- `GET /api/events/upcoming` - Get upcoming events
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/{id}` - Update event (Admin only)
- `DELETE /api/events/{id}` - Delete event (Admin only)
- `GET /api/events/admin/all` - Get all events for admin (Admin only)

### Services
- `GET /api/services` - Get active services
- `GET /api/services/{id}` - Get service by ID
- `POST /api/services` - Create service (Admin only)
- `PUT /api/services/{id}` - Update service (Admin only)
- `DELETE /api/services/{id}` - Delete service (Admin only)
- `GET /api/services/admin/all` - Get all services for admin (Admin only)

### Complaints
- `POST /api/complaints` - Submit complaint (Public)
- `GET /api/complaints` - Get all complaints (Admin only)
- `GET /api/complaints/{id}` - Get complaint by ID (Admin only)
- `GET /api/complaints/status/{status}` - Get complaints by status (Admin only)
- `PUT /api/complaints/{id}/status` - Update complaint status (Admin only)
- `DELETE /api/complaints/{id}` - Delete complaint (Admin only)

### Contact
- `POST /api/contact` - Submit contact inquiry (Public)
- `GET /api/contact` - Get all contact inquiries (Admin only)
- `GET /api/contact/{id}` - Get contact inquiry by ID (Admin only)
- `GET /api/contact/unread` - Get unread contact inquiries (Admin only)
- `PUT /api/contact/{id}/mark-read` - Mark inquiry as read (Admin only)
- `DELETE /api/contact/{id}` - Delete contact inquiry (Admin only)

## Configuration

The application can be configured through `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=municipality.db"
  },
  "Jwt": {
    "Secret": "your-super-secret-jwt-key-that-is-at-least-32-characters-long",
    "Issuer": "Municipality.API",
    "Audience": "Municipality.Client",
    "ExpirationMinutes": 60
  }
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login with admin credentials:
   ```bash
   POST /api/auth/login
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

2. Use the returned token in the Authorization header:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## API Documentation

When running in development mode, Swagger UI is available at:
- `http://localhost:5000/swagger`

## CORS

The API is configured to allow cross-origin requests from any origin, making it suitable for frontend integration.

## Database Schema

### Users
- Id, Username, PasswordHash, Email, Role, CreatedAt

### News
- Id, Title, Content, PublishDate, AuthorId, ImageUrl, IsPublished

### Events
- Id, Title, Description, EventDate, Location, ImageUrl, CreatedAt, IsActive

### Services
- Id, Name, Description, IconUrl, IsActive, CreatedAt, DisplayOrder

### Complaints
- Id, Subject, Description, SubmissionDate, Status, ContactName, ContactEmail, ContactPhone, AdminResponse, ResponseDate

### ContactInquiries
- Id, Name, Email, Subject, Message, SubmissionDate, IsRead

## Development

### Adding New Features

1. Create entities in `Municipality.Data/Entities`
2. Add repositories in `Municipality.Data/Repositories`
3. Create DTOs in `Municipality.Business/DTOs`
4. Implement services in `Municipality.Business/Services`
5. Add controllers in `Municipality.API/Controllers`
6. Register services in `Program.cs`

### Testing

The solution builds successfully and the API starts without errors. The database is automatically created and seeded with initial data.

## Deployment

For production deployment:

1. Update the JWT secret in `appsettings.json`
2. Configure the database connection string
3. Set the environment to Production
4. Deploy to your preferred hosting platform

## License

This project is created for the Municipality system and is intended for municipal use.

