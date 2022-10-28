import { Envelope, LockKey, Pen, Rss } from "phosphor-react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { useRef } from "react";
import { app } from "../../firebase";

export function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
    const emailInput = emailRef.current
    const passwordInput = passwordRef.current
    const nameInput = nameRef.current

    e.preventDefault()
    const auth = getAuth(app)

    const verify =
      !emailInput || emailInput.value === '' ||
      !passwordInput || passwordInput.value === '' ||
      !nameInput || nameInput.value === ''

    if (verify) return alert("preencha todos os campos!")
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(result => {
        updateProfile(
          result.user, {
          displayName: nameInput.value
        }
        )
        window.location.href = './login'
      })
      .catch((err) => {
        if (err.code === 'auth/invalid-email') alert("Email inválido!")
        if (err.code === 'auth/email-already-in-use') alert("Esse Email já está em uso!")
        if (err.code === 'auth/weak-password') alert('A senha deve ter pelo menos 6 dígitos!')
        alert('algum erro ocorreu: ' + err.code)
      });
  }

  const aHerfStyle = `text-sm border-b-2 border-solid 
  text-slate-700 border-slate-700 hover:text-slate-500 hover:border-slate-500
  dark:text-slate-300 dark:border-slate-300 dark:hover:text-slate-200 dark:hover:border-slate-200`

  return (
    <main className="flex flex-1 justify-center items-center h-full w-full bg-slate-200 dark:bg-gray-700">
      <div className="bg-slate-300 dark:bg-gray-800/50 text-black dark:text-gray-100 rounded-sm w-96 pb-8 m-8">
        <form onSubmit={handleLogIn} className="flex flex-col justify-center items-center ">
          <h2 className="m-4 font-extrabold text-2xl" >SignIn</h2>
          <div className="mb-4 h-8 w-64 rounded-sm flex flex-row items-center border-b-2 border-solid border-gray-400">
            <Pen size={24} className="mx-1" />
            <input
              type="text"
              className="bg-transparent h-8 outline-none placeholder:text-slate-500/95"
              placeholder="Name"
              ref={nameRef}
            />
          </div>
          <div className="mb-4 h-8 w-64 rounded-sm flex flex-row items-center border-b-2 border-solid border-gray-400">
            <Envelope size={24} className="mx-1" />
            <input
              type="email"
              className="bg-transparent h-8 outline-none placeholder:text-slate-500/95"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4 h-8 w-64 rounded-sm flex flex-row items-center border-b-2 border-solid border-gray-400">
            <LockKey size={24} className="mx-1" />
            <input
              type="password"
              className="bg-transparent h-8 outline-none placeholder:text-slate-500/95"
              placeholder="Senha"
              ref={passwordRef}
            />
          </div>
          <div className="bg-slate-400/95 dark:bg-slate-800/80 hover:bg-slate-500 mb-4 h-8 w-64 rounded-sm flex flex-row items-center">
          <button
              title="Criar Conta"
              type="submit"
              className="bg-transparent cursor-pointer h-8 w-64 outline-none placeholder:text-slate-500/95"
            >
              Criar Conta
            </button>
          </div>
          <div className="flex flex-row items-center mt-4">
            <span className="text-gray-900 dark:text-gray-50 text-sm mr-1">
              Já possui logIn?
            </span>
            <a href="./login" className={aHerfStyle}>
              Entre
            </a>
          </div>
        </form>
      </div>
    </main>
  )
}