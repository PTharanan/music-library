# 🎵 Music Library

A full-stack music management application featuring a robust **Django REST Framework** backend and a dynamic **Angular** frontend. This platform allows users to manage and stream their personal music library seamlessly.

**Live Demo:** [Music Library on Vercel](https://music-library-black.vercel.app/)

---

## ✨ Features

* **Full-Stack Architecture:** Decoupled backend and frontend for better scalability.
* **RESTful API:** Powered by Django for efficient data handling.
* **Modern UI:** Built with Angular for a fast, single-page application experience.
* **Media Management:** Dedicated handling for MP3 audio files.
* **Responsive Design:** Optimized for all screen sizes.

## 🛠️ Tech Stack

* **Frontend:** Angular
* **Backend:** Django & Django REST Framework (DRF)
* **Database:** SQLite (Development)
* **Deployment:** Vercel

---

## 📂 Project Structure

```text
music-library/
├── backend/                # Django Project Root
│   ├── backend/            # Core settings and configuration
│   ├── music/              # App logic (Models, Views, Serializers)
│   ├── media/music/        # Uploaded audio files (.mp3)
│   ├── db.sqlite3          # Database file
│   └── manage.py           # Django CLI
└── music-frontend/         # Angular Application
    ├── src/                # Component logic and templates
    ├── public/             # Static assets
    └── package.json        # Dependencies and scripts

```

---

## 🚀 Getting Started

To get the project up and running locally, follow these instructions:

### 1. Backend Setup (Django)

Navigate to the backend directory and start the server:

```bash
cd backend
# Install dependencies (ensure you have djangorestframework installed)
pip install django djangorestframework django-cors-headers

# Start the Django server
python manage.py runserver

```

### 2. Frontend Setup (Angular)

In a new terminal window, navigate to the frontend directory and start the development server:

```bash
cd music-frontend
# Install dependencies
npm install

# Start the Angular application
npm run start

```

---

## 🤝 Contributing

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewFeature`).
3. Commit your Changes (`git commit -m 'Add NewFeature'`).
4. Push to the Branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## 👤 Author

**PTharanan**

* GitHub: [@PTharanan](https://github.com/PTharanan)
