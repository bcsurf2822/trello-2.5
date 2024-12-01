export function SignupForm() {
  return (
    <form >
      <div>
        <label htmlFor="username">UserName</label>
        <input id="name" name="name" placeholder="Username" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}