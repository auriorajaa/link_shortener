# Link Shortener

A modern web application for shortening URLs built with Django REST Framework and React.js. This project provides a simple and efficient way to create shortened URLs with custom slugs, track click analytics, and manage your links through a clean user interface built with Chakra UI.

## OverView
<div align="center">
  <img src="https://github.com/user-attachments/assets/07c3bacd-7d63-4b20-9331-fa159cac9b65" width="49%" />
  <img src="https://github.com/user-attachments/assets/433cb5a8-81d8-456f-9e1e-f674f62d90e2" width="49%" />
</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/fb4349fa-1992-472f-bdc0-f4d5cf620547" width="49%" />
  <img src="https://github.com/user-attachments/assets/30c6a0af-b89d-4404-a7ba-7da3707104e8" width="49%" />
</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/bab21253-57e6-4c05-9306-e1cb43658483" width="49%" />
  <img src="https://github.com/user-attachments/assets/fb9edb88-7705-42a6-ab71-7992f2e7788e" width="49%" />
</div>

## 🚀 Features

- User authentication with JWT (Simple JWT)
- Create shortened URLs with custom slugs
- Track link click analytics
- Responsive UI built with Chakra UI
- RESTful API with Django REST Framework
- SQLite database for easy setup

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Python (3.8 or higher)
- Node.js (14.0 or higher)
- npm (6.0 or higher)
- Git

## 🛠 Installation

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/auriorajaa/link_shortener.git
cd link_shortener
```

2. Create and activate virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

3. Install Python dependencies
```bash
cd backend
pip install -r requirements.txt
```

4. Setup database
```bash
cd main
python manage.py migrate
```

5. Create superuser (admin)
```bash
python manage.py createsuperuser
```

6. Start the Django development server
```bash
python manage.py runserver
```

The backend server will start at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory from the project root
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The frontend application will start at `http://localhost:3000`

## 🏗 Project Structure

```
link_shortener/
├── backend/
│   └── main/
│       ├── main/
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── wsgi.py
│       ├── linkshortener/
│       │   ├── models.py
│       │   ├── views.py
│       │   ├── urls.py
│       │   └── serializers.py
│       ├── myuser/
│       │   ├── models.py
│       │   ├── views.py
│       │   ├── urls.py
│       │   └── serializers.py
│       └── manage.py
└── frontend/
    ├── package.json
    ├── public/
    └── src/
```

## ⚙️ Backend Dependencies

The backend uses several key Django packages:
- Django REST Framework
- djangorestframework-simplejwt
- django-cors-headers

These are all included in the `requirements.txt` file.

## 🔧 Frontend Dependencies

Key frontend packages include:
- @chakra-ui/react: ^2.8.2
- react-router-dom: ^7.1.1
- jwt-decode: ^4.0.0
- framer-motion: ^6.5.1

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication with the following configuration:
- Access token lifetime: 3 days
- Refresh token lifetime: 5 days
- Custom token serializer: `myuser.serializers.MyTokenObtainPairSerializer`

## 🌐 CORS Configuration

CORS is enabled for all origins in development mode. This is configured in `settings.py`:
```python
CORS_ALLOW_ALL_ORIGINS = True
```

## 💻 Development

### Running the Backend
```bash
cd backend/main
python manage.py runserver
```

### Running the Frontend
```bash
cd frontend
npm start
```

The application uses a proxy configuration to forward API requests to the backend:
```json
{
  "proxy": "http://localhost:8000"
}
```

## ⚠️ Troubleshooting

1. **CORS Issues**
   - Ensure the Django server is running on port 8000
   - Check that `CORS_ALLOW_ALL_ORIGINS = True` is set in settings.py
   - Verify the proxy setting in frontend's package.json

2. **JWT Authentication Issues**
   - Check token expiration times in settings.py
   - Ensure you're using the correct token format in requests
   - Verify SIMPLE_JWT settings in Django settings

3. **Database Issues**
   - Make sure all migrations are applied
   - Check if db.sqlite3 file exists and has proper permissions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Author

- Aurio Raja - [GitHub](https://github.com/auriorajaa)
