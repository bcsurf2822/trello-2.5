export function CreateAccount() {
  return (
    <form >
      <div>
        <label>UserName</label>
        <input id="name" name="name" placeholder="Username" />
      </div>
      <div>
        <label>Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label>Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}