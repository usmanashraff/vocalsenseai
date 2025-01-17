import { Navigation } from "./navigation"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const NavigationWrapper = async() => {
  const {isAuthenticated} = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  console.log(isUserAuthenticated)
  return (
    <Navigation isAuth={isUserAuthenticated} />
  )
}

export default NavigationWrapper