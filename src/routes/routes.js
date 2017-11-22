import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import FormCitibank from 'src/components/Dashboard/Views/FormCitibank.vue'
import Blank from 'src/components/Dashboard/Views/Blank.vue'
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import RegisterForm from 'src/components/Dashboard/Views/UserProfile/RegisterForm.vue'
import Kyc from 'src/components/Dashboard/Views/Kyc.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/stats',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'profile',
        name: 'My Profile',
        component: UserProfile
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterForm
      },
      {
        path: 'citibank',
        name: 'citibank',
        component: FormCitibank
      },
      {
        path: 'blank',
        name: 'blank',
        component: Blank
      },
      {
        path: 'kyc',
        name: 'kyc',
        component: Kyc
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
