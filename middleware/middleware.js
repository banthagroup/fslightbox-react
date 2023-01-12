export function middleware(func, middleware) {
    return function(...params) {
        if (middleware(...params)) {
            func(...params);
        }
    };
}
