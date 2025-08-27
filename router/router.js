export class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('hashchange', () => this.handleRoute());
    }
     async handleRoute() {
        const hash = window.location.hash || '#/home';
        for(const route of this.routes) {
            const match = hash.match(route.path);
            if(match) {
                await route.action(...match.slice(1));
                return;
            }
        }

        if(this.routes.notFound) {
            this.routes.notFound();
        }
    }

    init() {
        this.handleRoute();
    }
}