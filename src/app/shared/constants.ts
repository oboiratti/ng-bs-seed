export class Route {
  static login = 'login'
  static dashboard = 'dashboard'
  static settings = 'settings'
  static genericSettings = ':model'
  static admin = 'admin'
  static users = 'users'
  static roles = 'roles'

  static product = 'product'
  static productForm = 'form'
  static productFormEdit = 'form/:id'
  static productDetails = 'details/:id'
  static productDetailsView = 'details'

  static profile = 'profile'
  static profileForm = 'profile-form'
  static changePassword = 'change-password'

  static reports = 'reports'
}
