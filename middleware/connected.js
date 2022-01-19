export default function ({redirect, $dialog, $auth}){
  if (!$auth.loggedIn) {
    $dialog.notify.warning("Vous devez vous connecter pour accéder à cette page",
      {
        position: "top-right",
        timeout: 2000
      }
    )
    return redirect('/')
  }
}
