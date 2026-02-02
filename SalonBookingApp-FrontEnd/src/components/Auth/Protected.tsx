function Protected({children}: {children: React.ReactNode}) {
    if(!localStorage.getItem("email")){
        window.location.href="/login"
        return null
    }
  return children
}

export default Protected;