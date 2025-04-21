import { browser } from '$app/environment'
import { routes , handleAuthToken, otp} from "$lib/store/routes";
import { handleProfile } from "$lib/index";
import { changeotp } from "$lib/store/routes";

/** @type {import('./$types').PageLoad} */

export async function load({ route }) {
  let password = browser && JSON.parse(sessionStorage.getItem('password'));
  let fach = browser && JSON.parse(sessionStorage.getItem('otp'));
  const user = browser && JSON.parse(localStorage.getItem('drr'))
  const changeEmail = browser && JSON.parse(sessionStorage.getItem('change-email'))

  if(user){
      await handleProfile(user)
  }

  changeotp.set(changeEmail)
  handleAuthToken.set(user)
  routes.set(route.id)
  otp.set(fach)
  return {password}
}