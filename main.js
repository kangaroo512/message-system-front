import './components/navbar/navbar.js';
import './components/sidebar/sidebar.js';
import './components/home/home.js';
import './components/user-form/user-form.js';
import './components/messages/messages.js';
import './components/search/user-search-bar.js';

import { Router } from './router/router.js';

const navbarContainer = document.getElementById('navbar');
const sidebarContainer = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');

navbarContainer.innerHTML = '<app-navbar></app-navbar>';
sidebarContainer.innerHTML = '<app-sidebar></app-sidebar>';


const routes = [
    {
        path:/^#\/home$/,
        action: async () => {
            mainContent.innerHTML = '<app-home></app-home>';
        }

    },
    {
        path:/^#\/search-user$/,
        action: () => {
            console.log("Activating search bar");
            mainContent.innerHTML = `<user-search-bar></user-search-bar>`;
        }
    },
    {
        path:/^#\/messages\/inbox$/,
        action: () => {
            console.log("Activating messages");
            mainContent.innerHTML = '<app-messages default-view="inbox"></app-messages>';
        }
    },
    {
        path:/^#\/messages\/sent$/,
        action: () => {
            console.log("Activating messages");
            mainContent.innerHTML = '<app-messages default-view="sent"></app-messages>';
        }
    },
    {
        path:/^#\/messages\/archived$/,
        action: () => {
            console.log("Activating messages");
            mainContent.innerHTML = '<app-messages default-view="archive"></app-messages>';
        }
    },
    {
        path:/^#\/messages\/trash$/,
        action: () => {
            console.log("Activating messages");
            mainContent.innerHTML = '<app-messages default-view="trash"></app-messages>';
        }
    },
    {
        path:/^#\/messages\/spam$/,
        action: () => {
            console.log("Activating messages");
            mainContent.innerHTML = `<app-messages default-view="spam"></app-messages>`;

        }
    },

];

const router = new Router(routes);
router.init();