# Secure Web Platform

Plateforme web sécurisée intégrant une API backend, une base de données relationnelle PostgreSQL et une interface utilisateur développée sous React (Vite). L'ensemble de l'infrastructure est orchestré via Docker pour garantir la portabilité et la reproductibilité des environnements.

---

## Architecture et Fonctionnalités

* **Gestion des accès et authentification :** Inscription, connexion sécurisée, gestion des rôles (`USER`, etc.) et contrôle d'accès par jetons (JWT).
* **Interface Frontend :** Application monopage (SPA) construite avec React, intégrant un routage dynamique et des appels API centralisés.
* **Persistance des données :** Base de données PostgreSQL initialisée automatiquement au démarrage via des scripts SQL dédiés.
* **Conteneurisation :** Isolation des services backend et base de données avec Docker Compose.

---

## Stack Technique

| Composant | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, React Router, Axios |
| **Backend** | API REST (Port 5000) |
| **Base de données** | PostgreSQL 16 Alpine (Port 5432) |
| **Infrastructure** | Docker, Docker Compose |

---

## Structure du Projet

```text
secure-web-platform/
├── backend/                # Services et logique métier de l'API
├── frontend/               # Application cliente React (Vite)
│   ├── src/
│   │   ├── components/     # Composants d'interface réutilisables
│   │   ├── pages/          # Vues principales (Login, Register, Dashboard)
│   │   ├── services/       # Configuration du client HTTP (api.js)
│   │   ├── App.jsx         # Définition des routes de l'application
│   │   └── main.jsx        # Point d'entrée React
│   └── package.json
├── init-db/                # Scripts d'initialisation de la base de données (init.sql)
├── docker-compose.yml      # Définition et orchestration des conteneurs
├── .gitignore              # Fichiers et dossiers exclus du suivi Git
└── README.md               # Documentation du projet
