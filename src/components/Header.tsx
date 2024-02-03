import '../styles/Header.scss'

type HeaderProps = { readonly isLoggedIn: boolean }

export default function Header({ isLoggedIn }: HeaderProps) {
  const options = (
    <div className='options'>
      <h2>settings</h2>
      <h2>log out</h2>
    </div>
  )

  return (
    <div className='header'>
      <h1>chatter</h1>
      {isLoggedIn && options}
    </div>
  )
}
