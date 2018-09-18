export class Route {
    static get login() { return "login" }
    static get dashboard() { return "dashboard" }
    static get settings() { return "settings" }
    static get genericSettings() { return "settings/:model" }
    static get admin() { return "admin" }
    static get users() { return "users" }
    static get roles() { return "roles" }
    static get product() { return "product" }
    static get productForm() { return "product/productform" }
    static get productFormEdit() { return "product/productform/:id" }
}