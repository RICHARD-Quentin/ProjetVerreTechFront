import jwtDecode from "jwt-decode";

export default function ({redirect, $dialog, $auth}){
  let adminAccess = false
  if ($auth.loggedIn) {
    const permissions = jwtDecode($auth.strategy.token.get()).permissions
    adminAccess = permissions.includes("access:admin")
  }

  if (!adminAccess) {
    $dialog.notify.warning("Accès refusé",
      {
        position: "top-right",
        timeout: 2000
      }
    )
    return redirect('/')
  }
}
