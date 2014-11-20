export default function addRoutes(router) {
  router.route('login');
  router.route('logout');
  router.route('sign-up');
  router.route('reset-password', { path: '/reset-password/:token'});
  router.route('forgot-password');
}
